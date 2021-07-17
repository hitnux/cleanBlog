const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload()); 


// Controllers
require('./lib/controllersLoader')(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
