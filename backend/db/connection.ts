const mongoose = require('mongoose')

module.exports = (url:string) => {
    return mongoose.connect(url)
}
