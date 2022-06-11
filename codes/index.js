const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const app = express()
const {Candidate, allPost} = require('./model/candidate')


const postsAll = [];

mongoose.connect('mongodb://localhost:27017/ssplink', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extend: true }))
app.use(methodOverride('_method'))

app.get('/', async(req, res)=>{
    // const members = await Candidate.find({})
    const allthepost = await allPost.find({})
    res.render('home',{ allthepost });
   
})

app.get('/pend_candidates', async(req, res)=>{
    const candidates = await Candidate.find({checked : false});
    // console.log(candidates.name)
    res.render('pend_candidates',{candidates})
})



app.post('/candidate/:id/post', async(req,res)=>{
    const { id } = req.params
    const { post } = req.body;
    const found = await Candidate.findById(id);
    
    // // console.log(id)
    // console.log(post)
    // postsAll.unshift(obj)
    const forallpost = {
        memid : id,
        names : found.name,
        postData: post
    }
    // await Candidate.findByIdAndUpdate(id,   { "$push": { "posts": post } }, { "new": true, "upsert": true })
    
    const newpost = new allPost(forallpost)
    await newpost.save()
    // const allthepost = allPost.find({})
    const allpostoffound = await allPost.find({memid : id})
    console.log(allpostoffound)
    res.render('show', {found, allpostoffound})
})


app.put('/pend_candidates/:id/verify', async(req,res)=>{
    const { id } = req.params;
    // console.log(id)
    const found = await Candidate.findByIdAndUpdate(id, req.body)
    // found.checked = true;
    res.redirect('/pend_candidates')
})

app.delete('/candidate/:id/:idp/post',async(req,res)=>{
    const { id,idp } = req.params
    const found = await Candidate.findById(id);
     await allPost.findByIdAndDelete(idp);
    const allpostoffound = await allPost.find({memid : id})
    res.render('show',{found, allpostoffound})
})

app.get('/candidate/:id/show', async(req,res)=>{
    const { id } = req.params;
    const found = await Candidate.findById(id);
    const allpostoffound = await allPost.find({memid : id})
    // console.log(allpostoffound)
    res.render('show', {found, allpostoffound})
    // res.render('show',{found});
})

app.get('/candidate/new', (req,res)=>{
    res.render('new')
})

app.delete('/candidate/:id', async (req,res)=>{
    const { id } = req.params;
    const deletedCandidate = await Candidate.findByIdAndDelete(id);
    res.redirect('/pend_candidates');
})

app.post('/candidate', async(req,res)=>{
    const newCandidate = new Candidate(req.body)
    await newCandidate.save();
    res.redirect('/');
})

app.get('/candidate/show', (req,res)=>{
    res.render('show');
})

app.listen(3000, ()=>{
    console.log("listening on port : 3000");
})
