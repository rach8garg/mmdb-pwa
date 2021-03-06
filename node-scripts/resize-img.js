const path = require('path');
const fs = require('fs');
const jimp = require('jimp');
const directoryPath = path.join(__dirname, 'new');
const IMG_WIDTH = 80;
const IMG_HEIGHT = jimp.AUTO;
const IMG_QUALITY = 100;

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach

    files.map((file) => {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return console.log('Error reading file: ' + err);
            }
            else {
                compressFile(file);
            }    
        });
    });
});

function compressFile(file){
    const filePath = path.join(directoryPath, file);
    jimp.read(filePath, (err, image) => {
        if (err) throw err;
        image
        .resize(IMG_WIDTH, IMG_HEIGHT) // resize
        .quality(IMG_QUALITY) // set JPEG quality
        .write(path.join(__dirname, `/new-thumbs/${file}`)); // save
    });
}