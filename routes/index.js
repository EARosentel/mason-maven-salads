var express = require("express"),
    router = express.Router({mergeParams: true}),
    Recipe = require("../models/recipe"),
    Passport = require("passport"),
    User = require("../models/user");

// LANDING
router.get("/", function(req, res){
    res.render("landing");
});

// INDEX
router.get("/recipes", function(req, res){
    Recipe.find({}, function(err,allRecipes){
       if(err){
           console.log(err);
       } else {
           res.render("recipes/index", {Recipes:allRecipes});
       }
    });
    
});

// ====================
// AUTHORIZATION ROUTES
// ====================

// SHOW REGISTRATION
router.get("/register", function(req, res) {
    res.render("register");
});

// REGISTER NEW USER
router.post("/register", function(req, res){
    var newUser = {username: req.body.username};
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", "That username already exists.");
           return res.redirect("/register");
       }
       
       Passport.authenticate("local")(req, res, function(){
           res.redirect("/recipes");
       });
       
    });
    // res.send("signing up!");
});

// SHOW LOGIN
router.get("/login", function(req, res){
        res.render("login"); 
    }
);

// LOGIN USER
// router.post("/login", Passport.authenticate("local",
//     {   
//         //successRedirect: "/back",
//         failureRedirect: "/login",
        
//     }), function(req, res){
//         req.flash("success", "Welcome back, "+req.user.username+".");
//         res.redirect("/recipes");
//     }
// );

router.post("/login", function(req, res, next) {
  Passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.flash("error", "Username or password incorrect.");
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect("/recipes");
    });
  })(req, res, next);
});

// LOGOUT
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Log out successful.");
   res.redirect("/recipes"); 
});




module.exports = router;