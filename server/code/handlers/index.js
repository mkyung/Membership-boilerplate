var fs = require("fs")
var path = require("path")

fs.readdirSync(__dirname).forEach(function(file){
    if (file.indexOf(".js") > 0) return
    exports[file] = require("./" + file)
})
