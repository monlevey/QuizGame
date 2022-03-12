const buttonStart = document.getElementById('button-start');
const sectionHomepage = document.getElementById('section-homepage');
const sectionQuestion = document.getElementById('section-question');

const sectionHighscore = document.getElementById('section-highscore');
const ulHighscoreboard = document.getElementById('ul-highscoreboard');


const sectionInitials = document.getElementById('section-initials');
const inputInitials = document.getElementById('input-initials');
const buttonInitials = document.getElementById('button-initials');
const spanScore = document.getElementById('span-score');

const sectionTimer = document.getElementById('section-timer');
const spanTimer = document.getElementById('span-timer');

let timeRemaining = 10;
let timerId = null;
spanTimer.textContent = timeRemaining;

// When player clicks the start quiz button
buttonStart.addEventListener('click', function(event){

    // show question section 
    sectionQuestion.setAttribute("style", "display: block;");
    // hide homepage section
    sectionHomepage.setAttribute("style", "display: none;");
    // show timer
    sectionTimer.setAttribute("style", "display: block;");
    // start timer
    startTimer();
    // show questions
    showQuestion(0);
})
        // timer
        // update the span-timer for every passing second
        function startTimer(){
            timerId = setInterval(function(){
            timeRemaining = timeRemaining - 1
            spanTimer.textContent = timeRemaining

                // if there is no time left then end the game
                if(timeRemaining <= 0) {
                    // end the game
                    endGame();
                }

            }, 1000);
            // 
        }

// questions

// when click on an answer
// move to the next question

// if the player clicks correct choice 
// feedback is correct


// if the player clicks wrong choice 
// feedback is incorrect

// reduce the time remaining by 10secs

// if the player does not click on a choice and timer runs out
// end game 
// if the player clicks on choice of final question
// end game

// at end game
function endGame(){
    // timer stops
    clearInterval(timerId);
    // hide questions page
    sectionQuestion.setAttribute("style", "display: none;");
     
    enterInitials();
}


// End Game and Enter Initials screen
function enterInitials(){
    // show the initial page
    sectionInitials.setAttribute("style", "display: block;");
    // show their score 
    // show the time remaining in span score
    spanScore.textContent = timeRemaining;
    // hide timer 
    sectionTimer.setAttribute("style", "display: none;");
    
    // when player types in input box or player presses enter key
    saveInitials();
}
   

// let playerInitials = localStorage.getItem("playerInitials")
// player types in input box 
function saveInitials(){
    // player clicks submit button
    buttonInitials.addEventListener('click', function(event){
        event.preventDefault();
        let playerInitials = inputInitials.value.trim();
        localStorage.setItem("playerInitials", playerInitials);

        renderInitials();
    });
}


    function renderInitials() {
        // show Highscore 
    sectionHighscore.setAttribute("style", "display: block;");
    // hide initials section
    sectionInitials.setAttribute("style", "display: none;");

    // get player initials
        let lastInitials = localStorage.getItem("playerInitials");
        if (lastInitials !== null){
            // create li with player initials
            const li = document.createElement('li');
            li.textContent = lastInitials;
            // append player score next to initials 
            const span = document.createElement('span');
            span.textContent = " had a score of " + timeRemaining;
            li.appendChild(span);
            //append player's initials to the highscore list
            ulHighscoreboard.appendChild(li);

        }
    }
        

// Highscore page
// 1. player clicks on play again button
// Go to Homepage (show)

// 2. player clicks on Exit button
// clear the local storage
// clear the highscore list