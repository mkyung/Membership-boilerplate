var User = require("mongoose").model("User")
var passport = require("koa-passport")

exports.renderPage = function *(next){
    yield this.render("login")
}
