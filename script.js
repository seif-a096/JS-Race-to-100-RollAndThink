'use strict';

let score0El    = document.querySelector('#score--0')
let score1El    = document.querySelector('#score--1')
let curr0El     = document.querySelector('#current--0')
let curr1El     = document.querySelector('#current--1')
let diceEl      = document.querySelector('.dice')
let btnNew      = document.querySelector('.btn--new')
let btnRoll     = document.querySelector('.btn--roll')
let btnHold     = document.querySelector('.btn--hold')
let currScore   = 0
let activeP     = 0       //active player init P0 but would be affected soon
let scores      = [0,0]   //scores of the 2 players 
let running     = true    //to hault when a player wins
//starting the game 
resetgame()

//utility functions
function switchactive(){
    if (activeP === 0){
        document.querySelector('.player--0').classList.remove('player--active')
        activeP = 1
        document.querySelector('.player--1').classList.add('player--active')
    }else{
        document.querySelector('.player--1').classList.remove('player--active')
        activeP = 0
        document.querySelector('.player--0').classList.add('player--active')
    }
}

function resetgame(){
    score0El.textContent = 0 
    score1El.textContent = 0
    curr0El.textContent  = 0
    curr1El.textContent  = 0
    diceEl.classList.add('hidden')
    scores    = [0,0]
    running   = true
    currScore = 0
    activeP   = 0
    document.querySelector('.player--0').classList.remove('player--winner')
    document.querySelector('.player--1').classList.remove('player--winner')
    document.querySelector('.player--1').classList.remove('player--active')
    document.querySelector('.player--0').classList.add('player--active')
}


//game logic
btnRoll.addEventListener('click',function(){
    if(running)
    {
    let dice = Math.trunc(Math.random() * 6) + 1
    console.log(dice)
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`
    if(dice !== 1)
    {
        currScore += dice
        document.querySelector(`#current--${activeP}`).textContent = currScore
    }else{
        currScore = 0
        document.querySelector(`#current--${activeP}`).textContent = currScore
       
        // activeP = (activeP === 0) ? 1 : 0
       // we could've toggled the classList
       /*       
      document.querySelector('.player--0').classList.toggle('player--active')
      document.querySelector('.player--1').classList.toggle('player--active')
       */

      switchactive()
    }
}
})

btnHold.addEventListener('click' , function(){
    if(running)
    {
    scores[activeP] += currScore
    currScore = 0
    document.querySelector(`#current--${activeP}`).textContent = 0                  // reset current
    document.querySelector(`#score--${activeP}`).textContent    = scores[activeP]    //display score
    
    if(scores[activeP] >= 100 ){
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activeP}`).classList.add('player--winner')
        running = false
    }else switchactive();
}
})

//New game configurations
btnNew.addEventListener('click',resetgame)
