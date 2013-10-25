test("card creation", function() {
	var card = createCard(1, 2);
	equal(card.suit, 1);
	equal(card.number, 2);
});

test("card value", function() {
	var card = createCard(1, 1);
	equal(getValue(card), 11);

	card = createCard(1, 2);
	equal(getValue(card), 2);

	card = createCard(1, 11);
	equal(getValue(card), 10);
});

test("create deck", function() {
	var deck = createDeck();

	equal(deck.length, 52);
	
	for(var i = 0; i < deck.length; ++i) {
    	ok(deck[i].hasOwnProperty("suit"));
    	ok(deck[i].hasOwnProperty("number"));
	}
});

test("deal", function() {
	var deck = createDeck();
	var card = selectRandomCard(deck);

   	ok(card.hasOwnProperty("suit"));
    ok(card.hasOwnProperty("number"));

    equal(deck.length, 51);
});

test("shuffle", function() {
	var deck = createDeck();
	equal(deck.length, 52);
	
	var newDeck = shuffle(deck);

	equal(newDeck.length, 52);
	equal(deck.length, 0);
// test that every card in newDeck is in deck but in different position
// I'll need to make a copy of deck that shuffle uses, to keep the original deck in tact for comparison
});