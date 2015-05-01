var User = require("mongoose").model("User")
var co = require("co")

module.exports = function (username, password, done){
    co(function *(){
        try{
            user = yield User.matchUser(username, password)

            if (!user){
                return done(null, false)
            } else {
                return done(null, user)
            }
        } catch (err) {
            console.log(err)
            return done(err)
        }
    })
}
