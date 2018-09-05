var middlewareObj = {};
var Recipe = require("../models/recipe"),
    Comment = require("../models/comment");


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be signed in to do that");
    res.redirect("/login");
};

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", err.message);
                res.redirect("/recipes/"+req.params.id);
            }
            else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You lack permission to do that.");
                  res.redirect("/recipes/"+req.params.id);  
                }
                
            }
         });
    
    } else {
        req.flash("error", "You lack permission to do that.");
        res.redirect("/recipes/"+req.params.id);
    }
    
};


middlewareObj.checkRecipeOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id, function(err, foundCG){
            if(err){
                req.flash("error", err.message);
                res.redirect("/recipes/"+foundCG.id);
            }
            else {
                if(foundCG.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You lack permission to do that.");
                    res.redirect("/recipes/"+foundCG.id);  
                }
                
            }
         });
    
    } else {
        req.flash("error", "You lack permission to do that.");
        res.redirect("/recipes/"+req.params.id);
    }
    
};

module.exports = middlewareObj;