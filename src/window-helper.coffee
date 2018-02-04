electron = require('electron')
BrowserWindow = electron.BrowserWindow

module.exports.createWindow = (windowUrl, width, height) ->
    #Create the browser window.
    appWindow = new BrowserWindow({width: width, height: height})

    #and load the index.html of the app.
    appWindow.loadURL(windowUrl)

    #Open the DevTools.
    appWindow.webContents.openDevTools()

    #Emitted when the window is closed.
    appWindow.on('closed',
        () ->
            #Dereference the window object, usually you would store windows
            #in an array if your app supports multi windows, this is the time
            #when you should delete the corresponding element.
            appWindow = null
    )
