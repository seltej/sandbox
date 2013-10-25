var createCard = function(suit, number) {
	return {
		suit: suit,
		number: number
	};
};

var getValue = function(card) {
	if (card.number > 10) {
			return 10;
		} else if (card.number === 1) {
			return 11;
		} else {
			return card.number;
		}
};

/*var deck = [
	createCard(1,1), createCard(1,2), createCard(1,3), createCard(1,4), createCard(1,5), createCard(1,6), 
	createCard(1,7), createCard(1,8), createCard(1,9), createCard(1,10), createCard(1,11), createCard(1,12), 
	createCard(1,13), createCard(2,1), createCard(2,2), createCard(2,3), createCard(2,4), createCard(2,5),
	createCard(2,6), createCard(2,7), createCard(2,8), createCard(2,9), createCard(2,10), createCard(2,11), 
	createCard(2,12), createCard(2,13), createCard(3,1), createCard(3,2), createCard(3,3), createCard(3,4), 
	createCard(3,5), createCard(3,6), createCard(3,7), createCard(3,8), createCard(3,9), createCard(3,10), 
	createCard(3,11), createCard(3,12), createCard(3,13), createCard(4,1), createCard(4,2), createCard(4,3), 
	createCard(4,4), createCard(4,5), createCard(4,6), createCard(4,7), createCard(4,8), createCard(4,9), 
	createCard(4,10), createCard(4,11), createCard(4,12), createCard(4,13)];
*/

var createDeck = function() {
	var deck = [];
	for (var suit = 1; suit < 5; suit++) {
		for (var number = 1; number < 14; number++) {
			deck[deck.length] = createCard(suit,number);
		}
	}
	return deck;
	};

var selectRandomCard = function(deck) {
	var index = Math.floor(Math.random() * deck.length);
	return deck.splice(index, 1)[0];
};

var shuffle = function(deck) {
	var shuffledDeck = [];
	var deckLength = deck.length;
	for (i = 0; i < deckLength; i++) {
		shuffledDeck[shuffledDeck.length] = selectRandomCard(deck);
	}
	return shuffledDeck;
};

var play = function() {
	var card = createCard(1, 1);
	console.log(card);
	var deck = createDeck();
	console.log(deck);
	var dealtCard = selectRandomCard(deck);
	console.log(dealtCard);
};