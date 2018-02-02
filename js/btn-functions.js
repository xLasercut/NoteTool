const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const url = require('url');
const path = require('path');

function open_add_window () {
    var add_window = new BrowserWindow({ width: 800, height: 600 });
    add_window.loadURL(url.format({
        pathname: path.join(__dirname, 'addnote.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    add_window.webContents.openDevTools()

    // Emitted when the window is closed.
    add_window.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        add_window = null
    })
}


function add_new_note () {
    var message = document.getElementById("addnote_text");
    var title = document.getElementById("addnote_title");
    obj = {
        title: title.value,
        message: message.value
    };
    console.log(JSON.stringify(obj));
}
