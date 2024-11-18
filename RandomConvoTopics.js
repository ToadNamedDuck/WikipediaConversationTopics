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

async function main(){
    //The main execution sequence of the program.

    //Generate the list of articles.
    titles = await generateList();
    console.table(titles);

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

function parseInput(response){
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
            //we want to regenerate the random list(s) here
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


//rl.close();
main();