const { getMatches } = require('./message')
const moment = require('moment')


const getLastMatches = (number, callback)=> {
    getMatches((matches)=> {
        if(matches.length < number)
        {
            number = matches.length - 1
        }
        matches.sort((a, b)=> {
            return moment(a.created_date).diff(moment(b.created_date))
        })
        callback(matches.slice(-number))
    })
}

module.exports = {
    getLastMatches
}
