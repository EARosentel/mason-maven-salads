var express = require("express"),
    router = express.Router({mergeParams: true}),
    Recipe = require("../models/recipe"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/new", {recipe: recipe});
        }
    });
    
    
});


// CREATE COMMENT
router.post("/", middleware.isLoggedIn, function(req, res){
    Recipe.findById(req.params.id,function(err, recipe){
        if(err){
            console.log("fuck");
        } else {
            
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    res.redirect("back");
                } else {
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    recipe.comments.push(comment);
                    recipe.save();
                    res.redirect("/recipes/"+recipe._id);
                }
            });
            
            
        }
    });
    
    
});

// SHOW EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {recipe_id: req.params.id, comment: foundComment});
        }
    });       
   
});


// UPDATE EDITED COMMENT
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/recipes/"+req.params.id);
       }
   });
});


// DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
         if(err){
             res.redirect("back");
         } else {
         res.redirect("/recipes/"+req.params.id);
         }
     });
});


module.exports = router;