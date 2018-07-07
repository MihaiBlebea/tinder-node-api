const connection = require('./../connect.js')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const salt = 'tindersecretsalt'

var UserSchema = new connection.Schema({
    name: {
        type: String,
        required: true
    },
    fb_credentials: {
        fb_client_id: {
            type: String,
            required: false
        },
        fb_token: {
            type: String,
            required: false
        },
    },
    tinder_token: {
        type: String,
        required: false
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: {
            validator: (value)=> {
                return validator.isEmail(value)
            },
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

// Middleware //
UserSchema.pre('save', function(next) {
    var user = this
    if(user.isModified('password'))
    {
        bcrypt.genSalt(10, (error, salt)=> {
            bcrypt.hash(user.password, salt, (error, hashedPassword)=> {
                user.password = hashedPassword
                next()
            })
        })
    } else {
        next()
    }
})

// Custom methods //
UserSchema.methods.toJSON = function() {
    var userObject = this.toObject()
    return {
        name: userObject.name,
        email: userObject.email,
        phone: userObject.phone
    }
}

UserSchema.statics.findByToken = function(token) {
    var decoded;
    try {
        decoded = jwt.verify(token, salt)
    } catch(error) {
        return Promise.reject()
    }
    return this.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }).then((user)=> {
        return user
    })
}

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this
    return User.findOne({ email: email }).then((user)=> {
        if(!user)
        {
            return Promise.reject()
        }

        return new Promise((resolve, reject)=> {
            bcrypt.compare(password, user.password, (error, result)=> {
                if(result)
                {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

UserSchema.methods.generateJWT = function() {
    var access = 'auth'
    var token = jwt.sign({ _id: this._id.toHexString(), access }, salt).toString()
    this.tokens.push({ access: access, token: token })
    return this.save().then(()=> {
        return token
    })
}

var User = connection.model('User', UserSchema)

module.exports = User
