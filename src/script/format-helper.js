const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
}

const conversionMap = {
    img: function (src) {
        var imgProperties = src.split(" ")
        var imgUrl = imgProperties[0]
        var imgWidth = imgProperties[1]

        var replacementStr = `<img src="${imgUrl}"`

        if (imgWidth) {
            replacementStr += ` width="${imgWidth}"`
        }
        replacementStr += ` />`

        return replacementStr
    },
    link: function (src) {
        var linkProperties = src.split("  ")
        var linkUrl = linkProperties[0]
        var linkText = linkProperties[1]

        var replacementStr = `<a href="${linkUrl}">`

        if (linkText) {
            replacementStr += `${linkText}`
        }
        else {
            replacementStr += `${linkUrl}`
        }

        replacementStr += `</a>`

        return replacementStr
    },
    bold: function (src) {
        return `<b>${src}</b>`
    },
    italic: function (src) {
        return `<i>${src}</i>`
    },
    small: function (src) {
        return `<small>${src}</small>`
    },
    strike: function (src) {
        return `<del>${src}</del>`
    },
    uline: function (src) {
        return `<ins>${src}</ins>`
    },
    hlight: function (src) {
        return `<mark>${src}</mark>`
    },
    sup: function (src) {
        return `<sup>${src}</sup>`
    },
    sub: function (src) {
        return `<sub>${src}</sub>`
    },
    youtube: function (src) {
        var youtubeProperties = src.split(" ")
        var youtubeId = youtubeProperties[0]
        var youtubeWidth = youtubeProperties[1]

        var replacementStr = `<iframe src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen`

        if (youtubeWidth) {
            replacementStr += ` width="${youtubeWidth}"`
        }

        replacementStr += ` ></iframe>`

        return replacementStr
    }
}


function removeTag (str, type) {
    return (str.replace(`[${type}]`, "").replace(`[_${type}]`, ""))
}

function getItemToConvert (str, type) {
    var regex = new RegExp(`(\\[${type}\\]((?!\\[${type}\\]|\\[_${type}\\]).)*\\[_${type}\\])`, "gi")
    return str.match(regex)
}

function sanitizer (str) {
    return String(str).replace(/[&<>"'`=\/]/gi, function (s) {
        return entityMap[s]
    })
}

convertItems = function (str, type) {
    var items = getItemToConvert(str, type)
    if (items) {
        for (item of items) {
            var src = removeTag(item, type)
            var replacementStr = conversionMap[type](src)
            str = str.replace(item, replacementStr)
        }
    }

    return str
}


module.exports.renderItems = function (str) {
    str = sanitizer(str)
    for (type in conversionMap) {
        str = convertItems(str, type)
    }
    return str
}

module.exports.getFormatBtns = function () {
    var buttons = []
    for (type in conversionMap) {
        buttons.push(type)
    }
    return buttons
}
