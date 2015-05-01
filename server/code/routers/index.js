var Router = require("koa-router")
var handlers = require("../handlers")
var passport = require("koa-passport")

var public = exports.public = new Router()
public.get("/", handlers.root)
public.get("/register", handlers.register.renderPage)
public.get("/login", handlers.login.renderPage)
public.post("/register", handlers.register.createUser)
public.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/register"
}))

var private = exports.private = new Router()
private.get("/secret", handlers.secret)
