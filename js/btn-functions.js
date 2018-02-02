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
}


function add_new_note () {
    var message = document.getElementById("addnote_text");
    console.log(message.value);
}
