const fs = require('fs');
let watcher

const watchdog = (pathToHound, callback) => {
  
  console.log('Dogs been unleased, Will hound ' + pathToHound)
  // Instantiate the watcher
  watcher = fs.watch(pathToHound);
  
  // track changes
  watcher.on('change', (event, filename) => {
    
    console.log(event);
    console.log(filename);
    
    // Notify changes
    callback();
  
  });
  
}

module.exports = { watchdog }
