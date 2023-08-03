$(document).ready(function(){ // start script only after page load

//setup starts here
 // initialize our ugly deck object as a global variable from the function down below out of sight
let playerArray = []; //initialize the array we'll hold player cards in
let dealerArray = []; //same for the dealer's array
let dealerCounter = 1; //variable we use to animate the dealer's turn when standing
wallet = 610; //starting cash
let cardStyle = '<span style=background-color:white;color:black>' // there MUST be a better way to do this

const blackjackTable = 
    {
        story: 'you are at the blackjack table',
        options: "you can <b>hit</b> or <b>stand</b> or type <b>x</b> to restart",
        invalid: "I don't know how to do that - please type <b>hit</b> or <b>stand</b> or type <b>x</b> to restart",
        allowedOptions: ['hit', 'stand'],
        hit: 'YOU HAT',
    };

var room = blackjackTable;
initialize();

function initialize (){ // set the stage
    $('.story').remove();
    deckInitialize();
    playerArray = [];
    dealerArray = [];
    drawCard(dealerArray, 2); // we do track both of the dealer's cards for verisimilitude
    drawCard(playerArray, 2);
    dealerCounter = 1.5;
    addStoryLine(room.story, 2000);
    addStoryLine('the dealer draws the ' +cardStyle + dealerArray[0].face + ' of ' + dealerArray[0].suit, 2000);
    addStoryLine('and places one card face down for herself', 2500);
    addStoryLine(`she deals you the ` + cardStyle+ playerArray[0].face + ' of ' + playerArray[0].suit + '</span>', 4000);
    addStoryLine('and the ' + cardStyle + playerArray[1].face + " of " + playerArray[1].suit, 4500);
    reportInitialScore(4000);

    if (addScore(playerArray) == 21 && addScore(dealerArray) !=21) { // check for blackjack on draw
        addStoryLine('HOLY SHIT BLACKJACK WOOOOOO', 5000);
    } else {
    addStoryLine(room.options, 4500);
    }
 
}


$('#textInput').on('submit', function (event) { //huge text input and logic system. massive kludge. don't judge me too harshly.
    event.preventDefault();    
    let $input = $('#textBox');
    let input = $input.val();
    input = input.toLowerCase(); // sanitise case

    if(input == 'hit'){ // hit logic
        drawCard(playerArray,1);
        $('.story').last().remove();
        $('.story').last().remove();
        addStoryLine("'Hit me'.<br>The dealer slides the " +cardStyle + playerArray[playerArray.length -1].face + ' of ' + playerArray[playerArray.length -1].suit + '</span> across to you', 1000);
        reportInitialScore(1000);
        addStoryLine(room.options, 1500);
        if (addScore(playerArray) > 21) {
            $('.story').last().remove();
             addStoryLine('you lose, press <em>x</em to restart',1000);
         }

        /*
        if (addScore(playerArray) == 21 && addScore(dealerArray) != 21) {
            //$('.story').last().remove();
            addStoryLine('you win',1000);
        } else if (addScore(playerArray) < 21 && addScore(dealerArray) > 21) {
           // $('.story').last().remove();
            addStoryLine('you win',1000);
        } else if (addScore(playerArray) > 21) {
           // $('.story').last().remove();
            addStoryLine('you lose, press x to restart',1000);
        }  else {addStoryLine(room.options)} */
    } 
// end of hit logic

    else if(input== 'stand') { // stand logic

        $('.story').last().remove();
        addStoryLine('You signal your intention to stand. <br>The dealer turns over her card to reveal the '+cardStyle + dealerArray[1].face + ' of ' + dealerArray[1].suit, dealerCounter*1500);
        reportScore(dealerCounter*1500);
        //addStoryLine(dealerArray.length);

        while ( addScore(dealerArray) < 16 ) {
        $('.story').last().remove();
        drawCard(dealerArray,1);
        addStoryLine('She draws another card, the '+cardStyle + dealerArray[dealerArray.length-1].face + ' of ' + dealerArray[dealerArray.length-1].suit, dealerCounter*1500);        
        reportScore(dealerCounter*1500);
        dealerCounter++;
        };

    } 
// end of stand logic



    //reset and invalid input logic here
    else if(input== 'x'){
        initialize();
    } else {
        $('.story').last().remove();
        addStoryLine(room.invalid);
    }




    $('#textBox').val('');

}) // end of event listener and logic




// useful functions
function addStoryLine(story, delay) { // helped along by a code example at https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_append2
    var txt = $("<p class='story'>"+story+"</p>")
    $("#main").append(txt);
    $('.story').animate({opacity:1}, delay);
}

function reportScore(delay) {
    addStoryLine(' your score is '+ cardStyle + addScore(playerArray) + '</span>' + " against the dealer's " + cardStyle + addScore(dealerArray), delay);
}

function reportInitialScore(delay) { // score when the dealer's second card is hidden
    addStoryLine(' your score is '+ cardStyle + addScore(playerArray) + '</span>' + " against the dealer's " + cardStyle + dealerArray[0].value, delay);
}

function getRandomInt(max) {  //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * max);
  }

// moves 'num' cards to an array 'array' and splices them out of the deck. this still needs an interrupt to implement ace logic
function drawCard(array, num) { 
    for (i=1; i<=num; i++) {
        if (deck.length == 0) { // reshuffle if out of cards
            addStoryLine('The dealer notices the deck of cards is empty and smoothy opens another one')
            deckInitialize();
        }
        let drawnCard = getRandomInt(deck.length);
        //console.log(drawnCard);
        array.push(deck[drawnCard]);
        deck.splice(drawnCard,1);
    }
}

function addScore(cardArray) { // returns the total score from target array
    let score = 0;
    for (i=0; i < cardArray.length; i++) {
        //console.log(cardArray[i].value);
        score += cardArray[i].value;
    }
    return score;
}

function deckInitialize(){
globalThis.deck = [
    {
        suit : 'clubs',
        face : '2',
        value : 2,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '3',
        value : 3,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '4',
        value : 4,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '5',
        value : 5,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '6',
        value : 6,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '7',
        value : 7,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '8',
        value : 8,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '9',
        value : 9,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : '10',
        value : 10,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : 'jack',
        value : 10,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : 'queen',
        value : 10,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : 'king',
        value : 10,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : 'ace',
        value : 11,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '2',
        value : 2,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '3',
        value : 3,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '4',
        value : 4,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '5',
        value : 5,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '6',
        value : 6,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '7',
        value : 7,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '8',
        value : 8,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '9',
        value : 9,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : '10',
        value : 10,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : 'jack',
        value : 10,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : 'queen',
        value : 10,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : 'king',
        value : 10,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : 'ace',
        value : 11,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '2',
        value : 2,
        drawn : false,
    },

    {
        suit : 'diamonds',
        face : '3',
        value : 3,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '4',
        value : 4,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '5',
        value : 5,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '6',
        value : 6,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '7',
        value : 7,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '8',
        value : 8,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '9',
        value : 9,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : '10',
        value : 10,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : 'jack',
        value : 10,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : 'queen',
        value : 10,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : 'king',
        value : 10,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : 'ace',
        value : 11,
        drawn : false,
    },{
        suit : 'spades',
        face : '2',
        value : 2,
        drawn : false,
    },

    {
        suit : 'spades',
        face : '3',
        value : 3,
        drawn : false,
    },
    {
        suit : 'spades',
        face : '4',
        value : 4,
        drawn : false,
    },
    {
        suit : 'spades',
        face : '5',
        value : 5,
        drawn : false,
    },
    {
        suit : 'spades',
        face : '6',
        value : 6,
        drawn : false,
    },
    {
        suit : 'spades',
        face : '7',
        value : 7,
        drawn : false,
    },
    {
        suit : 'spades',
        face : '8',
        value : 8,
        drawn : false,
    },
    {
        suit : 'spades',
        face : '9',
        value : 9,
        drawn : false,
    },
    {
        suit : 'spades',
        face : '10',
        value : 10,
        drawn : false,
    },
    {
        suit : 'spades',
        face : 'jack',
        value : 10,
        drawn : false,
    },
    {
        suit : 'spades',
        face : 'queen',
        value : 10,
        drawn : false,
    },
    {
        suit : 'spades',
        face : 'king',
        value : 10,
        drawn : false,
    },
    {
        suit : 'spades',
        face : 'ace',
        value : 11,
        drawn : false,
    }
]

const lobby = 
    { 
        story: 'you are in a room',
        options: 'type inventory to check your pockets or try to remember what this is about',
        allowedOptions: ['inventory', 'about'],
        inventory: 'you have one pence',
        about: 'weird game made by dougal',
        connectedRooms: ['bar']
    }
;


};
});


//$('#lowerText').append('stuff'+ '<br>');
/* deprecated function for doing options in rooms
if (room.allowedOptions.indexOf(input) != -1)
{$outputText.text(room[input]);}
*/
