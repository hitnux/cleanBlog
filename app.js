const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

mongoose.connect('mongodb+srv://hitnus:15.htn.15@cluster0.nuzzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
