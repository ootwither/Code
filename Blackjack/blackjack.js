$(document).ready(function(){ // start script only after page load
deckInitialize(); // our giant deck object is at the bottom of the page, out of sight
//setup starts here
let playerArray = []; //initialize the array we'll hold player cards in
let dealerArray = []; //same for the dealer's array
let dealerCounter = 1; //variable we use to animate the dealer's turn when STANDing
// wallet = 610; // betting coming in the next expansion pack
let cardStyle = '<span style=background-color:white;color:black>' // there MUST be a better way to do this
let lost = false; // use this to stop extra hits / stands after a loss

const blackjackTable = 
    {
        story: 'you are at the blackjack table',
        options: "you can <b>hit</b> or <b>stand</b> or type <b>x</b> to restart",
        invalid: "I don't know how to do that - please type <b>hit</b> or <b>stand</b> or type <b>x</b> to restart",
        allowedOptions: ['hit', 'stand'],
    };

const intros = ["The bright noises of a thousand slot machines assail your ears. You struggle to focus on the table as it all comes down to this: win this last hand and you'll have enough money to save the orphanage.",
 "You grin at the dealer as you saunter up to the table. 'Deal me in!' you bark, as you tip her a thousand dollar token for luck.",
  "The pair of you, alone on a dismasted yacht, thousands of miles from anywhere. Nothing to do but play card games and wait for rescue.",
  "You moved to LA nearly a year ago and this is the biggest break you've had so far: a background extra in a casino scene in the new Wes Anderson film. Time for the best performance of your life.",
  "You take another gulp of whiskey and signal to the dealer to carry on, as the bar fight rages around you.",
  "This is it, the final game of BlackJack MegaStars 2025, sponsored by Lockheed Martin. A million dollars in the prize pot. You adjust your Raybans and motion to the dealer to begin."    
]

var room = blackjackTable;
initialize();

function initialize (){ // set the stage
// remove all story lines, reset all variables to start values
    $('.story').remove(); 
    deckInitialize(); // our giant deck object is at the bottom of the page, out of sight
    lost = false; // 
    playerArray = [];
    dealerArray = [];
    drawCard(dealerArray, 2); // we do track both of the dealer's cards for verisimilitude
    drawCard(playerArray, 2);
    dealerCounter = 1;


    addStoryLine(intros[getRandomInt(intros.length)], 2000);
    addStoryLine('The dealer draws the ' +cardStyle + dealerArray[0].face + ' of ' + dealerArray[0].suit +'</span>', 2000);
    addStoryLine('and places another card face down for herself.', 2500);
    addStoryLine(`She deals you the ` + cardStyle+ playerArray[0].face + ' of ' + playerArray[0].suit + '</span>', 4000);
    addStoryLine('and the ' + cardStyle + playerArray[1].face + " of " + playerArray[1].suit+".", 4500);
    reportInitialScore(4000);

    if (addScore(playerArray) == 21 && addScore(dealerArray) !=21) { // check for blackjack on draw
        addStoryLine("You slam the table and shout for joy. <br>'Blackjack!'", 5000);
        addStoryLine("Type x to play again, and good luck!", 6000);
        lost = true;
    } else if (addScore(playerArray) == 21 && addScore(dealerArray) ==21){ // check for ultra rare double blackjack
        addStoryLine('Your grin turns to a scowl as the dealer flips over her second card, the ' +cardStyle+dealerArray[1].face + ' of ' + dealerArray[1].suit + "</span><br> 'A draw I'm afraid!' she chirps at you happily.")
        lost = true;
    } else if (addScore(dealerArray) == 21) { // check if dealer wins on draw
        addStoryLine('The dealer peeks under her second card and then reveals it: the ' +cardStyle+dealerArray[1].face + ' of ' + dealerArray[1].suit + ".</span><br> 'That's blackjack for me, terribly sorry!' she beams.<br> Type <em>x</em> to restart.", 5000)
        lost = true;
    }

    else {
    addStoryLine(room.options, 4500);
    }
 
}


$('#textInput').on('submit', function (event) { //huge text input and logic system. massive kludge. don't judge me too harshly.
    event.preventDefault();    
    let $input = $('#textBox');
    let input = $input.val();
    input = input.toLowerCase(); // sanitise case

    if(input == 'hit' && !lost){ // hit logic
        drawCard(playerArray,1);
        $('.story').last().remove();
        $('.story').last().remove();
        addStoryLine("'Hit me'.<br>The dealer slides the " +cardStyle + playerArray[playerArray.length -1].face + ' of ' + playerArray[playerArray.length -1].suit + '</span> across to you.', 1000);
        reportInitialScore(1000);
        addStoryLine(room.options, 1500);
        if (addScore(playerArray) > 21) {
            $('.story').last().remove();
             addStoryLine("You lose this one I'm afraid: press <em>x</em to restart.",1000);
             lost = true;
         }

    } 
// end of hit logic

    else if(input== 'stand' && !lost) { // stand logic

        $('.story').last().remove();
        addStoryLine('You signal your intention to stand. <br>The dealer turns over her card to reveal the '+cardStyle + dealerArray[1].face + ' of ' + dealerArray[1].suit+'</span>.', dealerCounter*1500);
        reportScore(dealerCounter*1500);


        while ( addScore(dealerArray) < 16 ) { //dealer draws her cards
        $('.story').last().remove();
        drawCard(dealerArray,1);
        addStoryLine('She draws another card, the '+cardStyle + dealerArray[dealerArray.length-1].face + ' of ' + dealerArray[dealerArray.length-1].suit+'</span>.', dealerCounter*1500);        
        reportScore(dealerCounter*1500);
        dealerCounter++;
        }; //dealer finishes drawing, now check to see who won


        if (addScore(playerArray) > addScore(dealerArray)) {
            addStoryLine("You win! Type <em>x</em> to restart.", dealerCounter*1000);
            lost = true;
        } else if (addScore(playerArray) < addScore(dealerArray)) {
            addStoryLine("You lose - better luck next time. Type <em>x</em> to restart.", dealerCounter*1000)
            lost = true;
        } else if (addScore(playerArray) == addScore(dealerArray)) {
            addStoryLine("A draw! Not so bad, not so good. Type <em>x</em> to restart.", dealerCounter*1000)
            lost = true;
        }

    } 
// end of stand logic



    //reset and invalid input logic here
    else if(input== 'x'){
        initialize();
    } else if (lost){
        $('.story').last().remove();
        addStoryLine("Nope, the game is over. Type <em>x</em> to restart.")
    } else {
        $('.story').last().remove();
        addStoryLine(room.invalid);
    }




    $('#textBox').val(''); // clear textbox

}) // end of event listener and logic




// useful functions
function addStoryLine(story, delay) { // helped along by a code example at https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_append2
    var txt = $("<p class='story'>"+story+"</p>")
    $("#main").append(txt);
    $('.story').animate({opacity:1}, delay);
}

function reportScore(delay) {
    addStoryLine(' your score is '+ cardStyle + addScore(playerArray) + '</span>' + " against the dealer's " + cardStyle + addScore(dealerArray)+'</span>.', delay);
}

function reportInitialScore(delay) { // score when the dealer's second card is hidden
   addStoryLine(' your score is '+ cardStyle + addScore(playerArray) + '</span>' + " against the dealer's visible " + cardStyle + dealerArray[0].value+'</span>.', delay);
}

function addScore(cardArray) { // returns the total score from target array
    let score = 0;
    for (i=0; i < cardArray.length; i++) {
        score += cardArray[i].value;
    }
    return score;
}

function getRandomInt(max) {  //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * max);
  }

// moves 'num' cards to an array 'array' and splices them out of the deck object to prevent re-drawing.
function drawCard(array, num) { 
    for (i=1; i<=num; i++) {
        if (deck.length == 0) { // reshuffle if out of cards. we never make it here actually.
            addStoryLine('The dealer notices the deck of cards is empty and smoothy opens another one')
            deckInitialize();
        }
        let drawnCard = getRandomInt(deck.length);
        //console.log(drawnCard);
        array.push(deck[drawnCard]);
        deck.splice(drawnCard,1);
    }
}



function deckInitialize(){
globalThis.deck = [
    {
        suit : 'clubs',
        face : '2',
        value : 2,
    },
    {
        suit : 'clubs',
        face : '3',
        value : 3,
    },
    {
        suit : 'clubs',
        face : '4',
        value : 4,
    },
    {
        suit : 'clubs',
        face : '5',
        value : 5,
    },
    {
        suit : 'clubs',
        face : '6',
        value : 6,
    },
    {
        suit : 'clubs',
        face : '7',
        value : 7,
    },
    {
        suit : 'clubs',
        face : '8',
        value : 8,
    },
    {
        suit : 'clubs',
        face : '9',
        value : 9,
    },
    {
        suit : 'clubs',
        face : '10',
        value : 10,
    },
    {
        suit : 'clubs',
        face : 'jack',
        value : 10,
    },
    {
        suit : 'clubs',
        face : 'queen',
        value : 10,
    },
    {
        suit : 'clubs',
        face : 'king',
        value : 10,
    },
    {
        suit : 'clubs',
        face : 'ace',
        value : 11,
        acevalue: 1,
        ace: true,
    },
    {
        suit : 'hearts',
        face : '2',
        value : 2,
    },
    {
        suit : 'hearts',
        face : '3',
        value : 3,
    },
    {
        suit : 'hearts',
        face : '4',
        value : 4,
    },
    {
        suit : 'hearts',
        face : '5',
        value : 5,
    },
    {
        suit : 'hearts',
        face : '6',
        value : 6,
    },
    {
        suit : 'hearts',
        face : '7',
        value : 7,
    },
    {
        suit : 'hearts',
        face : '8',
        value : 8,
    },
    {
        suit : 'hearts',
        face : '9',
        value : 9,
    },
    {
        suit : 'hearts',
        face : '10',
        value : 10,
    },
    {
        suit : 'hearts',
        face : 'jack',
        value : 10,
    },
    {
        suit : 'hearts',
        face : 'queen',
        value : 10,
    },
    {
        suit : 'hearts',
        face : 'king',
        value : 10,
    },
    {
        suit : 'hearts',
        face : 'ace',
        value : 11,
        acevalue: 1,
        ace: true,
    },
    {
        suit : 'diamonds',
        face : '2',
        value : 2,
    },

    {
        suit : 'diamonds',
        face : '3',
        value : 3,
    },
    {
        suit : 'diamonds',
        face : '4',
        value : 4,
    },
    {
        suit : 'diamonds',
        face : '5',
        value : 5,
    },
    {
        suit : 'diamonds',
        face : '6',
        value : 6,
    },
    {
        suit : 'diamonds',
        face : '7',
        value : 7,
    },
    {
        suit : 'diamonds',
        face : '8',
        value : 8,
    },
    {
        suit : 'diamonds',
        face : '9',
        value : 9,
    },
    {
        suit : 'diamonds',
        face : '10',
        value : 10,
    },
    {
        suit : 'diamonds',
        face : 'jack',
        value : 10,
    },
    {
        suit : 'diamonds',
        face : 'queen',
        value : 10,
    },
    {
        suit : 'diamonds',
        face : 'king',
        value : 10,
    },
    {
        suit : 'diamonds',
        face : 'ace',
        value : 11,
        acevalue: 1,
        ace: true,
    },{
        suit : 'spades',
        face : '2',
        value : 2,
    },

    {
        suit : 'spades',
        face : '3',
        value : 3,
    },
    {
        suit : 'spades',
        face : '4',
        value : 4,
    },
    {
        suit : 'spades',
        face : '5',
        value : 5,
    },
    {
        suit : 'spades',
        face : '6',
        value : 6,
    },
    {
        suit : 'spades',
        face : '7',
        value : 7,
    },
    {
        suit : 'spades',
        face : '8',
        value : 8,
    },
    {
        suit : 'spades',
        face : '9',
        value : 9,
    },
    {
        suit : 'spades',
        face : '10',
        value : 10,
    },
    {
        suit : 'spades',
        face : 'jack',
        value : 10,
    },
    {
        suit : 'spades',
        face : 'queen',
        value : 10,
    },
    {
        suit : 'spades',
        face : 'king',
        value : 10,
    },
    {
        suit : 'spades',
        face : 'ace',
        value : 11,
        acevalue: 1,
        ace: true,
    }
]


};
});


