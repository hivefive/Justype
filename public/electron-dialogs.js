const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = { showSaveDialog, showOpenDialog };

function showSaveDialog(browserWindow, props) {
    let fullText = props.typedTitle + "\n" + props.typedText;
    console.log(fullText);
    dialog.showSaveDialog(browserWindow, {
        defaultPath: 'text.txt'
    }, (filename) => {
        if (filename) {
            console.log(JSON.stringify(props));
            fs.writeFile(filename, fullText, 'utf8', (err) => {
                if (err) {
                    dialog.showErrorBox('Save failed.', err.message);
                }
            });
        }
    });
}

function showOpenDialog(browserWindow) {
	dialog.showOpenDialog(
		browserWindow,
		{
			filters: [
				{
					name: "Text Files",
					extensions: ["txt"]
				}
			]
		},
		filePaths => {
			if (filePaths) {
                // dialog.showErrorBox("fileText", fs.readFileSync(filePaths[0], "utf8"));
                browserWindow.send('file-content', fs.readFileSync(filePaths[0], 'utf8'));
			}
		}
	);
}