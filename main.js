// Set up npms
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user");
var seedDB = require("./seeds");
var Passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var commentRoutes = require("./routes/comments");
var recipeRoutes = require("./routes/recipes");
var indexRoutes = require("./routes/index");
var dburl = "mongodb://ellierosentel:Code1234@ds015849.mlab.com:15849/mason_maven_salads";
//process.env.DATABASEURL || "mongodb://localhost/mason_maven_salads";

mongoose.connect(dburl);
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

// PASSPORT CONFIG

app.use(require("express-session")({
   secret: "Your mom.",
   resave: false,
   saveUninitialized: false
}));

app.use(Passport.initialize());
app.use(Passport.session());

Passport.use(new LocalStrategy(User.authenticate()));
Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.thisUser = req.user;
   res.locals.messageError = req.flash("error");
   res.locals.messageSuccess = req.flash("success");
   next();
});


// USE ROUTES
app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);


// Listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Mason Maven running"); 
});