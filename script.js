const buttonStart = document.getElementById('button-start');
const sectionHomepage = document.getElementById('section-homepage');

const sectionQuestion = document.getElementById('section-question');
const questionTitle = document.getElementById('question-title');
const questionChoices = document.getElementById('ul-choices');
const questionFeedback = document.getElementById('p-feedback');

const sectionInitials = document.getElementById('section-initials');
const inputInitials = document.getElementById('input-initials');
const buttonInitials = document.getElementById('button-initials');
const spanScore = document.getElementById('span-score');


const sectionHighscore = document.getElementById('section-highscore');
const ulHighscoreboard = document.getElementById('ul-highscoreboard');
const buttonPlayAgain = document.getElementById('button-play-again');
const buttonExit = document.getElementById('button-exit');
const modal = document.getElementById('modal-thanks');
const spanClose = document.getElementById('span-close');

const sectionTimer = document.getElementById('section-timer');
const spanTimer = document.getElementById('span-timer');

let currentQuestionIndex = 0;

let timeRemaining = 99;
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

        // feedback message for choices either correct or incorrect
        function showFeedback(message, timeout = 4000){
            // show feedback element for 4seconds
            questionFeedback.textContent = message;
            questionFeedback.setAttribute("style", "display: block;");

            setTimeout(function(){
                questionFeedback.setAttribute("style", "display: none;");
            }, timeout)
        }

// Question section
function showQuestion(index){
    const question = questions[index];

    // change question title for each question
    questionTitle.textContent = question.title;

    // loop through the choices for answers and create li for each one with a button
    questionChoices.textContent = '';

    for (let indexChoices = 0; indexChoices < question.choices.length; indexChoices++) {
        const choice = question.choices[indexChoices];

        const liChoices = document.createElement('li');

        const buttonChoices = document.createElement('button');
        buttonChoices.textContent = choice.title;
        buttonChoices.setAttribute('data-answer', choice.isAns);

        // when I click the choice button
        buttonChoices.addEventListener('click', function(event){

            // if the player clicks a choice 
            // check if correct
            const correctChoice = event.target.getAttribute('data-answer') === 'true';
           if(correctChoice){
               // feedback says it is correct
               showFeedback('Correct');
           } 
            // if player clicks the incorrect choice
           else{
                // feedback says it's incorrect   
               showFeedback('Incorrect');
               // reduce the time remaining by 10secs
               timeRemaining = timeRemaining - 10;
           }

           


            if(index + 1 >= questions.length){
            // reach final question
            return endGame();
            }
            // show next question
            showQuestion(index + 1);
        });
        

        // append button to li and li to ul
        liChoices.appendChild(buttonChoices);
        questionChoices.appendChild(liChoices);
    }

}






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
}
   

    // when player types in input box or player presses enter key
    // player clicks submit button
    buttonInitials.addEventListener('click', function(event){
        event.preventDefault();

        let playerInitials = inputInitials.value.trim();
        const highscore = {
            name: playerInitials,
            highscore: timeRemaining,
        }
         
        const existingHighscores = retrieveHighScore();
       
        // add in new highscore 
        existingHighscores.push(highscore);
        // save to local storage
        localStorage.setItem("highscores", JSON.stringify(existingHighscores));
        console.log(highscore, existingHighscores);

        showHighScorePage();
    });
    



    function showHighScorePage(){
        // show Highscore 
        sectionHighscore.setAttribute("style", "display: block;");
        // hide initials section
        sectionInitials.setAttribute("style", "display: none;");
        renderInitials();
    }

    function renderInitials(){
        // clear input field
        inputInitials.value = null;

        // get all highscores from local storage
        const highscores = retrieveHighScore();

        // order highscores in descending order
        highscores.sort(function(a, b){
                if(b.highscore > a.highscore) {
                    return 1;
                } else {
                    return -1;
                }
                
        });


        ulHighscoreboard.textContent = "";
        // create li with player scores
        for (let index = 0; index < highscores.length; index++){
            const highscore = highscores[index];
            let liPlayerScore = document.createElement('li');
            // add class list to the player score for easy removal
            liPlayerScore.classList.add('player-score');
            liPlayerScore.textContent = highscore.name + " had a score of " + highscore.highscore;
            //append player's initials to the highscore list
            ulHighscoreboard.appendChild(liPlayerScore);
        }
 }
     /**
     * @returns {Array} retrieveHighScore
     */
    function retrieveHighScore(){
        // get player highscore
         return JSON.parse(localStorage.getItem("highscores") || "[]");
        
    }


 
// Highscore page
    //  player clicks on Play Again button
    buttonPlayAgain.addEventListener('click', function(event){
        resetTimer();
        // reset timer
        function resetTimer(){
            timeRemaining = 99;
            timerId = null;
            spanTimer.textContent = timeRemaining;
        }
        // hide highscore section
        sectionHighscore.setAttribute("style", "display: none;");
        // show homepage section
        sectionHomepage.setAttribute("style", "display: block;");
    });


    //  player clicks on Exit button
    buttonExit.addEventListener('click', function(event){
        // modal pops up
        modal.setAttribute("style", "display: block;");
        // clear the local storage
        localStorage.clear();
    
    })
    
    
    // When the user clicks on <span> (x), close the modal
    spanClose.addEventListener('click', function(event){
        modal.setAttribute("style", "display: none;");
          // clear the highscore list and return to homepage
          window.location.reload();
    })
    // when user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event){
        if (event.target == modal){
            modal.setAttribute("style", "display: none;"); 
              // clear the highscore list and return to homepage
            window.location.reload();
        }
    })
    