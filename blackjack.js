const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// function to shuffle a deck of cards
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// function to calculate hand value
function calculateHandValue(hand) {
    let value = 0;
    let numAces = 0;
    for (const card of hand) {
        if (card.value === 'Ace') {
            numAces++;
            value += 11;
        } else if (card.value === 'Jack' || card.value === 'Queen' || card.value === 'King') {
            value += 10;
        } else {
            value += card.value;
        }
    }
    while (value > 21 && numAces > 0) {
        value -= 10;
        numAces--;
    }
    return value;
}
function getDealerHandValue(dealerHand) {
    let handValue = 0;
    for (let i = 0; i < dealerHand.length; i++) {
        let cardValue = dealerHand[i];
        if (cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
            handValue += 10;
        } else if (cardValue === 'A') {
            handValue += 11;
        } else {
            handValue += cardValue;
        }
    }
    return handValue;
}
// function to get the player's move
function getPlayerMove(handValue) {
    rl.question(`Your hand value is ${handValue}. Would you like to hit or stand? `, (answer) => {
        if (answer.toLowerCase() === 'hit') {
            // code to deal another card to player
            let card = deck.pop();
            console.log(`You were dealt a ${card.rank} of ${card.suit}.`);
            handValue += card.value;
            if (handValue > 21) {
                console.log(`You busted with a hand value of ${handValue}.`);
                // code to end the game
            } else {
                getPlayerMove(handValue);
            }
        } else if (answer.toLowerCase() === 'stand') {
            // code to end player's turn and start dealer's turn
            let dealerHandValue = getDealerHandValue();
            console.log(`Dealer's hand value is ${dealerHandValue}.`);
            while (dealerHandValue < 17) {
                let card = deck.pop();
                console.log(`Dealer was dealt a ${card.rank} of ${card.suit}.`);
                dealerHandValue += card.value;
            }
            if (dealerHandValue > 21) {
                console.log(`Dealer busted with a hand value of ${dealerHandValue}.`);
                // code to end the game
            } else {
                // code to compare dealer's hand value with player's hand value and determine the winner
            }
        } else {
            console.log('Invalid option, please enter hit or stand.');
            getPlayerMove(handValue);
        }

    });
}

// function to start the game
function startGame() {
    // code to set up the game and deal initial cards to player and dealer
    const deck = [];
    const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    shuffle(deck);
    const playerCards = [deck.pop(), deck.pop()];
    const dealerCards = [deck.pop(), deck.pop()];
    const playerHandValue = calculateHandValue(playerCards);
    console.log(`Your hand is ${playerCards[0].value} of ${playerCards[0].suit} and ${playerCards[1].value} of ${playerCards[1].suit}.`);
    getPlayerMove(playerHandValue);
}

startGame();
