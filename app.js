var express= require('express');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/MusicCenter')
var app=express();

app.set('view engine','ejs');
app.use('/resources',express.static('resources'));
app.use('/public',express.static('public'))

var utility=require('./models/itemUtil.js')
var catalogController=require('./routes/catalogController')
var profileController=require('./routes/profileController')
var session=require('express-session')
app.use(session({secret:"This is assignment 5",resave: false,saveUninitialized: true}));

app.use('/',profileController);
app.use('/',catalogController);


app.listen(8080);
//------------------------------------------#index page ---------------------------------------------------------
