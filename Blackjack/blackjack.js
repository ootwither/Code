$(document).ready(function(){ // start script only after page load

//setup starts here
 // initialize our ugly deck object as a global variable from the function down below out of sight
let playerArray = []; //initialize the array we'll hold player cards in
//let playerScore = addScore(playerArray);
let dealerArray = []; //same for the dealer's array
//let dealerScore = addScore(dealerArray);
wallet = 610; //starting cash
let $outputText = $('#text'); 
let $outputLowerText = $('#lowerText');
// we need this here as lots of stuff references it


const blackjackTable = 
    {
        story: 'you are at the blackjack table',
        options: "you can <b>hit</b> or <b>stand</b> or type <b>x</b> to restart",
        allowedOptions: ['hit', 'stand'],
        hit: 'YOU HAT',
    };

var room = blackjackTable;
initialize();

function initialize (){
    deckInitialize();
    playerArray = [];
    dealerArray = [];
    drawCard(dealerArray, 1);
    drawCard(playerArray, 2);

    addStoryLine(room.story, 1000);
    addStoryLine('the dealer draws the ' + dealerArray[0].face + ' of ' + dealerArray[0].suit, 2000);
    addStoryLine(`the dealer slides the ` + playerArray[0].face + ' of ' + playerArray[0].suit + ' across to you', 3000);
    addStoryLine('and the ' + playerArray[1].face + ' of ' + playerArray[1].suit, 3500);

    addStoryLine(room.options, 4000);
 

   
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


/*
addStoryLine('hi')

*/

}



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

/*      commenting this out as I misunderstood the rules
        drawCard(dealerArray,1);
        $('#dealerHand').append('<br>the ' + dealerArray[dealerArray.length -1].face + ' of ' + dealerArray[dealerArray.length -1].suit);
        $('#dealerScore').text(" dealer's score is " + addScore(dealerArray))
*/
    } 
    else if(input== 'stand') {
        while (addScore(dealerArray) < 16){
        drawCard(dealerArray,1);
        $('#dealerHand').append('<br>the ' + dealerArray[dealerArray.length -1].face + ' of ' + dealerArray[dealerArray.length -1].suit);
        $('#dealerScore').text(" dealer's score is " + addScore(dealerArray))
        }
    } else if(input== 'x'){
        $('.story').remove();
        initialize();
    }


    else {
        $outputLowerText.text('invalid command, please hit or stand');
    }

    if (addScore(playerArray) == 21 && addScore(dealerArray) != 21) {
        $outputLowerText.text('you win');
    } else if (addScore(playerArray) < 21 && addScore(dealerArray) > 21) {
        $outputLowerText.text('you win');
    } else if (addScore(playerArray) > 21) {
        $outputLowerText.text('you lose, press x to restart');
    }

    $('#textBox').val('');

})

//$('#lowerText').append('stuff'+ '<br>');
/* deprecated function for doing options in rooms
if (room.allowedOptions.indexOf(input) != -1)
{$outputText.text(room[input]);}
*/

function addStoryLine(story, delay) { // helped along by a code example at https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_append2
    var txt = $("<p class='story'>"+story+"</p>")
    $("#main").append(txt);
    $('.story').animate({opacity:1}, delay);
}

function getRandomInt(max) {  //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * max);
  }

// moves 'num' cards to an array 'array' and splices them out of the deck. this still needs an interrupt to implement ace logic
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