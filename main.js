const electron = require('electron')
// Module to control application life.
const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const fileHelper = require(path.join(__dirname, "src", "script", "file-helper.js"))


global.sharedObj = {
    debug: true,
    configPath: path.join(__dirname, "config.json")
}

var debug = global.sharedObj.debug
var configPath = global.sharedObj.configPath

let mainWindow

function initialChecks () {
    var defaultConfig = {
        dataPath: path.join(__dirname, "data", "note-data.json"),
        maxNote: 1000
    }
    fileHelper.ensureFile(configPath, defaultConfig)
    var configData = fileHelper.readFile(configPath)
    global.sharedObj["dataPath"] = configData.dataPath
    global.sharedObj["maxNote"] = configData.maxNote
    fileHelper.ensureFile(configData.dataPath, {})
}


function createMainWindow () {
    // Create the browser window.
    var mainUrl = url.format({
        pathname: path.join(__dirname, "src", "page", "index.html"),
        protocol: "file:",
        slashes: true
    })

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    })

    // Open the DevTools.
    if (debug) {
        mainWindow.webContents.openDevTools()
    }
    else {
        mainWindow.setMenu(null)
    }

    // and load the index.html of the app.
    mainWindow.loadURL(mainUrl)

    mainWindow.once('ready-to-show', function () {
        mainWindow.show()
    })


    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    initialChecks()
    createMainWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
