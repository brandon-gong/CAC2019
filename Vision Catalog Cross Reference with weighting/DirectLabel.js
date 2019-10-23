import Fuse from 'fuse.js';

const fetch = require("node-fetch")



let opts = {"requests":[{"image":{
        "content":"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"
    },"features":[{"type":"LABEL_DETECTION","maxResults":10}]}]}
  

fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAr3tUJjFH9fXUfu7yA_o2KRWYRcfjC8Nk', {
    method: 'post',
    body: JSON.stringify(opts)
}).then(function(response) {
    return response.json();
}).then(function(data) {
    let dataW2 =   [
        {
        "greatGrandParentName": "kitchen",
          "grandParentName": "fruit_scraps",
            "parentName": "apple_cores",
                "name": "Apple Cores",
                "id": 0,
                "type": "g",
                "keywords": [
                  "apple",
                  "core",
                  "fruit",
                  "mcintosh",
                  "fuji",
                  "red",
                  "gala",
                  "crisp",
                  "gold",
                  "granny",
                  "jazz",
                  "ambrosia",
                  "pink",
                  "macoun",
                  "seed",
                  "middle",
                  "center"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "banana_peels",
                "name": "Banana Peels",
                "id": 1,
                "type": "g",
                "keywords": [
                  "banana",
                  "yellow",
                  "peel",
                  "fruit"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "citrus_rinds",
                "name": "Citrus Rinds",
                "id": 2,
                "type": "g",
                "keywords": [
                  "orange",
                  "lemon",
                  "lime",
                  "grapefruit",
                  "rind",
                  "peel",
                  "zest",
                  "fruit"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "fruit_leaves",
                "name": "Fruit Leaves",
                "id": 3,
                "type": "g",
                "keywords": [
                  "leaf",
                  "leaves",
                  "green",
                  "fruit",
                  "plant",
                  "stem",
                  "strawberry",
                  "cherry",
                  "raspberry",
                  "peach",
                  "tomato"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "mushy_wastes",
                "name": "Mushy Wastes",
                "id": 4,
                "type": "g",
                "keywords": [
                  "mushy",
                  "squishy",
                  "Pulpy",
                  "soft",
                  "blob",
                  "strawberry",
                  "cherry",
                  "raspberry",
                  "blueberry",
                  "grape",
                  "waste"
        ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "melon_rinds",
                "name": "Melon Rinds",
                "id": 5,
                "type": "g",
                "keywords": [
                  "melon",
                  "rind",
                  "watermelon",
                  "cantaloupe",
                  "pumpkin",
                  "muskmelon",
                  "seeds",
                  "honeydew"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "leftovers",
                "name": "leftovers",
                "id": 6,
                "type": "g",
                "keywords": [
                  "bagasse",
                  "pits",
                  "Avocado",
                  "stem",
                  "seed"
                ],
                "tips": "Chop up avocado pits so they don't sprout!"
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Wine",
                "id": 7,
                "type": "g",
                "keywords": [
                  "wine",
                  "grape",
                  "vin",
                  "plonk",
                  "alcohol",
                  "ferment",
                  "glass",
                  "bottle",
                  "pinot",
                  "chardonnay",
                  "cabernet",
                  "merlot",
                  "sauvignon",
                  "blanc",
                  "zinfandel",
                  "riesling",
                  "syrah"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Corks",
                "id": 8,
                "type": "b",
                "keywords": [
                  "cork",
                  "wood",
                  "bark",
                  "stopper",
                  "wine",
                  "plug"
                ],
                "tips": "Chop these up so they decompose faster!"
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Beer",
                "id": 9,
                "type": "g",
                "keywords": [
                  "beer",
                  "alcohol",
                  "ferment",
                  "barley",
                  "hop",
                  "ale",
                  "cask",
                  "ipa",
                  "barrel",
                  "bitter",
                  "cider",
                  "lager",
                  "liquor",
                  "malt",
                  "mead",
                  "pub",
                  "saccharomyces",
                  "yeast",
                  "keg",
                  "heineken",
                  "budweiser",
                  "stella" ,
                  "corona",
                  "miller",
                  "tecate",
                  "guinness",
                  "coors",
                  "busch",
                  "michelob"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Plant-based milks",
                "id": 10,
                "type": "g",
                "keywords": [
                  "milk",
                  "dairy",
                  "almond",
                  "coconut",
                  "rice",
                  "soy",
                  "rice",
                  "peanut",
                  "oat",
                  "white",
                  "cereal",
                  "vegan"
                ],
                "tips": "Try not to compost real milk, it can attract pests!"
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Coffee grounds",
                "id": 11,
                "type": "g",
                "keywords": [
                  "coffee",
                  "bean",
                  "caffeine",
                  "roast",
                  "joe",
                  "java",
                  "latte",
                  "cappucino",
                  "espresso",
                  "macchiato",
                  "black",
                  "arabica",
                  "robusta",
                  "liberica",
                  "excelsa",
                  "starbucks",
                  "folger",
                  "dunkin",
                  "maxwell",
                  "nescafe",
                  "blend"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Coffee filters",
                "id": 12,
                "type": "b",
                "keywords": [
                  "coffee",
                  "paper",
                  "strainer",
                  "sieve",
                  "thin"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Tea bags",
                "id": 13,
                "type": "b",
                "keywords": [
                  "tea",
                  "pouch",
                  "lipton",
                  "twining",
                  "leaf",
                  "porous"
                ],
                "tips": "Make sure they're made of natural materials like hemp or cotton."
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Tea leaves",
                "id": 14,
                "type": "g",
                "keywords": [
                  "tea",
                  "caffeine",
                  "dry",
                  "green",
                  "black",
                  "herb",
                  "oolong",
                  "ferment",
                  "infusion",
                  "puer",
                  "lipton",
                  "twining",
                  "bigelow",
                  "tetley",
                  "leaf"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Pasta sauces",
                "id": 15,
                "type": "g",
                "keywords": [
                  "sauce",
                  "tomato",
                  "paste",
                  "marinara",
                  "arrabbiata",
                  "italian",
                  "barilla",
                  "prego",
                  "ragu",
                  "heinz"
                ],
                "tips": null
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Melted ice cream",
                "id": 16,
                "type": "g",
                "keywords": [
                  "dessert",
                  "milk",
                  "frozen",
                  "yogurt",
                  "custard",
                  "soft",
                  "chocolate",
                  "vanilla",
                  "haagen",
                  "blue",
                  "ben",
                  "breyer",
                  "magnum",
                  "edy"
                ],
                "tips": "Only a little bit at a time, otherwise you'll attract pests!"
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Cheese",
                "id": 17,
                "type": "g",
                "keywords": [
                  "yellow",
                  "white",
                  "blue",
                  "feta",
                  "gouda",
                  "cheddar",
                  "brie",
                  "asiago",
                  "mozzarella",
                  "provolone",
                  "ricotta",
                  "jack",
                  "muenster",
                  "goat",
                  "swiss",
                  "parmesan",
                  "american",
                  "dairy",
                  "milk",
                  "sargento",
                  "kraft",
                  "velveeta",
                  "borden",
                  "frigo"
                ],
                "tips": "Compost in moderation."
        },
        {
          "greatGrandParentName": "kitchen",
            "grandParentName": "fruit_scraps",
              "parentName": "liquids",
                "name": "Jellies, jams, and preserves",
                "id": 18,
                "type": "g",
                "keywords": [
                  "conserve",
                  "marmalade",
                  "confiture",
                  "extract",
                  "pectin",
                  "jar",
                  "spread",
                  "gelatin",
                  "chutney",
                  "compote",
                  "strawberry",
                  "concord",
                  "grape",
                  "apple",
                  "fruit",
                  "blackberry",
                  "boysenberry",
                  "apricot",
                  "bonne",
                  "smucker",
                  "welch"
                ],
                "tips": null
        },
        {
          "grandParent": "bathroom",
            "parent": "tissue",
              "name": "Facial tissues",
              "id": 19,
              "type": "b",
              "keywords": [
                "paper",
                "kleenex",
                "soft",
                "thin",
                "puff",
                "scott",
                "hankerchief",
                "allergy",
                "napkin"
              ],
              "tips": null
        },
        {
          "grandParent": "bathroom",
            "parent": "cotton",
              "name": "Cotton products",
              "id": 20,
              "type": "b",
              "keywords": [
                "cotton",
                "pad",
                "swab",
                "ball",
                "bud",
                "qtip",
                "soft",
                "clean",
                "beauty",
                "fluffy"
              ],
              "tips": "You can only compost 100% cotton products.  Double check!"
        },
        {
          "grandParent": "miscellaneous",
            "parent": "fabric",
              "name": "Clothing and fabric",
              "id": 21,
              "type": "g",
              "keywords": [
                "cloth",
                "sheet",
                "strip",
                "pant",
                "shirt",
                "jean",
                "sock",
                "underwear",
                "cotton",
                "wool",
                "towel",
                "curtain",
                "blanket",
                "quilt",
                "comfort",
                "scrap",
                "textile",
                "chenille",
                "chiffon",
                "corduroy",
                "damask",
                "egyptian",
                "bra",
                "faille",
                "gaberdine",
                "jacquard",
                "jersey",
                "knit",
                "thread",
                "lace",
                "latex",
                "linen",
                "fiber",
                "fleece",
                "satin",
                "silk",
                "supima",
                "tricot",
                "velvet",
                "jacket",
                "coat",
                "trouser",
                "short",
                "suit",
                "skirt",
                "dress",
                "sweater",
                "costume",
                "garb",
                "wear",
                "tatter",
                "uniform",
                "garment",
                "rag",
                "regalia",
                "label",
                "gear",
                "drag",
                "disguise",
                "combat",
                "casual",
                "delicate",
                "sheep",
                "shear",
                "sunday",
                "top",
                "bottom",
                "nike",
                "adidas",
                "levi",
                "gucci",
                "polo",
                "calvin",
                "aeropostale",
                "uniqlo",
                "hilfiger",
                "burberry",
                "boss",
                "prada",
                "kors",
                "macy",
                "target",
                "hane",
                "urban",
                "american",
                "outfit",
                "hollister",
                "abercrombie",
                "fila",
                "gap",
                "volcom",
                "shade"
                ],
              "tips": "Make sure your fabrics are 100% natural (cotton, wool, etc) and cut them up into strips so they break down faster!"
        },
          {"grandParent": "miscellaneous",
              "parent" : "newspapers",
                "name" : "Newspapers",
                "id" : 22,
                "type" : "g",
                "keywords" : [
                    "news",
                    "comic",
                    "paper",
                    "print",
                    "tabloid",
                    "weekly",
                    "sunday",
                    "press",
                    "tabloid",
                    "article",
                    "publication",
                    "new york",
                    "wall street",
                    "time",
                    "tribune",
                    "USA",
                    "daily",
                    "post",
                    "journal"
                  ],
                "tips" : null
                } 
        
        
        
        ];
    let options = {
        shouldSort: true,
        threshold: 0.3,
            
        keys: [{
            name: 'name',
            weight: 0.7
        }, {
            name: 'keywords',
            weight: 0.3
        }]  //end keys weight
        }; //end options 
    //let fuse = new Fuse(dataW2, options);
    //let fuse = new Fuse(dataW2, options);
    let fullList = data.responses[0].labelAnnotations.filter((annotation) => annotation.score > 0.80);
    let reccs = [];
    let filterReccs = [];
    let possibleResult = [];
    for(let i = 0; i < Math.min(fullList.length, 5); i++) {
        reccs.push({name : fullList[i].description});
        filterReccs.push(JSON.stringify(reccs[i].name))    
        }
    //console.log((data.responses[0].labelAnnotations))
    //console.log(reccs)
    //reccs = reccs.replace('name:', '')
    //console.log(filterReccs.length)
    //console.print(dataW2.length)
    console.log(dataW2.length)
    for(let j = 0; j < filterReccs.length; j++){
        let value = filterReccs[j]
        //unverResult = fuse.search[value]
    
    
        // for(let g=0; g< Math.min(unverResult.length, 5); g++){
        //     possibleResult.push(JSON.stringify(unverResult[g].name))               
        // }
    }


});



//fullList.push(JSON.stringify(data));
//console.log("list one is" + fullList[0])