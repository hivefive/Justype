const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = { showSaveDialog };

function showSaveDialog(browserWindow, props) {
    dialog.showSaveDialog(browserWindow, {
        defaultPath: 'text.txt'
    }, (filename) => {
        if (filename) {
            console.log(JSON.stringify(props));
            fs.writeFile(filename, props.typedText, 'utf8', (err) => {
                if (err) {
                    dialog.showErrorBox('Save failed.', err.message);
                }
            });
        }
    });
}