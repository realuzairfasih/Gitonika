const decoding = require('./decoding')

exports.getIndexInfo = indexContent => {
    
  let hexString = indexContent.toString().trim()

  stagingInfo = { indices: [] }

  let byteArray = []

  hexArray = hexString.trim().split('')
  for (let i = 0; i <= hexString.length - 8; i += 8) {
    let subs = hexArray.splice(0, 8).join('')
    byteArray.push(subs)
  }

  let hasIndex = byteArray.length > 8

  // Calculate the number of indices in the stage
  // 3 bytes for header | 5 bytes for checksum | Each index is 20 bytes
  // const indexCount = (byteArray.length - (3 + 5)) / 20
  let current_byte = 0

  // Check for the 12 byte header
  if (decoding.convertHextoUtf8(byteArray[current_byte]) == 'DIRC') {
    current_byte++
    // The signature indicates this is the 12 byte header
    // The next byte is the Git Version
    const version = byteArray[current_byte++]
    stagingInfo['git_version'] = decoding.convertHextoDec(version)
    
    // The next byte is the number of files
    const file_count = byteArray[current_byte++]
    stagingInfo['file_count'] = decoding.convertHextoDec(file_count)
  }

  // Process the indices
  while (hasIndex) {
    let indexData = {}
    // Get ctime and mtime
    let ctime = decoding.convertHextoDec(byteArray[current_byte++])
    let ctime_contd = decoding.convertHextoDec(byteArray[current_byte++])
    let mtime = decoding.convertHextoDec(byteArray[current_byte++])
    let mtime_contd = decoding.convertHextoDec(byteArray[current_byte++])
    indexData['ctime'] = [ctime, ctime_contd]
    indexData['mtime'] = [mtime, mtime_contd]

    // Get device
    indexData['device'] = decoding.convertHextoDec(byteArray[current_byte++])

    // ino, mode, uid, gid
    indexData['ino'] = byteArray[current_byte++]
    indexData['mode'] = byteArray[current_byte++]
    indexData['uid'] = byteArray[current_byte++]
    indexData['gid'] = byteArray[current_byte++]

    // 160 bit SHA-1
    const filesize = decoding.convertHextoDec(byteArray[current_byte++])
    indexData['filesize'] = filesize
    indexData['sha1'] = ''
    for (let i = 0; i < 5; i++) {
      indexData['sha1'] += byteArray[current_byte++]
    }

    // 16 bit flags
    let flagByte = byteArray[current_byte++]
    let flagsInBinary = flagByte.slice(0, 4)
    let decodedBinary = decoding.convertHextoBin(flagsInBinary, 4)  
    
    let flags = {}
    flags['assume_valid'] = decodedBinary.slice(0, 1) == '1'
    flags['extended'] = decodedBinary.slice(1, 2) == '1'
    flags['stage'] = parseInt(decodedBinary.slice(2, 4), 2)
    
    indexData['flags'] = flags

    let filename = flagByte.slice(4, 8)
    const padding = /[0][0]+/;

    while (true) {
      let currentChunk = byteArray[current_byte++]
      filename += currentChunk
      if (padding.test(currentChunk)) break
      
    }

    while (byteArray[current_byte] == '00000000') {
      let currentChunk = byteArray[current_byte++]
      filename += currentChunk
    }
    
    filename = filename.replace(padding, '');
    indexData['filename'] = decoding.convertHextoUtf8(filename)

    stagingInfo.indices.push(indexData)
    if (decoding.convertHextoUtf8(byteArray[current_byte]) == 'TREE') break
    if (byteArray.length - current_byte == 5) break
  }

  let checksum = ''
  for (let i = 0; i < 5; i++) {
    checksum += byteArray[current_byte++]
  }
  stagingInfo['checksum'] = checksum
  return stagingInfo
}
