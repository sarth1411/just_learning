const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ssplink', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const allpostSchema = new mongoose.Schema({
   
    posts: {
        type : [String],
    }

})

const allPost = mongoose.model('allPost', allpostSchema);
module.exports = allPost;