const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ssplink', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: [0, 'age should be greater than 0']
    },
    graduation_degree: {
        type: String,
        default: "none"
    },
    postgraduation_degree: {
        type: [String],
        default: "none"
    },
    skills: {
        type: [String],
    },
    past_joined_company: {
        type: [String],
        default: "fresher"
    },
    intrested_company: {
        type: [String],
        required: true,
    },
    checked: {
        type: Boolean,
        default: "false"
    },
    company_selected: {
        type: Boolean,
        default: "false"
    },
    posts: {
        type: [String],
    }

})

const allpostSchema = new mongoose.Schema({
    memid: {
        type: String,
    },
    names: {
        type: String,
    },
    postData: {
        type: [String],
    }

})

const allPost = mongoose.model('allPost', allpostSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = { Candidate, allPost };