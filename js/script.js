//global vars
var maxCombos = 11, maxSize = 10;
var percentProb40 = 40, percentProb20 = 20, percentProb10 = 10;
var playerSum = 0, computerSum = 0;

$(document).ready(function() {
    $("#start_game").one("click", function() {
        var MAX_ROUNDS = 10;
        var gameIsActive = true; //check for if game is active or not
        var playerScore = 0, computerScore = 0;
        var roundCounter = 1;
        var b = [], c = [];  //implicit array declaration in js, safest method

        //game pre-initialization process
        window.alert("Welcome to the game of Chance-it!! You will be playing against the computer.");
        var seed = prompt("Please enter a number:");

        while(isNaN(seed))
            seed = prompt("Please enter a number:");

        var randomNum = psrand(seed);
        window.alert("The game will now begin. Good luck!");

        do {
            playerScore = playerLogic();
            $(".game_board").append("<p>-------------------------------------------------------------------</p>");
            computerScore = computerLogic();
            //$(".game_board").empty(); //clear screen
            $(".game_board").append("<p>" + roundCounter + " rounds have completed, the results are:</p>");

            //tabulate sum of scores for both players since global vars
            playerSum += playerScore;
            computerSum += computerScore;

            printBoard(b, c, roundCounter, playerScore, computerScore);
            roundCounter++;

            if (roundCounter != MAX_ROUNDS + 1)
                gameIsActive = confirm("Want to keep playing?");

            } while ((roundCounter != MAX_ROUNDS + 1) && gameIsActive);

            if (computerSum > playerSum) {
                $(".game_board").append("<p>The computer wins with a Grand Total of: " + computerSum + "</p>");
                $(".game_board").append("You have only a measly score of: " + playerSum + "</p>");
            }

            else if (playerSum > computerSum) {
                $(".game_board").append("<p>You win with a Grand Total of: " + playerSum + "</p>");
                $(".game_board").append("<p>The computer has only a measly score of: " + computerSum + "</p>");
            }

            else if (playerSum === computerSum)
                $(".game_board").append("Well, this is awkward... It's a tie!");

            $("game_board").append("Thanks for playing!");
    });
});

//psuedorandom number generator
function psrand(a){
    a = (a+0x7ed55d16) + (a<<12);
    a = (a^0xc761c23c) ^ (a>>19);
    a = (a+0x165667b1) + (a<<5);
    a = (a+0xd3a2646c) ^ (a<<9);
    a = (a+0xfd7046c5) + (a<<3);
    a = (a^0xb55a4f09) ^ (a>>16);
    if( a < 0 ) a = 0xffffffff + a;
    return a;
}

//player logic
function playerLogic() {
    var playerScore = 0;
    var i, j, temp, arrayTracker = 0, currentCount = 1, currentVal = 1;
    var chanceIt = true;
    var d = [];

    $(".game_board").append("<br />");

    while(chanceIt && (currentVal != 0)) {
        playerScore = roll();
        d[arrayTracker] = playerScore;
        currentVal = playerScore;

        for(i = 0; i < arrayTracker && currentVal != 0; i++) {
            if(currentVal === d[arrayTracker - i - 1]) {
                $(".game_board").append("<p>You rolled " + currentVal + " AGAIN.</p>");
                $(".game_board").append("<p>You LOST this turn.</p>");
                currentVal = 0;
            }
        }

        if(currentVal != 0) {
          $(".game_board").append("<p>You rolled a: " + d[arrayTracker] + "</p>");
          $(".game_board").append("<p>You have already rolled: ");

        for(i = 0; i < currentCount; i++) {
            for (j = 0; j < currentCount - i - 1; j++) {
                if (d[j] > d[j + 1]) {
                    temp = d[j];
                    d[j] = d[j + 1];
                    d[j + 1] = temp;
                }
            }
         }

        for(j = 0; j < currentCount; j++)
            $(".game_board").append(d[j] + " ");
        $(".game_board").append("</p>");

         if(currentVal != 0)
            chanceIt = confirm("Do you want to chance it? (OK or CANCEL)");

         else
            $(".game_board").append("<br />");

         currentCount++;
         arrayTracker++;

        }
    }
    return currentVal;
}

function roll() {
    var firstRoll, secondRoll, sumRoll;
    firstRoll = 1 + Math.floor((Math.random()*6) % 6);
    secondRoll = 1 + Math.floor((Math.random()*6) % 6);
    sumRoll = firstRoll + secondRoll;
    return sumRoll;
}

function calcProbability(givenProbability) {
    var randomNumber;
    randomNumber = Math.floor(Math.random() * 100);

    if (randomNumber < givenProbability)
        return 1;
    else
        return 0;

    return randomNumber;
}

function computerLogic() {
    var currentRoll, newRoll;
    currentRoll = roll();

    $(".game_board").append("<p>Computer rolled a: " + currentRoll + " </p>");

    if (currentRoll <= 5) {
        newRoll = roll();
        $(".game_board").append("<p>Chance-it! computer rolled a: " + newRoll + "</p>");

        if (currentRoll != newRoll)
            currentRoll = newRoll;

        else if(currentRoll === newRoll) {
            currentRoll = 0;
            $("game_board").append("<p>Computer LOST on Chance-it.</p>");
        }
    }

    if ((5 < currentRoll) && (currentRoll <= 7)) {
        if (calcProbability(percentProb40)) {
            newRoll = roll();
            $(".game_board").append("<p>Chance-it! computer rolled a: " + newRoll + "</p>");

            if (currentRoll != newRoll)
                currentRoll = newRoll;

            else if (currentRoll === newRoll) {
                currentRoll = 0;
                $("game_board").append("<p>Computer LOST on Chance-it.</p>");
            }
        }
    }

    if ((7 < currentRoll) && (currentRoll <= 9)) {
        if (calcProbability(percentProb20)) {
            newRoll = roll();
            $(".game_board").append("<p>Chance-it! computer rolled a: " + newRoll + "</p>");

            if (currentRoll != newRoll)
                currentRoll = newRoll;

            else if (currentRoll == newRoll) {
                currentRoll = 0;
                $("game_board").append("<p>Computer LOST on Chance-it.</p>");
            }
        }
    }

    if (currentRoll == 10) {
        if (calcProbability(percentProb10)) {
            newRoll = roll();
            $(".game_board").append("<p>Chance-it! computer rolled a: " + newRoll + "</p>");

            if (currentRoll != newRoll)
                currentRoll = newRoll;

            else if (currentRoll == newRoll) {
                currentRoll = 0;
                $("game_board").append("<p>Computer LOST on Chance-it.</p>");
            }
        }
    }
    return (currentRoll);
}

function printBoard(b, c, roundCounter, playerScore, computerScore) {
    //preboard initialization
    var i = roundCounter;
    b[roundCounter - 1] = playerScore;
    c[roundCounter - 1] = computerScore;

    //ugly board layout, needs to be reformatted using divs and trs
    $(".game_board").append("<p>-------------------------------------------------------------------</p>");
    $(".game_board").append("<p>| Round    |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | Total |</p>");
    $(".game_board").append("|Human   |");

    for (var j = 0; j < roundCounter; j++)
         $(".game_board").append(" " + b[j] + " |");


    for (var j = 0; j + 1 <= maxSize - roundCounter; j++)
         $(".game_board").append("    |");

    $(".game_board").append(playerSum + " |");
    $(".game_board").append("<br>|Computer |");

    for (var j = 0; j < roundCounter; j++)
         $(".game_board").append(c[j] + " |");


    for (var j = 0; j + 1 <= maxSize - roundCounter; j++)
         $(".game_board").append("    |");


    $(".game_board").append("  " + computerSum);
    $(".game_board").append("<p>-------------------------------------------------------------------</p>");
}
