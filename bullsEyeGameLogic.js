var deck = new Array();
var suits = ["spades", "hearts", "diamonds", "clubs"];
var values = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13];
var roundScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var activePlayer = 0;
var activeRound = 0;
var playerPoints = [0, 0, 0, 0];

function createTwoDimensionalArray(rows, columns) {
    var createdArray = new Array(columns);
    for (var i = 0; i < createdArray.length; i++) {
        createdArray[i] = new Array(rows);
    }

    return createdArray;
}

function createTwoDimensionalEmptyArray(rows, columns) {
    var createdArray = new Array(columns);
    //create array of required size
    for (var i = 0; i < createdArray.length; i++) {
        createdArray[i] = new Array(rows);
    }
    //empty the array
    for (var x = 0; x < columns; x++) {
        for (var y = 0; y < rows; y++) {
            createdArray[x].pop();
        }

    }

    return createdArray;
}

var playerBids = createTwoDimensionalArray(3, 4);
var playerCards = createTwoDimensionalArray(12, 4);
//var usedPlayerCards = createTwoDimensionalArray(12,4);
//var usedPlayerCards = new Array(4,12);
var usedPlayerCards = createTwoDimensionalEmptyArray(12, 4);

var activePlayerForBid = 0;
var activePlayerBidNo = 0;


function takePlayerBidInput() {

    document.getElementById('bidButtonID').style.display = 'none';
    document.getElementById('bidButtonID').removeEventListener('click', takePlayerBidInput);

    var linebreak = document.createElement("br");
    document.getElementById('submitBidPanel').appendChild(linebreak);
    var description = document.createElement("text");
    description.setAttribute('id', 'playerDetails');
    document.getElementById("submitBidPanel").appendChild(description);
    description.innerHTML = 'Player-' + activePlayerForBid + " Bid-" + activePlayerBidNo + " : ";
    //console.log(document.getElementById('playerDetails'));


    var bidInput = document.createElement("input");
    bidInput.setAttribute('id', 'PlayerBidInput');
    document.getElementById("submitBidPanel").appendChild(bidInput);
    //console.log(document.getElementById('PlayerBidInput'));


    var bidSubmit = document.createElement("button");
    //var buttonID = 'p'+activePlayerForBid+'b'+activePlayerBidNo;
    bidSubmit.setAttribute('id', 'bidSubmitButton');
    bidSubmit.innerHTML = "submit";
    bidSubmit.addEventListener('click', registerBid);
    document.getElementById('submitBidPanel').appendChild(bidSubmit);

    bidInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('bidSubmitButton').click();
        }

    });

}

function registerBid() {


    playerBids[activePlayerForBid][activePlayerBidNo] = parseInt(document.getElementById("PlayerBidInput").value);
    console.log(playerBids[activePlayerForBid][activePlayerBidNo]);

    var linebreak = document.createElement("br");
    document.getElementById('playerBidsDisplayPanel').appendChild(linebreak);

    var playerBidDisplay = document.createElement('text');
    playerBidDisplay.innerHTML = 'Player-' + activePlayerForBid + " Bid-" + activePlayerBidNo + " = " + playerBids[activePlayerForBid][activePlayerBidNo];
    document.getElementById('playerBidsDisplayPanel').appendChild(playerBidDisplay);





    activePlayerForBid++;
    document.getElementById("PlayerBidInput").value = "";


    if (activePlayerForBid < 4 && activePlayerBidNo < 3) {
        document.getElementById('playerDetails').innerHTML = 'Player-' + activePlayerForBid + " Bid-" + activePlayerBidNo + " : ";
        //takePlayerBidInput();
        //activePlayerBidNo++;
    }
    else if (activePlayerForBid > 3 && activePlayerBidNo < 2) {
        activePlayerForBid = 0;
        activePlayerBidNo++;
        document.getElementById('playerDetails').innerHTML = 'Player-' + activePlayerForBid + " Bid-" + activePlayerBidNo + " : ";
        //takePlayerBidInput();
    }
    else if (activePlayerForBid > 3 && activePlayerBidNo == 2) {
        document.getElementById('submitBidPanel').style.display = 'none';
        //console.log(document.getElementById('submitBidPanel'));
        return;

    }


    //console.log('activePlayerForBid : '+activePlayerForBid+' activePlayerBidNo : ' + activePlayerBidNo);

}

function displayPlayerBids() {


}

function makeDeck() {
    var deck = new Array();
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
            var card = { Value: values[j], Suit: suits[i] };
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck() {
    for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var temp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = temp;

    }
}

function distributeCards() {

    for (i = 0; i < 12; i++) {
        for (j = 0; j < 4; j++) {
            playerCards[j][i] = deck.pop();
        }

    }
    //console.log(playerCards);
}

function renderCards() {
    for (j = 0; j < 4; j++) {
        for (i = 0; i < 12; i++) {
            var card = document.createElement("BUTTON");
            console.log(card);
            var cardText = "V " + playerCards[j][i].Value + " S " + playerCards[j][i].Suit;
            card.innerHTML = cardText;
            //card.setAttribute('class',('player' + j + 'Cards'));
            card.setAttribute('id', playerCards[j][i].Value);
            var cardDiv = "player" + j + "Div";
            //console.log(cardDiv);
            document.getElementById(cardDiv).appendChild(card);
            document.getElementById(cardDiv).addEventListener("click", playCard);
            //document.getElementById(cardDiv).className += 'disabledDiv';
            //card.onclick = playCard(this.id);
        }
    }

    var submitBidButton = document.createElement("BUTTON");
    submitBidButton.innerHTML = "submit bid";
    console.log(submitBidButton);
    var submitBidButtonID = "bidButtonID";
    //var submitButtonDiv = ""
    submitBidButton.setAttribute('id', submitBidButtonID);
    submitBidButton.addEventListener('click', takePlayerBidInput);
    document.getElementById("submitBidPanel").appendChild(submitBidButton);




}

function dealCards() {
    deck = makeDeck();
    shuffleDeck();
    distributeCards();
    renderCards();
    //simulateRounds();
    console.log(playerCards);
    //console.log(usedPlayerCards);
    document.getElementById('dealCardsButton').style.display = 'none';
    document.getElementById('dealCardsButton').removeEventListener('click', dealCards);
}

function simulateRounds() {

    for (i = 0; i < 12; i++) {
        for (j = 0; j < 4; j++) {
            usedPlayerCards[j][i] = (playerCards[j].pop());
        }
    }

}

function playCard(cardinnerHTML) {

    cardDetails = cardinnerHTML.target.innerHTML.split(" ");
    cardValue = parseInt(cardDetails[1]);
    console.log(cardValue + typeof cardValue);

    if(!isNaN(cardValue)){


    cardinnerHTML.target.remove();

    console.log('activePlayer : ' + activePlayer + ' activeRound : ' + activeRound);
    roundScoreLogic(cardValue);

    if (activePlayer > 2) {
        activePlayer = 0;
        activeRound++;
    }
    else {
        activePlayer++;
    }
    displayActivePlayerCards();
}

}

function displayActivePlayerCards() {

    if(activeRound<12){
    for (i = 0; i < 4; i++) {
        var hidePlayer = 'player' + i + 'Div';
        document.getElementById(hidePlayer).style.display = 'none';
    }

    var activePlayerDivID = 'player' + activePlayer + 'Div';
    document.getElementById(activePlayerDivID).style.display = 'block';
    }
    


}

function roundScoreLogic(playedCardValue) {
    //console.log(playedCardValue);
    roundScore[activeRound] += playedCardValue;
    console.log('active round score : ' + roundScore[activeRound]);
    if (activePlayer === 3) {
        if (roundScore[activeRound] === playerBids[activeRound % 4][Math.floor(activeRound / 4)]) {
            playerPoints[activeRound % 4]++;
        }
        console.log('active Round : ' + activeRound + 'active Player : ' + activeRound % 4 + ' active Bid : ' + Math.floor(activeRound / 4) + ' bid for the round : ' + playerBids[activeRound % 4][Math.floor(activeRound / 4)]);
        console.log(playerPoints);
    }

    
    if (activeRound > 10 & activePlayer > 2) {
        var divs = document.getElementsByTagName("div");
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.display = 'none';
        }
        document.getElementById('playerScores').style.display = 'block';
    }

    for(i=0;i<4;i++){
        var player = 'p' + i + 'score';
        document.getElementById(player).innerHTML = playerPoints[i];
    }




}
