var passport = require("koa-passport"),
    LocalStrategy = require("passport-local").Strategy,
    User = require("mongoose").model("User"),

    localStrategy = require("./strategy-local.js");

exports.defaultUnauthorizedHandler = function *(next){
    if(this.isAuthenticated()){
        yield next
    }else{
        this.throw(404)
    }
}

passport.serializeUser(function(user, done){
    done(null, user._id)
})
passport.deserializeUser(function(id, done){
    User.findById(id, done)
})
passport.use(new LocalStrategy(localStrategy))

exports.passport = passport
