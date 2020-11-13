
const fs = require('fs');
const unzip = require('unzip');

fs.createReadStream('archive.zip')
  .pipe(unzip.Parse())
  .on('entry', entry => {
    const fileName = entry.path;
    // BAD: This could write any file on the filesystem.
    entry.pipe(fs.createWriteStream(fileName));
  });

function getFileName(entry) {
   return entry.path;
}

function callback(entry) {
    const fileName = entry.path;
    // BAD: This could write any file on the filesystem.
    entry.pipe(fs.createWriteStream(fileName));
}

fs.createReadStream('archive.zip')
  .pipe(unzip.Parse())
  .on('entry', entry => {
    const fileName = getFileName(entry);
    // BAD: This could write any file on the filesystem.
    entry.pipe(fs.createWriteStream(fileName));
  });

fs.createReadStream('archive.zip')
  .pipe(unzip.Parse())
  .on('entry', callback);

