const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const windows = [];
let mainWindow;
const { showSaveDialog } = require('./electron-dialogs.js');

function createBrowserWindow(options) {
    let win = new BrowserWindow(Object.assign({
        width: 800,
        height: 600,
        show: false,
        titleBarStyle: 'hidden'
    }, options));

    windows.push(win);
    // win.loadURL(path.join('file://', __dirname, 'index.html'));
    const indexURL = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true
    });
    win.loadURL(indexURL);

    win.on('ready-to-show', () => {
        win.show();
        ipcMain.on('save-text', (event, props) => showSaveDialog(win, props));
    });
    win.on('close', () => {
        // windows.splice(windows.indexOf(win), 1);
        app.quit();
    });

}

app.on('ready', () => {
    createBrowserWindow();
});