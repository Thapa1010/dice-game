'use strict';

/// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHelp = document.querySelector('.btn--help');

const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const modal1 = document.querySelector('.modal--1');
const btnCloseModal1 = document.querySelector('.close-modal--1');

let x = document.getElementById('myAudio');

//starting condition
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const closeModal1 = function () {
  modal1.classList.add('hidden');
};

const openModal1 = function () {
  modal1.classList.remove('hidden');
};

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random number between 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;

    //removing the hidden class
    diceEl.classList.remove('hidden');
    //displaying the random image
    diceEl.src = `dice-${dice}.png`;

    //checking if rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to next player and reset score
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      openModal();
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

//to close the model
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
btnCloseModal1.addEventListener('click', closeModal1);
btnHelp.addEventListener('click', openModal1);
