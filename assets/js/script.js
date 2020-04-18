var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var modal = document.getElementsByClassName('modal-overlay')[0];
var gaPlayedDiv = document.getElementById('games-played-score');
var attemptsDiv = document.getElementById('attempts-score');
var accuracyDiv = document.getElementById('accuracy-score');
var attempts = 0;
var gamesPlayed = 0;
var cardBacks = document.getElementsByClassName('card-back');
var resetButton = document.getElementById('reset-button');

function displayStats(){
  gaPlayedDiv.textContent = gamesPlayed
  attemptsDiv.textContent = attempts
  accuracyDiv.textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches){
  if(!attempts){
    return "0%";
  } else {
  return ((Math.trunc((matches / attempts) * 100)) + "%");
  }
}

function resetGame(){
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  gameCards.innerText = ""
  shuffle();
  modal.classList.add('hidden');
}

resetButton.addEventListener('click', resetGame);

var gameCards = document.getElementById('gameCards');
gameCards.addEventListener('click', handleClick);

function handleClick(event){
  if(event.target.className.indexOf('card-back') === -1){
    return;
  }
  event.target.className += " hidden";
  if(!firstCardClicked){
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if(firstCardClasses === secondCardClasses){
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      displayStats();
      if(maxMatches === matches){
        modal.classList.remove('hidden');
      }
    } else {
      setTimeout(function(){
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        gameCards.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        attempts++;
        displayStats();
    }, 1000);}
  }
}

function shuffle() {
  var arr = ['el-arpa', 'el-apache', 'el-barril', 'el-borracho', 'el-gorrito', 'el-musico',
    'el-soldado', 'el-tambor', 'el-violoncello', 'el-arpa', 'el-apache', 'el-barril',
    'el-borracho', 'el-gorrito', 'el-musico', 'el-soldado', 'el-tambor', 'el-violoncello']

  for (var k = 0; k < arr.length; k++){
    var randNum = Math.floor(Math.random() * arr.length);
    var temp = arr[k];
    arr[k] = arr[randNum];
    arr[randNum] = temp;
  }

  for (var i = 0; i < arr.length; i++){
  var newMain = document.querySelector('#gameCards');
  var newCard = document.createElement('div');
  newCard.classList.add('card', 'col-2');
  var cardFront = document.createElement('div');
  cardFront.classList.add('card-front', arr[i]);
  var cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  newCard.appendChild(cardFront);
  newCard.appendChild(cardBack);
  newMain.appendChild(newCard);
  }
}
shuffle();
