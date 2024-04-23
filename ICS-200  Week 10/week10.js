'use strict';



const mainApp = document.querySelector('.app');

const score = document.querySelector('.score-count');

const gameBody = document.querySelector('.game-body');

const moves = document.querySelector('.moves');

const triangle = document.querySelector('.bg-triangle');

const moveBtn = document.querySelectorAll('.move--wrapper');

const gameActive = document.querySelector('.game-active');

const userMoveIcon = document.querySelectorAll('.user-move-icon');

const moveIcon = document.querySelectorAll('.move-icon');

const userMove = document.querySelectorAll('.user-pick');

const result = document.querySelector('.result');

const resultText = document.querySelector('.result-text');

const rulesBtn = document.querySelector('.rules');

const replayBtn = document.querySelector('.replay');

const cancelBtn = document.querySelector('.cancel');



// Destructuring

const [playerMove, houseMove] = moveIcon;

const [player_Move, house_Move] = userMove;

let scoreCount = 0;



let pMove, hMove;

function resetGame() {

  moves.style.display = 'grid';

  triangle.style.display = 'inline-block';

  gameActive.style.display = 'none';

  result.style.display = 'none';

  playerMove.classList.toggle(`${pMove}`);

  houseMove.classList.toggle(`${hMove}`);

  houseMove.classList.toggle('icon');

  if(player_Move.classList.contains('winner')){

    player_Move.classList.toggle('winner');

  }

  if(house_Move.classList.contains('winner1')){

    house_Move.classList.toggle('winner1');

  }

}



function collapseMoves() {

  moves.style.display = 'none';

  triangle.style.display = 'none';

}



function generateIcon(move) {

  return `<img src="./images/icon-${move}.svg" alt="${move}" class="user-move-icon">`;

}



function pickMove() {

  collapseMoves();

  const moveName = this.classList[1];

  const hidden =

    '<img src="https://urldefense.com/v3/__https://raw.githubusercontent.com/Alpha437/Rock-Paper-Scissors/45ab15ee3c69df5ee1279d28a368a7562fffcf9a/images/icon-paper.svg__;!!PvDODwlR4mBZyAb0!TPoG9kF7bIx7MoxtDtGKf9G7j4ANv59GVu1yISEoTLJYHSUJyiTY8ei4Hg-hj6DTSrIZ88lAsPvLMmjLYQ$ " alt="" class="user-move-icon" style="visibility: hidden;">';

  const rps = ['rock', 'paper', 'scissors'];

  const randomMove = rps[Math.trunc(rps.length * Math.random())];

  let html;



  // Player move

  playerMove.classList.toggle(`${moveName}`);

  playerMove.innerHTML = generateIcon(moveName);

  houseMove.innerHTML = hidden;

  houseMove.style.background = 'var(--bg-color2)';

  gameActive.style.display = 'grid';



  // Computer move

  setTimeout(() => {

    houseMove.style.background = 'linear-gradient(to bottom, rgb(219, 219, 219), white)';

    houseMove.classList.toggle(`${randomMove}`);

    houseMove.classList.toggle('icon');

    houseMove.innerHTML = generateIcon(randomMove); // Display the computer's move icon

  }, 5000);



  // Decide winner

  setTimeout(() => {

    decideWinner(moveName, randomMove);

    [pMove, hMove] = [moveName, randomMove];



    // Update score

    if (scoreCount >= 0) {

      score.textContent = scoreCount < 10 ? scoreCount.toString().padStart(2, '0') : scoreCount;

    } else {

      scoreCount = 0;

      score.textContent = '00';

    }

  }, 6000);

}



function displayTextAndEffect(winner) {

  if (winner == 'player') {

    resultText.textContent = 'You win';

    scoreCount++;

    player_Move.classList.toggle('winner');

  } else {

    resultText.textContent = 'You lose';

    scoreCount--;

    house_Move.classList.toggle('winner1');

  }

}



function decideWinner(player, computer) {

  if (player == 'paper' && computer == 'rock') {

    displayTextAndEffect('player');

  } else if (player == 'rock' && computer == 'scissors') {

    displayTextAndEffect('player');

  } else if (player == 'scissors' && computer == 'paper') {

    displayTextAndEffect('player');

  } else if (player == computer) {

    resultText.textContent = 'Draw';

    scoreCount = scoreCount;

  } else {

    displayTextAndEffect('computer');

  }

  result.style.display = 'block';

}



function collapseRules() {

  document.querySelector('.rule-container').style.display = 'none';

}



// Event handlers

moveBtn.forEach((move) => move.addEventListener('click', pickMove));

replayBtn.addEventListener('click', resetGame);

rulesBtn.addEventListener('click', () => {

  document.querySelector('.rule-container').style.display = 'grid';

});

cancelBtn.addEventListener('click', collapseRules);

document

  .querySelector('.rule-container')

  .addEventListener('click', collapseRules);