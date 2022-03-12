const buttonStart = document.getElementById('button-start');
const sectionQuestion = document.getElementById('section-question');

const sectionHomepage = document.getElementById('section-homepage');

const sectionInitials = document.getElementById('section-initials');
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
    // show the initial page
    sectionInitials.setAttribute("style", "display: block;");
    // show their score
    
    // show the time remaining
    spanScore.textContent = timeRemaining;

    // hide timer
    

}


// End Game screen
// player types in input box
// do nothing
// player presses enter key
// submit
// player clicks submit button
// submit

// Submit button on end game screen 
// append player's initials to the highscore local storage

// Highscore page
// 1. player clicks on play again button
// Go to Homepage (show)

// 2. player clicks on Exit button
// clear the local storage
// clear the highscore list