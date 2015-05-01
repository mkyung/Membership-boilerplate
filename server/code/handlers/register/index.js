var User = require("mongoose").model("User")

exports.createUser = function *(next){
    this.checkBody("username").notEmpty().len(2, 15).escape()
    this.checkBody("password").notEmpty().len(2, 15)

    if(this.errors) this.throw(400)

    try{
        var user = new User({
            username: this.request.body.username,
            password: this.request.body.password
        })

        user = yield user.save()
        this.body = "User registration succeeded"
    } catch (err) {
        console.log(err)
        this.throw(500)
    }
}

exports.renderPage = function *(next){
    yield this.render("register")
}
