/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying, playerSetScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {

		// 1. Random number
			var dice1 = Math.floor(Math.random() * 6) + 1;
			var dice2 = Math.floor(Math.random() * 6) + 1;
		
		// 2. Display result
			var diceDOM0 = document.getElementById('dice-0');
			diceDOM0.style.display = 'block';
			diceDOM0.src = 'dice-' + dice1 + '.png';

			var diceDOM1 = document.getElementById('dice-1');
			diceDOM1.style.display = 'block';
			diceDOM1.src = 'dice-' + dice2 + '.png';



		// 3. Update the round score IF the rolled number was NOT a 1
			if (dice1 !== 1 && dice2 !== 1) {
				// Add score
				roundScore += dice1 + dice2;
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
			} else {
				// Next player
				nextPlayer();
			}

		}
});

document.querySelector('.btn-hold').addEventListener('click', function() {

	if (gamePlaying) {
	// 1. Add current score to players global score
	scores[activePlayer] += roundScore;


	// 2. Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	// 3. Check if player won the game
		if (scores[activePlayer] >= playerSetScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
			document.getElementById('dice-0').style.display = 'none';
			document.getElementById('dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
}


});

document.getElementById('playersetscore').addEventListener('input', function() {
init();
	
});

function nextPlayer() {

			activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
			roundScore = 0;

			document.getElementById('current-0').textContent = '0';
			document.getElementById('current-1').textContent = '0';

			document.querySelector('.player-0-panel').classList.toggle('active');
			document.querySelector('.player-1-panel').classList.toggle('active');

			document.getElementById('dice-0').style.display = 'none';
			document.getElementById('dice-1').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);
document.getElementById('playersetscore').addEventListener('submit', init);

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	playerSetScore = document.getElementById('playersetscore').value;

	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	if (playerSetScore <= 0) {
	playerSetScore = 100;
	document.getElementById('playersetscore').textContent = ' ';
	} else { 
	}

	console.log(playerSetScore);
}


