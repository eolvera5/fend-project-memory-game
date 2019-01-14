

/*Timer variables*/
let seconds = 0;
let minutes = 0;
let timer = document.querySelector(".timer");
let interval;

/* moves */
let moves = 0;
let counter = document.querySelector(".moves");


/* close box */
let exit = document.querySelector(".close");

/*match cards together*/
let matchedCards = document.getElementsByClassName("match");

/* All cards listed */
 let allCards=["fa-lemon-o","fa-lemon-o",
              "fa-chevron-up","fa-chevron-up",
              "fa-anchor","fa-anchor",
              "fa-bolt","fa-bolt",
              "fa-cube","fa-cube",
              "fa-leaf","fa-leaf",
              "fa-bicycle","fa-bicycle",
              "fa-bomb","fa-bomb"];

/*cards*/
let oneCard = document.getElementsByClassName("card");
let cards = [...oneCard];

/* Icons star*/
const stars = document.querySelectorAll(".fa-star");

/* New Game*/
nextGame();

/* Congratulations Box*/
let modal = document.getElementById("modal");


 /*   - shuffle the list of cards using the provided "shuffle" method below*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 *   - loop through each card and create its HTML
 */
function makeCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function nextGame(){
  let deck = document.querySelector(".deck");
  let cardGrid = shuffle(allCards).map(function(card) {
    return makeCard(card);
  });
  deck.innerHTML = cardGrid.join("");

    reset();

    /*empty flippedCards array*/
    flippedCards=[];
    //add Event listeners
    eventListener();
}

/*Reset */
function reset(){
      /*Reset moves*/
      moves = 0;
      counter.innerHTML = moves;
      /*Reset stars */
      for (let i=0; i < stars.length; i++){
        stars[i].classList.remove("fa-star-o");
        stars[i].classList.add("fa-star");
    }
      /*timer*/
      let timer = document.querySelector(".timer");
        timer.innerHTML = "";
      clearInterval(interval);

}
function moveCounter(){
  moves++;
  counter.innerHTML = moves;

  /*start timer on first move*/
    if(moves == 1){
       sec = 0;
       min = 0;
       hour = 0;
       startTimer();
    }

  /* handler star */
  if (moves > 16 && moves < 32) {
    for (i=0; i < 3; i++) {
      if (i > 1) {
        stars[i].classList.remove("fa-star");
        stars[i].classList.add("fa-star-o");
      }
    }
  /*delete star if more than 33 moves */
  } else if (moves > 33){
    for (i=0; i<3; i++){
      if(i > 0){
        stars[i].classList.remove("fa-star");
        stars[i].classList.add("fa-star-o");
      }
    }
  }
}

/* stars w/ zeros*/
function timeString(num) {
  return (num < 10 ? "0" : "") + num;
 }

/*Game timer*/
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = timeString(min)+":"+timeString(sec);
    sec++;
    if (sec === 60){
      min++;
      sec=0;
    }
    if(min === 60){
      hour++;
      min=0;
    }
  }, 1000);
}

/* No matching cards function */
function notMatching(){
  //Flip over after 1 sec
  setTimeout(function(){
    for (let card of flippedCards){
      card.classList.remove("open","show");
    }
    flippedCards = []; //Empty flippedCards array
   }, 500);
}


/* function matched card */
function cardMatch(){
  flippedCards[0].classList.add("match", "open", "show");
  flippedCards[1].classList.add("match", "open", "show");
}


/*Event listener*/
function eventListener(){
  for(let card of oneCard) {
    card.addEventListener("click", function(flipCard){
    //Disable clicking on the same card
    if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")){

      flippedCards.push(card);

      if (flippedCards.length > 2){
        /*hide*/
      } else {
        card.classList.add("open","show");
        /*Check cards match*/
        if (flippedCards[0].dataset.card ===  flippedCards[1].dataset.card) {
            moveCounter();
            cardMatch();
            winner();
            /* flippedCards array*/
            flippedCards = [];
        } else {
            moveCounter();
            notMatching();

        }
        }
      }
    });

  /*empty flippedCards */
  flippedCards = [];
}
}

/*Pop up */

function winner() {
  if (matchedCards.length === 16){

    let finalStars = document.querySelector(".stars").innerHTML;

    /* show the popup*/
    modal.classList.add("show");

    /* elapsed time*/
    clearInterval(interval);
    endTime = timer.innerHTML;

    //show player stats
    document.getElementById("totalMoves").innerHTML = moves;
    document.getElementById("endTime").innerHTML = endTime;
    document.getElementById("totalStars").innerHTML = finalStars;

    /*close popup*/
    closeBox();
  };
}

/*Close popup*/
function closeBox(){
  exit.addEventListener("click",function(x){
    modal.classList.remove("show");
    nextGame();
  });
}

/*Play again*/
function playAgain(){
  modal.classList.remove("show");
  nextGame();
}
