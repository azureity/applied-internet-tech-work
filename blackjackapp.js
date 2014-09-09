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

console.log(calculateHand(hand));
console.log(calculateHand(hand2));
console.log(calculateHand(hand3));
