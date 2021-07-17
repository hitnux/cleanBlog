const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const Blog = require('./models/Blog');

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async  (req, res) => {
    const blogs = await Blog.find({});
    res.render('index', {
      blogs
    });
});
app.get('/addpost', async  (req, res) => {
  res.render('add_post');
});

app.get('/post/:path', async  (req, res) => {
  const post = await Blog.findOne({path : req.params.path});
  res.render('post', {post});
});

app.post('/newpost', async (req, res) => { 
  req.body.path = req.body.title.replace(' ', '').toLowerCase();
  await Blog.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
