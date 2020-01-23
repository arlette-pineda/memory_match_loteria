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

function displayStats(){
  gaPlayedDiv.textContent = gamesPlayed
  attemptsDiv.textContent = attempts
  accuracyDiv.textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches){
  return (Math.trunc((matches / attempts) * 100)) + "%";
}

var gameCards = document.getElementById('gameCards');
gameCards.addEventListener('click', handleClick); //when card area clicked we want it to...

function handleClick(event){
  if(event.target.className.indexOf('card-back') === -1){ //if where clicked does not have card-back class, then get out of function, main container will not delete
    return; //exit out of function
  }
  event.target.className += " hidden"; //adding class of hidden
  if(!firstCardClicked){
    firstCardClicked = event.target; //first one you click now becomes your target
    firstCardClasses = firstCardClicked.previousElementSibling.className; //
    } else {
    secondCardClicked = event.target; //2nd clicked becomes target
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick); //container; will not allow to click a third
    if(firstCardClasses === secondCardClasses){ //if the cards match then...
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null; //will reset card clicked
      secondCardClicked = null; //will reset card clicked
      matches++; //increases matches var by 1 when cards match
      attempts++; //increases attempts by 1 when two cards match
      displayStats(); //call displayStats function to update stats display
      if(maxMatches === matches){ //if current # of matches is same as maximum # of matches
        modal.classList.remove('hidden'); //then show congrats modal
      }
    } else { //if the cards do not match then...
      setTimeout(function(){ //func to turn cards back around
        firstCardClicked.classList.remove('hidden'); //show back of card again
        secondCardClicked.classList.remove('hidden'); //show back of card again
        gameCards.addEventListener('click', handleClick); //then you can click on cards again after others have turned back around
        firstCardClicked = null; //will reset card clicked
        secondCardClicked = null; //will reset card clicked
        attempts++; //increases attempts by 1 when cards don't match
        displayStats(); //call displayStats function to update stats display
    }, 1500);}
  }
}
