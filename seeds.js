var mongoose = require("mongoose"),
    Recipes = require("./models/recipe"),
    Comment = require("./models/comment");
    
var data = [
        {   name: "Taco Salad",
            image: "http://i.imgur.com/wCvQ5O7.jpg",
            description: "Salsa, corn, black beans, rice, and diced tomatoes.",
            comments: [],
            author: { username: 'MommaJoy', id: '5759e005c042242b0cc88568' },
            nutrition: 5,
            flavor: 5,
            cost: 1
        
        },
        {   name: "Autumn Berries",
            image: "http://i.imgur.com/wa5cT2d.jpg",
            description: "Strawberries and blueberries in club soda and lemon juice, lots of spinach, topped with walnuts in a small bag to keep them fresh.",
            comments: [],
            author: { username: 'MommaJoy', id: '5759e005c042242b0cc88568' },
            nutrition: 4,
            flavor: 3,
            cost: 2
        },
        {   name: "Minty Apple Couscous",
            image: "http://i.imgur.com/wH9KNrH.jpg" ,
            description: "Couscous, then apple tossed in mint and lemon juice, topped with chickpeas.",
            comments: [],
            author: { username: 'MommaJoy', id: '5759e005c042242b0cc88568' },
            nutrition: 2,
            flavor: 5,
            cost: 4
        },
        {   name: "Summer Beans and Zucchini",
            image: "http://i.imgur.com/qvA40Nz.jpg",
            description: "Diced red onion, diced zucchini, diced tomato, corn, great white beans, and romaine.",
            comments: [],
            author: { username: 'MommaJoy', id: '5759e005c042242b0cc88568' },
            nutrition: 5,
            flavor: 4,
            cost: 3
                
        },
        {   name: "German Potato Salad",
            image: "http://i.imgur.com/Ujx3POJ.jpg",
            description: "Finely diced apple, green peas, baked potato cubed in spicy mustard, spinach.",
            comments: [],
            author: { username: 'MommaJoy', id: '5759e005c042242b0cc88568' },
            nutrition: 2,
            flavor: 5,
            cost: 2
                
        }
    ];

// MommaJoy pass
// { username: 'MommaJoy', id: '5759bd06f6ec85ad0749e121'}
// ellie asdf
// { username: 'ellie', id: '5758757b393c8f831d2fc76f'}
// Crazy4Salad asdf
// { username: 'Crazy4Salad', id: '5759bd5ff6ec85ad0749e123'}
// EllieRosentel password
// { username: 'EllieRosentel', id: '5758434e747d784e0e342c6b'}
    
    
    
function seedDB(){
    Recipes.remove({}, function(err){
        if(!err){
            console.log("Recipes Gone.");
            //loop through data
            data.forEach(function(seed){
                 Recipes.create(seed, function(err, recipe){
                    if(err){
                        console.log(err);
                        
                    } 
                    else {console.log("added recipe "+seed.name);
                      
                    }
                })
            });
        } else {
            console.log("seed file error");
        }
    });
}
module.exports = seedDB;