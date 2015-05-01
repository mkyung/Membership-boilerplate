// Adapted from http://ghost-dozoisch.rhcloud.com/integrating-passportjs-with-koa/

var mongoose = require("mongoose"),
    bcrypt = require("co-bcrypt"),
    autoIncrement = require("mongoose-auto-increment"),
    co = require("co");

Schema = mongoose.Schema

userSchema = new Schema({
    username: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true}
}, {
    toJSON: {
        transform: function(doc, ret, options){
            delete ret.password
        }
    }
})

userSchema.pre("save", function (done){
    if (!this.isModified("password")) return done()

    var self = this

    co(function *(){
        try {
            var salt = yield bcrypt.genSalt(10)
            var hash = yield bcrypt.hash(self.password, salt)
            self.password = hash

            done()
        } catch (error) {
            done(error)
        }
    })
})

userSchema.methods.comparePassword = function *(candidatePassword){
    return yield bcrypt.compare(candidatePassword, this.password)
}

userSchema.statics.matchUser = function *(username, password){
    var user = yield this.findOne({"username": username.toLowerCase()}).exec()
    if(!user) throw new Error("User not found")
    if(yield user.comparePassword(password)) return user

    throw new Error("Password not matched")
}

userSchema.index({username: 1}, {unique: true})
userSchema.index({uid: 1}, {unique: true})
userSchema.plugin(autoIncrement.plugin, {model: "User", field: "uid"})

module.exports = mongoose.model("User", userSchema)
