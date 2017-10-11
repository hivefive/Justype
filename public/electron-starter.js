const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const windows = [];
let mainWindow;
const { showSaveDialog, showOpenDialog } = require('./electron-dialogs.js');
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
            event.sender.send("save", "save");
            showSaveDialog(win, props);
        });
        // ipcMain.on('open-text', (event, props) => {
        //     event.sender.send("open", "OPEN");
        //     showOpenDialog(win, props);
        // });
        // ipcMain.on('file-content', fileData => {
        //     dialog.showErrorBox("fileContent", fileData);
        //     let title = fileData.subString(0, fileData.indexOf('\n'));
        //     let text = fileData.subString(fileData.indexOf('\n'));
        //     this.setState({
        //         textTitle: title,
        //         textContent: text
        //     });
        // });
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

