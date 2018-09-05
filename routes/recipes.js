var express = require("express"),
    router = express.Router({mergeParams: true}),
    Recipe = require("../models/recipe"),
    middleware = require("../middleware"),
    sizeOf = require('image-size');
    
var url = require('url');
var http = require('http-request');


// NEW RECIPE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("recipes/new"); 
});

// CREATE RECIPE
router.post("/", middleware.isLoggedIn, function(req,res){
    
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var nutrition = req.body.nutrition;
    var flavor = req.body.flavor;
    var cost = req.body.cost;
    var newRecipe = {name: name, image: img, description: desc, nutrition: nutrition, flavor: flavor, cost: cost};

    Recipe.create(newRecipe, function(err, createdRecipe){
       if(err){
           console.log(err);
       } else {
           var author = {
               username: req.user.username,
               id: req.user._id
           };
           console.log(author);
           createdRecipe.author = author;
           createdRecipe.save();
           res.redirect("/recipes");
       }
    });
    
});

// SHOW RECIPE AND COMMENTS
router.get("/:id", function(req, res){
   // find recipe with that ID
   Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
      if(err){
          console.log(err);
      } else {
          res.render("recipes/show", {recipe: foundRecipe});
      }
   });
});

// EDIT RECIPE
router.get("/:id/edit", middleware.checkRecipeOwner, function(req, res) {
   
        Recipe.findById(req.params.id, function(err, foundRecipe){
            if(err){
                res.redirect("/recipes");
            }
            else {
                res.render("recipes/edit", {recipe: foundRecipe});
            }
         });
    
});

// UPDATE RECIPE
router.put("/:id", middleware.checkRecipeOwner, function(req, res){
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedCG){
        if(err){
            res.redirect("/recipes");
        }
        else {
            
            res.redirect("/recipes/"+req.params.id);
        }
    });
});

// DESTROY RECIPE
router.delete("/:id", middleware.checkRecipeOwner, function(req, res){
     Recipe.findByIdAndRemove(req.params.id, function(err){
         if(err){
             res.redirect("back");
         } else{
         res.redirect("/recipes");
         }
             
    });
});


module.exports = router;