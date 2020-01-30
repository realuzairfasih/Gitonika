const walk = require('walk');

const getFilesInDirectory = repoPath => (new Promise((resolve, reject) => {
  const files = [];
  
  // Walker options
  const walker  = walk.walk(repoPath, { followLinks: false });
  
  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files
      console.log(root, root.indexOf('.git') == -1)
      if (root.indexOf('.git') == -1) {
        files.push((root.replace(repoPath, '').replace(/\\/g, "/") + '/' + stat.name).slice(1));
      }
      next();
  });
  
  walker.on('end', function() {
    console.log(files);
    resolve({ files })
  });

}))


export { getFilesInDirectory }