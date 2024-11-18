// My good friend Christian told me to bring 2 topics a day to talk about so we can enjoy more intellectual conversations.
//I am not creative enough to do that, but I am crafty enough, so I will use the power of random Wikipedia articles, as well as their categories, to use as conversation starters or topics

//Importing readline
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var answeredYes = false; //Used for looping the y/n question if the user is not the brightest.
var titles = [];
var articleCategories = [];

async function main(){
    //The main execution sequence of the program.

    await generateAllData();

    regenerateLoop();

}

//Convert rl.question into a promise-based system
function askQuestion(question){
    return new Promise((resolve) => {//create promise
        rl.question(question, (answer) => {//the resolve function for promise input uses rl question to create question
            resolve(answer);//the callback for the question returns the promise answer ?
        })
    })
}

async function regenerateLoop(){
    while(!answeredYes){
        await askQuestion("Is this list satisfactory? y/n \n")
            .then((input) => parseInput(input))
            .then(answer => answeredYes = answer);
    }
}

async function parseInput(response){
    response = response.toLowerCase()
    switch(response){
        case "y":{
            //Job done, ready to close
            console.log("Good")
            rl.close();
            return true;
        }
        case "n":{
            console.log("Too damn bad!")
            //regenerate the random list(s) here
            await generateAllData();

            return false;
        }
        default:{
            console.log("I did not understand that. I will ask again.")
            return false;
        }
    }
}

async function generateList(){
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5"
    const response = await (fetch(url));
    const data = await response.json();
    const articles = data.query.random;
    
    let names = [];
    for(obj of articles){
        names.push(obj.title)
    }
    return names;
}

async function getArticleCategories(articleName){
    var url = `https://en.wikipedia.org/w/api.php?action=parse&page=${articleName}&format=json`;
    const response = await (fetch(url));
    const data = await response.json();
    const categories = data.parse.categories.filter(category => !("hidden" in category));//filters out the categories that contain a key named "hidden"

    const articleCategories = [];

    for(category of categories){
        articleCategories.push(category["*"])
    }

    return articleCategories;
}

async function getCategoriesForAllArticles(articlesArray){
    for(let i = 4; i >= 0; i--){
        articleCategories.push(...await getArticleCategories(articlesArray[i]))
    }
}

async function generateAllData(){
    titles = await generateList();
    console.table(titles);
    await getCategoriesForAllArticles(titles)
    console.table(articleCategories);
}

main();