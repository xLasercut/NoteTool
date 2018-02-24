const fs = require('fs')
const path = require('path')


module.exports.readFile = function (filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath))
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.writeFile = function (filePath, fileData) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(fileData))
        console.log(`data written to: ${filePath}`)
    }
    catch (err) {
        console.log(err)
    }
}

function createFile (filePath, fileData) {
    try {
        fs.appendFileSync(filePath, JSON.stringify(fileData))
        console.log(`create file: ${filePath}`)
    }
    catch (err) {
        console.log(err)
    }

}

function createFolder (folderPath) {
    try {
        fs.mkdirSync(folderPath)
        console.log(`created folder: ${folderPath}`)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.ensureFile = function (filePath, fileData) {
    var dirname = path.dirname(filePath)
    if (fs.existsSync(dirname)) {
        if (!fs.existsSync(filePath)) {
            createFile(filePath, fileData)
        }
    }
    else {
        createFolder(dirname)
        createFile(filePath, fileData)
    }
}
