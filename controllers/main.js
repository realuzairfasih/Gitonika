const fs = require("fs")
const iconv = require('iconv-lite');
const gindex = require('./decoders/DecodeGitIndex')
let repo_path = ''


// Step 1: Check if the .git folder actually exists
const getBasicInfo = repoPath => new Promise((resolve, reject) => {
  repo_path = repoPath
  repo_path += '\\.git'

  let ref, description, status, stage
  if (fs.existsSync(repo_path)) {
    status = true

    // Get basic information about the repository
    // HEAD
    // Description

    let buffer = fs.readFileSync(repo_path + '\\HEAD')
    ref = buffer.toString().split(':')[1].trim()

    
    buffer = fs.readFileSync(repo_path + '\\description')
    description = buffer.toString()
    
    if (fs.existsSync(repo_path + '\\index')) {
      let str = iconv.decode(fs.readFileSync(repo_path + '\\index'), 'hex');
      stage = gindex.getIndexInfo(str)
    }

    resolve({ ref, description, status, stage })

    // const chokidar = require('chokidar');
    // chokidar.watch(path).on('all', (event, path) => {
    //   console.log(event, path);
    // });
  } else {
    status = false
    resolve({ ref, description, status })
  }
})

export { getBasicInfo }