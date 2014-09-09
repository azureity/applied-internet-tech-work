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

console.log("asdf");
var cards = generateCards();
console.log(cards); 
console.log(cards.length);
