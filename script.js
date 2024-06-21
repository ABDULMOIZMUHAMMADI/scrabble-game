document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('submit-letters').addEventListener('click', submitLetters);
document.getElementById('submit-word').addEventListener('click', submitWord);
document.getElementById('play-again-button').addEventListener('click', playAgain);

let letters = [];
let scores = [];

function startGame() {
  const n = parseInt(document.getElementById('num-letters').value);
  if (isNaN(n) || n < 3 || n > 15) {
    alert('Number of allowed letters should be between 3 and 15.');
    return;
  }
  document.getElementById('game-setup').style.display = 'none';
  document.getElementById('letter-setup').style.display = 'block';
  const letterInputs = document.getElementById('letter-inputs');
  letterInputs.innerHTML = '';
  for (let i = 0; i < n; i++) {
    letterInputs.innerHTML += `
      <input type="text" class="letter" placeholder="Letter ${i + 1}" maxlength="1">
      <input type="number" class="score" placeholder="Score" min="1" max="9">
    `;
  }
}

function submitLetters() {
  letters = [];
  scores = [];
  const letterElements = document.querySelectorAll('.letter');
  const scoreElements = document.querySelectorAll('.score');
  for (let i = 0; i < letterElements.length; i++) {
    const letter = letterElements[i].value.toUpperCase();
    const score = parseInt(scoreElements[i].value);
    if (!/[A-Z]/.test(letter) || letter.length !== 1 || isNaN(score) || score < 1 || score > 9 || letters.includes(letter)) {
      alert('Invalid letter or score. Please enter unique letters and valid scores.');
      return;
    }
    letters.push(letter);
    scores.push(score);
  }
  document.getElementById('letter-setup').style.display = 'none';
  document.getElementById('word-setup').style.display = 'block';
  alert(`Allowed letters: ${letters.join(', ')}`);
}

function submitWord() {
  const word = document.getElementById('word').value.toUpperCase();
  let wordScore = 0;
  let usedAllLetters = true;
  for (let i = 0; i < word.length; i++) {
    const letterIndex = letters.indexOf(word[i]);
    if (letterIndex === -1) {
      alert(`Invalid word. '${word[i]}' is not in the allowed list.`);
      wordScore = 0;
      usedAllLetters = false;
      break;
    } else {
      wordScore += scores[letterIndex];
    }
  }
  if (usedAllLetters && word.length === letters.length) {
    wordScore += 50;
  }
  document.getElementById('score').textContent = `Score for '${word}': ${wordScore}`;
  document.getElementById('word-setup').style.display = 'none';
  document.getElementById('play-again').style.display = 'block';
}

function playAgain() {
  letters = [];
  scores = [];
  document.getElementById('num-letters').value = '';
  document.getElementById('word').value = '';
  document.getElementById('score').textContent = '';
  document.getElementById('game-setup').style.display = 'block';
  document.getElementById('letter-setup').style.display = 'none';
  document.getElementById('word-setup').style.display = 'none';
  document.getElementById('play-again').style.display = 'none';
}
