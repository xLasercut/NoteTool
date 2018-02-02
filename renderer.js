// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const Store = require('electron-store');
const store = new Store();
const path  = require('path');
const fs = require('fs');
const q = require('q');

function read_file (file_path) {
    var deferred = q.defer();
    fs.readFile(file_path, 'utf8', function (err, data) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(JSON.parse(data));
        }
    });
    return deferred.promise;
}

var note_data = path.join(__dirname, "Data", "NoteData.Json");

read_file(note_data)
.then(function (data) {
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "note");
        div.textContent = data[i].message;
        document.body.appendChild(div);
    }
    console.log(data);
})
.catch(function (error) {
    console.log(error)
});
