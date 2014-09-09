var prompt = require('sync-prompt').prompt;

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

//paramter must be an array
var shuffle = function(x){
	for(var i = 0; i < x.length; i++){	
		randomIndex = Math.floor(Math.random() * x.length);
		var temp = x[i];
		x[i] = x[randomIndex];
		x[randomIndex] = temp;
	}
	return x;
};

//parameter must be an array
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

//get a simple array from hand
var simpHand = function(x){
	var ans = [];
	for(var i = 0; i < x.length; i++){
		ans.push(x[i].face);
	}
	console.log("SIMPLE: " + ans);
	return ans;
};

//x is player hand. y is AI hand
var determineWinner = function(x, y){
	var player = 21 - calculateHand(x);
	var computer = 21 - calculateHand(y);
	var win = "";
	if((player === computer) || (player < 0 && computer < 0)) win = "Tie";
	else if(player >= 0 && (computer > player || computer < 0)) win = "Player";
	else if(computer >= 0 && (player > computer || player < 0)) win = "Computer";
	
	return win;	
};

//x is an array
var printHand = function(x){
	var hand = "";
	for(var i = 0; i < x.length; i++){
		hand = hand + x[i].face + x[i].suit + " ";
	}
	return hand;
};

//testing space
console.log("asdf");
var cards = generateCards();
console.log(cards); 
console.log(cards.length);

var shuffled = shuffle(cards);
console.log(shuffled);
console.log(shuffled.length);

var hand = ['K', '3', '5'];
var hand2 = ['A', 'A', 'A', '8'];
var hand3 = ['6', 'A'];
var hand4 = ['K', 'J', '3']
var hand5 = ['J', 'Q', 'Q']

console.log(calculateHand(hand));
console.log(calculateHand(hand2));
console.log(calculateHand(hand3));

var winner = determineWinner(hand, hand2);
console.log(winner);
winner = determineWinner(hand2, hand4);
console.log(winner);
console.log(determineWinner(hand4, hand5));
console.log(determineWinner(hand3, hand));
console.log(determineWinner(hand2, hand2));

//game on
var cards = generateCards();
cards = shuffle(cards);
var playerHand = [];
playerHand.push(cards.pop());
playerHand.push(cards.pop());
console.log(playerHand);
var compHand = [];
compHand.push(cards.pop());
compHand.push(cards.pop());
console.log(compHand);

console.log("asdf")
console.log("Your hand is: " + printHand(playerHand) + "... for a total of " + calculateHand(simpHand(playerHand)));

var cont = true;
while(cont){
	var action = prompt('(h)it or (s)tay? ');
	console.log('action::: ' + action);
	switch(action){
		case('h'):
		case('hit'):
			playerHand.push(cards.pop());
			console.log("Your hand is: " + printHand(playerHand) + " (" + calculateHand(simpHand(playerHand)) + ")");
			if(calculateHand(simpHand(playerHand)) > 21) cont = false;
			break;
		case('s'):
		case('stay'):
			while(calculateHand(simpHand(compHand)) < 17){
				compHand.push(cards.pop());
			}
			cont = false;
		default:
			console.log("Please choose either to hit or stay\n");
			break;
	}
}

console.log("Your hand: " + printHand(playerHand) + " (" + calculateHand(simpHand(playerHand)) + "), Computer hand: " + printHand(compHand) + " (" + calculateHand(simpHand(compHand)) + ")");
determineWinner(simpHand(playerHand), simpHand(compHand));

