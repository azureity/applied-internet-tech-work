/*----------------------------------
Vincent Zhen
Prof. Joe Versoza
CSCI-UA.0480-002 Fall 2014
Homework #1

Simple blackjack code in javascript.
----------------------------------*/

/* Import function 'prompt' from the 'sync-prompt' module for synchronous user input */
var prompt = require('sync-prompt').prompt;

/* Generates a (sorted) deck of cards. Each card is an object.
Returns and array of card objects. */
var generateCards = function(){
	var suits = ['♠','♥','♦','♣'];
	var faces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
	
	var cards = [];
	for(var i = 0; i < faces.length; i++){
		for(var j = 0; j < suits.length; j++){
			var card = {
				face:faces[i],
				suit:suits[j]
			};
			cards.push(card);
		}
	}
	return cards;
};

/* Shuffles the deck of cards 'x' by iterating through the deck and switching it with a random card in the deck. */
var shuffle = function(x){
	for(var i = 0; i < x.length; i++){	
		randomIndex = Math.floor(Math.random() * x.length);
		var temp = x[i];
		x[i] = x[randomIndex];
		x[randomIndex] = temp;
	}
	return x;
};

/* Returns the total of the hand. Ignores suits.
Input is an array 'x' */
var calculateHand = function(x){
	var total = 0;
	for(var i = 0; i < x.length; i++){
		switch(x[i]){
			case 'J':
			case 'Q':
			case 'K':
				total += 10;
				break;
			case 'A':
				// Aces may count as 11 or 1 depending on situation
				total += 11;
				if(total > 21){
					total -= 10;}
				break;
			default:
				total += parseInt(x[i]);
		}
	}
	return total;
};

/* Make an array of just the faces, stripping the suits to make it easier to implement other functions.
Input is an array 'x' */
var simpHand = function(x){
	var ans = [];
	for(var i = 0; i < x.length; i++){
		ans.push(x[i].face);
	}
	return ans;
};

/* Determines winner based on closeness to 21 excluding negatives which is a bust.
The player hand is 'x' and the computer hand is 'y' for input. */
var determineWinner = function(x, y){
	var player = 21 - calculateHand(x);
	var computer = 21 - calculateHand(y);
	var win = "";
	if((player === computer) || (player < 0 && computer < 0)) win = "Tie!\n";
	else if(player >= 0 && (computer > player || computer < 0)) win = "Player Wins\n";
	else if(computer >= 0 && (player > computer || player < 0)) win = "Computer Wins\n";
	
	return win;	
};

/* Function to print the hand 'x' */
var printHand = function(x){
	var hand = "";
	for(var i = 0; i < x.length; i++){
		hand = hand + x[i].face + x[i].suit + " ";
	}
	return hand;
};

/*---------------------------
The main block of code starts here
---------------------------*/
//Initialize deck of cards
var cards = generateCards();
cards = shuffle(cards);

//Loop over games until less than 26 cards left in deck
var gameon = true;
while(gameon){
	//Deal out first hands
	var playerHand = [];
	playerHand.push(cards.pop());
	playerHand.push(cards.pop());
	var compHand = [];
	compHand.push(cards.pop());
	compHand.push(cards.pop());
	console.log("Your hand is: " + printHand(playerHand) + "... for a total of " + calculateHand(simpHand(playerHand)));
	
	//Continue with the current game
	var cont = true;
	while(cont){
		var action = prompt('(h)it or (s)tay?\n> ');
		switch(action){
			case('h'):
			case('hit'):
				playerHand.push(cards.pop());
				//Only allow continue if player did not bust
				if(calculateHand(simpHand(playerHand)) <= 21){
					console.log("Your hand: " + printHand(playerHand) + " (" + calculateHand(simpHand(playerHand)) + ")");
				}
				else cont = false;
				break;
			case('s'):
			case('stay'):
				//Deal for computer until >17
				while(calculateHand(simpHand(compHand)) < 17){
					compHand.push(cards.pop());
				}
				cont = false;
				break;
				//Bad input
			default:
				console.log("Please choose either to hit or stay\n");
				break;
		}
	}

	//Tally final scores and determine a winner
	console.log("Your hand: " + printHand(playerHand) + " (" + calculateHand(simpHand(playerHand)) + "), Computer hand: " + printHand(compHand) + " (" + calculateHand(simpHand(compHand)) + ")");
	console.log(determineWinner(simpHand(playerHand), simpHand(compHand)));
	console.log("There are " + cards.length + " cards left in the deck\n------------------------------------------\n");

	//End game if number of cards are below 26
	if(cards.length < 26) gameon = false;
}

console.log("Less than 26 cards left. Game over!");
