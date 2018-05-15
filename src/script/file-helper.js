const fs = require('fs')
const path = require('path')

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

class FileHelper {
    constructor (filePath) {
        this.filePath = filePath
    }

    readFile () {
        try {
            return JSON.parse(fs.readFileSync(this.filePath))
        }
        catch (err) {
            console.log(err)
        }
    }

    writeFile (fileData) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(fileData))
            console.log(`data written to: ${filePath}`)
        }
        catch (err) {
            console.log(err)
        }
    }

    ensureFile (fileData) {
        var dirname = path.dirname(this.filePath)
        if (fs.existsSync(dirname)) {
            if (!fs.existsSync(this.filePath)) {
                createFile(this.filePath, fileData)
            }
        }
        else {
            createFolder(dirname)
            createFile(this.filePath, fileData)
        }
    }
}

module.exports = FileHelper
