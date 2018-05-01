let cards = ["diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb",
            "diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let openCards = [];
let deck = $('.deck');
let counter = 0;
let foundCardsPair = 0;
const playAgain = $(".reset");

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

function buildDeck() {
  for (var i = 0; i < cards.length; i++) {
    deck.append('<li><i class="card fa fa-' + cards[i] + '"></i></li>');
  }
};

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

function findMatch() {
  $(".card").on("click", function() {
    if ($(this).hasClass("open") || $(this).hasClass("show")) {
      return true;
    }
    showCard(this);

    if (openCards.length === 2) {
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
  });
};

function moveCounter() {
  $(".moves").text(counter.toString());
};

function findWinner() {
  if (foundCardsPair === 8) {
    $(".modal").css("display", "block");
  };
};

playAgain.on("click", function() {
  location.reload()
});
