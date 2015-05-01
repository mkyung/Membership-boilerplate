var koa = require("koa"),
    app = koa(),
    logger = require("koa-logger"),
    router = require("koa-router"),
    bodyParser = require("koa-bodyparser"),
    koaqs = require("koa-qs"),
    session = require("koa-session"),
    validate = require("koa-validate"),
    render = require("koa-swig"),
    path = require("path"),
    mongoose = require("mongoose"),
    autoIncrement = require("mongoose-auto-increment"),
    config = require("./config.json");

app.keys = config.app.keys

// Initialize database
connection = mongoose.connect("mongodb://membership_db_1:27017/server")
autoIncrement.initialize(connection)

// Initialize models after database
var models = require("./models")

// Auth
var auth = require("./auth")

app.use(logger())
app.use(router(app))
app.use(bodyParser())
app.use(validate())
app.use(session({key: "membership"}, app))
app.use(auth.passport.initialize())
app.use(auth.passport.session())

// Swig (Template rendering engine)
app.context.render = render({
    root: path.join(__dirname, "templates"),
    autoescape: true,
    cache: "memory",
    ext: "html"
})

// Initialize router
routers = require("./routers")
app.use(routers.public.middleware())
app.use(auth.defaultUnauthorizedHandler)
app.use(routers.private.middleware())

console.log("Server running")
app.listen(8080)
