const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const windows = [];
let mainWindow;
const { showSaveDialog, showOpenDialog, showPDFDialog } = require('./electron-dialogs.js');
const { setMainMenu } = require('./electron-nav');
// const App = require('../src/App');

function createBrowserWindow(options) {
    let win = new BrowserWindow(Object.assign({
        width: 900,
        height: 800,
        show: false,
        titleBarStyle: 'hidden'
    }, options));

    windows.push(win);
    const indexURL = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true
    });
    win.loadURL(indexURL);

    win.on('ready-to-show', () => {
        win.show();
        ipcMain.on('save-text', (event, props) => {
            showSaveDialog(win, props);
        });
        ipcMain.on('save-pdf', (event, props) => {
            console.log("HELLO");
            showPDFDialog(win, props);
            // win.webContents.printToPDF({}, (error, data) => {
			// 		if (error) throw error;
			// 		fs.writeFile("/tmp/print.pdf", data, error => {
            //             console.log(data);
			// 			if (error) throw error;
			// 			console.log("Write PDF sucdessfully.");
			// 		});
			// 	}
			// );
        });
    });

    setMainMenu(win);

    win.on('close', () => {
        // windows.splice(windows.indexOf(win), 1);
        app.quit();
    });

}

app.on('ready', () => {
    createBrowserWindow();
});

