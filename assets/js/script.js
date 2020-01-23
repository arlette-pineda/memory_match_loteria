var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var modal = document.getElementsByClassName('modal-overlay')[0];

var gameCards = document.getElementById('gameCards');
gameCards.addEventListener('click', handleClick);

function handleClick(event){
  if(event.target.className.indexOf('card-back') === -1){ //if where clicked does not have card-back class, then get out of function, main container will not delete
    return; //exit out of function
  }
  event.target.className += " hidden"; //adding class of hidden
  if(!firstCardClicked){
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    } else {
    secondCardClicked = event.target; //2nd clicked becomes target
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if(firstCardClasses === secondCardClasses){ //if the cards match then...
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++; //increases matches var by 1 when cards match
      if(maxMatches === matches){
        modal.classList.remove('hidden');
      }
    } else { //if the cards do not match then...
      setTimeout(function(){
        firstCardClicked.classList.remove('hidden'); //show back of card again
        secondCardClicked.classList.remove('hidden'); //show back of card again
        gameCards.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);}
  }
}
