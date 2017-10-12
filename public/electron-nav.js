const { app, Menu } = require('electron');
const isWindows = process.platform === "win32";
const { showSaveDialog, showOpenDialog } = require('./electron-dialogs');
const fs = require('fs');
const pdfkit = require('pdfkit');

module.exports = {
	setMainMenu
};


function setMainMenu(mainWindow) {
	const template = [
        {
			label: app.getName(),
			submenu: [
				{
                    label: "Open File",
                    accelerator: isWindows ? "Ctrl+O" : "Cmd+O",
					click() {
						showOpenDialog(mainWindow);
					}
                },
                {
                    label: "Save File",
                    accelerator: isWindows ? "Ctrl+S" : "Cmd+S",
                    click() {
                        mainWindow.send('save-file', mainWindow)
                    }
                },
                {
                    label: "Export PDF",
                    accelerator: isWindows ? "Ctrl+Shift+S" : "Cmd+Shift+S",
                    click() {
                        // win.webContents.printToPDF({}, (error, data) => {
                        //         if (error) throw error;
                        //         fs.writeFile("/tmp/print.pdf", data, error => {
                        //             if (error) throw error;
                        //             console.log("Write PDF successfully.");
                        //         });
                        //     }
                        // );
                        mainWindow.send('export-pdf', mainWindow);

                    }
                },
                {
                    type: 'separator'
                },
                {
					label: isWindows ? "Exit" : `Quit ${app.getName()}`,
					accelerator: isWindows ? "Alt+F4" : "CmdOrCtrl+Q",
					click() {
						app.quit();
					}
				}
			]
		},
		{
			label: "Edit",
			submenu: [
				{ role: "undo" },
				{ role: "redo" },
				{ role: "separator" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" }
			]
        },
        {
            label: 'View',
            submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
            ]
        }
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}