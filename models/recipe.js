var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    nutrition: Number,
    flavor: Number,
    cost: Number
    
});
module.exports= mongoose.model("Recipe", recipeSchema);