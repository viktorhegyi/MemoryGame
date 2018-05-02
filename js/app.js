let cards = ["diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb",
            "diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let openCards = [];
let deck = $('.deck');
let counter = 0;
let foundCardsPair = 0;
const playAgain = $(".reset");
const restart = $(".restart");
let winner = false;
let startTimer = false;
let startTime = 0;
let finishTime = 0;
let duration = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//create the html for card

function buildDeck() {
  for (var i = 0; i < cards.length; i++) {
    deck.append('<li><i class="card fa fa-' + cards[i] + '"></i></li>');
  }
};

//start the game logic

startGame();

function startGame() {
  shuffle(cards);
  buildDeck();
  findMatch();
}

//functions to use

function showCard(card) {
  $(card).toggleClass("open show");
  addToOpenCards(card);
};

function addToOpenCards(a) {
  let card = $(a);
  openCards.push(card);
};

function emptyOpenCards() {
  openCards = [];
};

function removeClass() {
  $(".card").removeClass("show open flipInY bounceIn shake wrong");
  emptyOpenCards();
};

// the logic for finding if two cards match

function findMatch() {
  $(".card").on("click", function() {
    if (!startTimer) { // check if the timer started and start the game clock
      startTimer = true;
      startTime = new Date();
      startGameClock();
    };
    if ($(this).hasClass("open") || $(this).hasClass("show")) {
      return true;
    };
    showCard(this);

    if (openCards.length === 2) { // check if two cards turned and check if they match
      if(openCards[0][0].classList[2] === openCards[1][0].classList[2]) {
        openCards[0][0].classList.add("match", "bounceIn");
        openCards[1][0].classList.add("match", "bounceIn");
        $(openCards[0]).off('click');
        $(openCards[1]).off('click');
        emptyOpenCards();
        counter++;
        foundCardsPair++;
        findWinner();
      } else {
        openCards[0][0].classList.add("shake", "wrong");
        openCards[1][0].classList.add("shake", "wrong");
        emptyOpenCards();
        setTimeout(removeClass, 500);
        counter++;
      }
    }
  moveCounter();
  rating();
  });
};

// change the html for counting the Moves

function moveCounter() {
  $(".moves").text(counter.toString());
};

// check if all cards found pair and show the modal for winners

function findWinner() {
  if (foundCardsPair === 8) {
    winner = true;
    $(".modal").css("display", "block");
    $(".time").text("You completed the game in: " + duration + " seconds.");
    $(".ratingMessage").text("Your rating is: " + $(".stars").children().length + " star(s)");
  };
};

// reset the game for reset button and play agan button

playAgain.on("click", function() {
  location.reload()
});

restart.on("click", function() {
  location.reload()
});

// the logic for the time spent in the game

function timeSpent() {
  let date = new Date();
  finishTime = date.getTime();
  let startingTime = startTime.getTime();
  duration = Math.round((finishTime - startingTime) / 1000);
  return duration;
};

// show the timer in html

function timer() {
  if (!winner) {
    $(".timer").text("Timer: " + timeSpent() + " seconds");
  }
};

// make the clock running real time

function startGameClock() {
  if (startTimer) {
    setInterval(timer, 1000);
  };
};

// change the rating stars

function rating() {
  if (counter >= 12) {
    $(".firstStar").remove();
  };
  if (counter >= 24) {
    $(".secondStar").remove();
  };
  if (counter >= 36) {
    $(".thirdStar").remove();
  };
};
