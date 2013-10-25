// JQuery
function log(s) {
	console.log(s);
}

// this is a generic card (suit, number)
function Card(suit, number) {
	this.getSuit = function() {
		return suit;
	};
	this.getNumber = function() {
		return number;
	};
	this.getValue = function() {
		if (number > 10) {
			return 10;
		} else if (number === 1) {
			return 11;
		} else {
			return number;
		}
	};
	this.getDescription = function() {
		var cardFace
		var suitName
		switch (number) {
			case 11: cardFace = "Jack"; break;
			case 12: cardFace = "Queen"; break; 
			case 13: cardFace = "King"; break;
			case 1: cardFace = "Ace"; break;
			default: cardFace = number; break;
		}
		switch (suit) {
			case 1: suitName = "Hearts"; break;
			case 2: suitName = "Diamonds"; break;
			case 3: suitName = "Clubs"; break;
			case 4: suitName = "Spades"; break;
		}
		return cardFace + " of " + suitName;
	};
}

// this declares a deck, containing 52 unique cards
function Deck(cards) {
	var suit = [1, 2, 3, 4];
	var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	for (var i = 0; i < suit.length; i++) {
		for (var y = 0; y < number.length; y++) {
			cards[cards.length] = new Card(suit[i],number[y]);
		}
	}
	this.getCards = function() {
		return cards; 
	};
}

var deck = new Deck([]);

// this prints out all the cards in the deck
for (var i = 0; i < deck.getCards().length; i++) {
console.log(deck.getCards()[i].getDescription()) }

// this deals a card at random from the deck
function deal() {
	var randCard = deck.getCards()[Math.floor(Math.random() * 52)];
	return randCard;
}
// this deals cards into a hand
function Hand(cards) {
	// this adds cards to the array
	this.hit = function() {
		cards[cards.length] = deal();
	};
	// this shows what cards are in the hand
	this.getCards = function() {
		return cards; 
	};
	// this adds the cards together and gives score
	this.score = function() {
		// this adds up the value of the cards in the array
		var cardsTotal = 0;
		for (var i = 0; i < cards.length; i++) {
			cardsTotal += cards[i].getValue(); 	
		}
		// this allows Aces to be 11 or 1 to optimize score
		for (var i = 0; i < cards.length && cardsTotal > 21; i++) {
			if (cards[i].getValue() === 11) {
				cardsTotal -= 10;
			}
		}
		return cardsTotal;
	};
	// this tells you if there is an Ace in the hand
	this.hasAce = function() {
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].getValue() === 11) {
				return true;
			}
		} 
		return false;
	};
}

// Playing the game

	// Deal to player
var player = new Hand([deal(), deal()]);
	// Deal to dealer
var dealer = new Hand([deal(), deal()]);

// Player sees hand and chooses to stick or hit
var playPlayer = function() {
	console.log(player.getCards()[0].getDescription());
	console.log(player.getCards()[1].getDescription());
	console.log(player.score());
	if (player.score() === 21) {
		console.log("Blackjack!");
		return;
	}
	var playerChoice = prompt("Do you want to HIT or STICK?");
		// if hit then add new card to hand
	while (playerChoice.toUpperCase() === "HIT") {
		player.hit();
		console.log(player.getCards()[player.getCards().length-1].getDescription());
		console.log(player.score());
		if (player.score() < 21) {
		playerChoice = prompt("Do you want to HIT or STICK?");
		} else if (player.score() === 21) {
			console.log("Blackjack!");
			break;
		} else {
			console.log("Player busted.");
			break;
		}
	}
};
// Dealer plays hand
var playDealer = function() {
	console.log(dealer.getCards()[0].getDescription());
	console.log(dealer.getCards()[1].getDescription());
	console.log(dealer.score());
	while (dealer.score() < 17) {
		dealer.hit();
		console.log(dealer.getCards()[dealer.getCards().length-1].getDescription());
		console.log(dealer.score());
	}
	if (dealer.score() === 17 && dealer.hasAce() === true) {
		dealer.hit();
		console.log(dealer.getCards()[dealer.getCards().length-1].getDescription());
		console.log(dealer.score());
	}
	while (dealer.score() < 17) {
		dealer.hit();
		console.log(dealer.getCards()[dealer.getCards().length-1].getDescription());
		console.log(dealer.score());
	}
};

// Compare scores to declare winner
var declareWinner = function() {
	if (player.score() > 21 && dealer.score() > 21) {
		console.log("Tie, you both busted.");
	} else if (player.score() > 21 && dealer.score() <= 21) {
		console.log("Player loses.");
	} else if (player.score() <= 21 && dealer.score() > 21) {
		console.log("Player wins. Dealer busted.");
	} else if (player.score() > dealer.score() && player.score() < 22) {
		console.log("Player wins!");
	} else if (player.score() < dealer.score() && dealer.score() < 22) {
		console.log("Dealer wins!");
	} else if (player.score() === dealer.score()) {
		console.log("You tie!");
	}
}; 

var playGame = function() {
//deal function
	playPlayer();
	playDealer();
	declareWinner();
};

// TESTING

var assert = function(value) {
	if(value) {
		console.log("passed");
	} else {
		console.assert(value);
	}
};

var testCardGetValue = function() {
	var aceSpades = new Card(4,1);
	assert(aceSpades.getValue() === 11);

	var kingSpades = new Card(4,13);
	assert(kingSpades.getValue() === 10);
};

var testHandScore = function() {
	var hand = new Hand([]);
	assert(hand.score() === 0);

	hand = new Hand([new Card(4,1)]);
	assert(hand.score() === 11);

	hand = new Hand([new Card(4,1), new Card(3,12)]);
	assert(hand.score() === 21);

	hand = new Hand([new Card(4,1), new Card(3,12), new Card(2,1)]);
	assert(hand.score() === 12);

	hand = new Hand([new Card(4,1), new Card(2,9), new Card(2,1)]);
	assert(hand.score() === 21);
};

// JQuery
$(document).ready(function() {
	testCardGetValue();
	testHandScore();
	console.log("test finished");
	playGame();
});

// fix prompt so there is an "invalid" possibility.
// write for loop method in Hand that prints out all cards in array
// create a Deck class which holds an array of cards to avoid the deal resulting in two identical cards
