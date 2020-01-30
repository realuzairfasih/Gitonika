import e from 'express';

const exec = require('child_process').exec;

function execute (command, callback) {
  exec(command, (error, stdout, stderr) => { 
    if (error) {
      callback({
        success: false,
        error: stderr
      })
    } else {
      callback({
        success: true,
        output: stdout
      })
    }
  });
};

const addFileToStage = (repo_path, filename, callback) => {
  execute(`cd ${repo_path} && git add "${filename}"`, res => {
    if (res.success) {
      console.log('[CHILD_PROCESS]', res.output)
      callback()
    } else {
      console.log(res.error)
    }
  })
}

const removeFileFromStage = (repo_path, filename, callback) => {
  execute(`cd ${repo_path} && git rm --cached "${filename}"`, res => {
    if (res.success) {
      console.log('[CHILD_PROCESS]', res.output)
      callback()
    } else {
      console.log(res.error)
    }
  })
}

const stageAllFiles = (repo_path, callback) => {
  execute(`cd ${repo_path} && git add .`, res => {
    if (res.success) {
      console.log('[CHILD_PROCESS]', res.output)
      callback()
    } else {
      console.log(res.error)
    }
  })
}

const unstageAllFiles = (repo_path, callback) => {
  execute(`cd ${repo_path} && git reset`, res => {
    if (res.success) {
      console.log('[CHILD_PROCESS]', res.output)
      callback()
    } else {
      console.log(res.error)
    }
  })
}

export { addFileToStage, removeFileFromStage, stageAllFiles, unstageAllFiles }