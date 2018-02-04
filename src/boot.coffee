electron = require('electron')
#Module to control application life.
app = electron.app

path = require('path')
url = require('url')

windowHelper = require('./window-helper.coffee')

mainUrl = url.format({
        pathname: path.join(__dirname, '..', 'index.html'),
        protocol: 'file:',
        slashes: true
    })

#This method will be called when Electron has finished
#initialization and is ready to create browser windows.
#Some APIs can only be used after this event occurs.
app.on('ready',
    () ->
        windowHelper.createWindow(mainUrl, 800, 600)
)

#Quit when all windows are closed.
app.on('window-all-closed',
    () ->
        #On OS X it is common for applications and their menu bar
        #to stay active until the user quits explicitly with Cmd + Q
        if process.platform != 'darwin'
            app.quit()
)

app.on('activate',
    () ->
        #On OS X it's common to re-create a window in the app when the
        #dock icon is clicked and there are no other windows open.
        #if mainWindow == null
        windowHelper.createWindow(mainUrl)
)

#In this file you can include the rest of your app's specific main process
#code. You can also put them in separate files and require them here.
