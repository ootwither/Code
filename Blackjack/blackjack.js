const deck = [
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
        value : 11,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : 'queen',
        value : 12,
        drawn : false,
    },
    {
        suit : 'clubs',
        face : 'king',
        value : 13,
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
        value : 11,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : 'queen',
        value : 12,
        drawn : false,
    },
    {
        suit : 'hearts',
        face : 'king',
        value : 13,
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
        value : 11,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : 'queen',
        value : 12,
        drawn : false,
    },
    {
        suit : 'diamonds',
        face : 'king',
        value : 13,
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
        value : 11,
        drawn : false,
    },
    {
        suit : 'spades',
        face : 'queen',
        value : 12,
        drawn : false,
    },
    {
        suit : 'spades',
        face : 'king',
        value : 13,
        drawn : false,
    },
    {
        suit : 'spades',
        face : 'ace',
        value : 11,
        drawn : false,
    }
]


function getRandomInt(max) {  
    return Math.floor(Math.random() * max);
  }

/* 
from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function drawCard(array, num) { // this still needs an interrupt to implement ace logic
    for (i=1; i<=num; i++) {
        array.push(deck[getRandomInt(52)]);
    }
}

function addScore(cardArray) {
    let score = 0;
    for (i=0; i < cardArray.length; i++) {
        //console.log(cardArray[i].value);
        score += cardArray[i].value;
    }
    return score;
}

const playerArray = [];
drawCard(playerArray, 2);
console.log(addScore(playerArray));


/*
card1= drawCard(52);

const playerArray = [];
playerArray.push(drawCard(52));
playerArray.push(drawCard(52));

total = addScore(playerArray);
console.log(total);
*/
//console.log(playerArray[0].value);





/*
console.log('you have drawn the ' + deck[0].face + ' of ' + deck[0].suit);
console.log('your current score is ' + Number(deck[0].value + deck[1].value))
*/
