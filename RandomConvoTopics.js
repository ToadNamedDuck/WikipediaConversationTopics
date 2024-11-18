// My good friend Christian told me to bring 2 topics a day to talk about so we can enjoy more intellectual conversations.
//I am not creative enough to do that, but I am crafty enough, so I will use the power of random Wikipedia articles, as well as their categories, to use as conversation starters or topics

//Importing readline
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main(){
    //The main execution sequence of the program.
    rl.question("Is this satisfactory to you? y/n \n", (input) => {parseInput(input)});

}

function parseInput(response){
    response = response.toLowerCase()
    switch(response){
        case "y":{
            //Job done, ready to close
            console.log("Good")
            break;
        }
        case "n":{
            console.log("Too damn bad!")
            //we want to regenerate the random list(s) here
            break;
        }
        default:{
            console.log("I did not understand that. Please try entering 'y' or 'n' again.")
        }
    }
    rl.close();
}

main();