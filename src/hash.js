const { SHA256 } = require('crypto-js')


var hashPassword = (password)=> {
    return SHA256(password).toString()
}

module.exports = {
    hashPassword
}
