module.exports.createWindow = function (windowUrl, width, height, resizable) {
    // Create the browser window.
    var appWindow = new BrowserWindow({
        width: width,
        height: height,
        resizable: resizable,
    });

    // and load the index.html of the app.

    appWindow.loadURL(windowUrl);

    if (DEBUG) {
        // Open the DevTools.
        appWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    appWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        appWindow = null;
    })
}
