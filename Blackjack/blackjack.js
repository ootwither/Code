$(document).ready(function(){ // start script only after page load

//setup starts here
deckInitialize(); // initialize our ugly deck object as a global variable from the function down below out of sight
const playerArray = []; //initialize the array we'll hold player cards in
//let playerScore = addScore(playerArray);
const dealerArray = []; //same for the dealer's array
//let dealerScore = addScore(dealerArray);
wallet = 610; //starting cash
let $outputText = $('#text'); 
let $outputLowerText = $('#lowerText');
// we need this here as lots of stuff references it

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

const blackjackTable = 
    {
        story: 'you are at the blackjack table',
        options: 'you can hit or stand',
        allowedOptions: ['hit', 'stand'],
        hit: 'YOU HAT',
    };

var room = blackjackTable;

$outputText.text(room.story);
$outputLowerText.text(room.options);

drawCard(dealerArray, 1);
drawCard(playerArray, 2);
let $playerHand = $('#playerHand');
$playerHand.text('your hand')

// dealer's hand
let $dealerHand = $('#dealerHand');
$dealerHand.text("dealer's hand")
for (let i=0; i < dealerArray.length; i++){
    $('#dealerHand').append('<br>the ' + dealerArray[i].face + ' of ' + dealerArray[i].suit);
}
$('#dealerScore').text("dealer's score is " + addScore(dealerArray))

// doing player's hand here
for (let i=0; i < playerArray.length; i++){
    $('#playerHand').append('<br>the ' + playerArray[i].face + ' of ' + playerArray[i].suit);
}
$('#playerScore').text(' your score is ' + addScore(playerArray))


$('#textInput').on('submit', function (event) {
    event.preventDefault();        
    let $input = $('#textBox');
    let input = $input.val();
    input = input.toLowerCase(); // sanitise case
    if(input == 'hit'){
        drawCard(playerArray,1);
        //addScore(playerArray);
        $('#playerHand').append('<br>the ' + playerArray[playerArray.length -1].face + ' of ' + playerArray[playerArray.length -1].suit);
        $('#playerScore').text(' your score is ' + addScore(playerArray))

        drawCard(dealerArray,1);
        $('#dealerHand').append('<br>the ' + dealerArray[dealerArray.length -1].face + ' of ' + dealerArray[dealerArray.length -1].suit);
        $('#dealerScore').text(" dealer's score is " + addScore(dealerArray))
    } 
    else if(input== 'stand') {
        drawCard(dealerArray,1);
        $('#dealerHand').append('<br>the ' + dealerArray[dealerArray.length -1].face + ' of ' + dealerArray[dealerArray.length -1].suit);
        $('#dealerScore').text(" dealer's score is " + addScore(dealerArray))
    } 
    else {
        $outputLowerText.text('invalid command, please hit or stand');
    }



})

//$('#lowerText').append('stuff'+ '<br>');
/* function for doing options in rooms
if (room.allowedOptions.indexOf(input) != -1)
{$outputText.text(room[input]);}
*/


function getRandomInt(max) {  //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * max);
  }

// moves 'num' cards to an array 'array'. this still needs an interrupt to implement ace logic and doesn't take into account already-drawn cards
function drawCard(array, num) { 
    for (i=1; i<=num; i++) {
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
};
});