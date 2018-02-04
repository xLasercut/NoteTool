url = require('url')
path = require('path')
windowHelper = require('./window-helper.coffee')

openAddNoteWindow = () ->
    windowUrl = url.format({
        pathname: path.join(__dirname, "addnote.html"),
        protocol: 'file:',
        slashes: true
    })

    windowHelper.createWindow(windowUrl, 800, 600)
