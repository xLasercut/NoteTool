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

function create_note (note_data, i) {
    var note_container = document.createElement("div");
    note_container.setAttribute("id", "note" + i)
    note_container.setAttribute("class", "note_container");
    document.getElementById("notebar").appendChild(note_container);

    var note_header = document.createElement("div");
    note_header.setAttribute("class", "note_header");
    note_header.innerHTML = note_data.title;
    document.getElementById("note" + i).appendChild(note_header);

    var note_body = document.createElement("div");
    note_body.setAttribute("class", "note_body");
    note_body.innerHTML = note_data.message;
    document.getElementById("note" + i).appendChild(note_body);

    var edit_btn = document.createElement("button");
    edit_btn.setAttribute("class", "btn_green");
    edit_btn.setAttribute("id", "edit_btn");
}

var note_data = path.join(__dirname, "Data", "NoteData.Json");

read_file(note_data)
.then(function (data) {
    for (var i = 0; i < data.length; i++) {
        create_note(data[i], i);
    }
    console.log(data);
})
.catch(function (error) {
    console.log(error)
});
