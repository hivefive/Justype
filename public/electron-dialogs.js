const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

module.exports = { showSaveDialog, showOpenDialog, showPDFDialog };

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

function showPDFDialog(browserWindow, props) {
    let fullText = props.typedTitle + props.typedText;
    dialog.showSaveDialog(browserWindow, {
        defaultPath: 'text.pdf'
    }, (filename) => {
        doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(filename));

        doc.fontSize(45)
            .font('Times-Roman')
            .text(props.typedTitle)
            .moveDown(0.5);

        doc.fontSize(20)
            .font('Times-Roman')
            .text(props.typedText, {
                width: 400
            })
            .moveDown(1);

        doc.end();
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