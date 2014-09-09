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

console.log("asdf");
var cards = generateCards();
console.log(cards); 
console.log(cards.length);

var shuffled = shuffle(cards);
console.log(shuffled);
console.log(shuffled.length);
