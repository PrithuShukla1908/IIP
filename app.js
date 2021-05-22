const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
const _ = require('lodash');
app.use(express.static('public'));

const mongoose = require('mongoose');

// VARIABLES
var USER;
var passChange = false;
var accCreated = false;
var loginSuccess = false;
var incorrect = false;
var pasConfErr = false;

mongoose.connect('mongodb://localhost:27017/covidDB', {
     useUnifiedTopology: true,
     useNewUrlParser: true
});
//======= Schema Profile =========
const userSchema = mongoose.Schema({
     firstName: String,
     lastName: String,
     age: Number,
     gender: String,
     dob: Date,
     email: String,
     location: String,
     registered: Date,
     covidStatus: Boolean,
     suspicious: Boolean,
     userName: String,
     Password: String
});

app.use(session({
     secret: "session10292729", 
     resave: false,
     saveUninitialized: false,
     cookie: {
          maxAge: 60000000
     }
}));

const User = mongoose.model("user", userSchema);

//========= rendering login =========
app.get('/', function (req, res){
     res.render('login',{
          passChange: passChange,
          incorrect: incorrect,
          accCreated: accCreated
     });
});
app.post('/', function(req, res){
     const us = req.body.usrname;
     const pass = req.body.password;
     var temp = User.findOne({userName: us, Password: pass}, function(err, u){
          if(u === null){
               incorrect = true;
               res.redirect('/');
          }else{
               loginSuccess = true;
               //var obj2 = JSON.parse(JSON.stringify(obj1));
               USER = JSON.parse(JSON.stringify(u));
               console.log(USER);
               res.redirect('/dashboard/examine');
          }
     });
});

console.log(USER);

//========= render signup =========
app.get('/sign-up', function(req, res){
     res.render("signup", {
          pasConfErr: pasConfErr
     });
})
;
app.post('/sign-up', function(req, res){
     const pass = req.body.password;
     const conf = req.body.confirm;
     if(pass === conf){
          const newUser = new User({
               firstName: req.body.fname,
               lastName: req.body.lname,
               dob: req.body.dob,
               userName: req.body.usrname,
               Password: pass,
               registered: new Date,
               gender: req.body.gender,
               email: req.body.email,
               location: req.body.location,
               covidStatus: false,
               suspicious: false
          });
          User.insertMany([newUser], function(err){
               if(err){
                    res.send(err);
               } else{
                    accCreated = true;
                    res.redirect('/');
               }
          })
     } else{
          pasConfErr = true;
          res.redirect('/sign-up');
     }
});

//========= render developer =========
app.get('/developer', function(req, res){
     res.render('developer');
});

//========= render dashboard =========
app.get('/dashboard', function(req, res){
     res.render("dashboard", {
          accCreated: accCreated,
          loginSuccess: loginSuccess,
          name: USER.firstName + ' ' + USER.lastName,
          username: USER.userName
     });
});

//========= render about =========
app.get("/about", function(req, res){
     res.render("about");
});

//========= Examination =========
app.get('/dashboard/examine', function(req, res){
     console.log(USER);
     res.render("examine", {
          user: USER
     });
});

app.post('/dashboard/examine', function (req, res){

});


//========= Team in Dash =========
app.get('/dashboard/developer', function(req, res){
     res.render('dashTeam');
})
;
//========= forget password =========
app.get('/forgot-password', function(req, res){
     res.render('forgot');
});

app.post('/forgot-password', function(req, res){
     User.findOneAndUpdate({userName: req.body.usrname}, {$set: {Password: req.body.newpassword}}, function(err, u){
          if(err) res.send(err);
          else{
               console.log(u);
               passChange = true;
               res.redirect('/');
          }
     });
});

//========= profile =========
app.get('/dashboard/profile', function(req, res){
     res.render('profile', {
         user: USER,
         today: new Date
     });
});

//========= check-locale =========
app.get('/dashboard/check-locale', function(req, res){
     res.render('checklocale', {
          user: USER
     });
})

app.listen(3000, () => console.log('Server is running on port 3000'));