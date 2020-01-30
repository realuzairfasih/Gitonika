exports.convertHextoUtf8 = hexVal => {
  let hex = hexVal.toString()
  let str = ''
  for (let i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  return str
}

exports.convertHextoDec = hexVal => {
  return parseInt(hexVal, 16);
}

exports.convertHextoBin = (hexVal, length) => {
  return (parseInt(hexVal, 16).toString(2)).padStart(length, '0');
}