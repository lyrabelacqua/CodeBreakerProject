let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == "" || attempt.value == "") {
        setHiddenFields();
    }
    
    if (!validateInput(input.value))
        return false;
    else {
        attempt.value++;
        var correct = getResults(input.value);
        if (correct) {
            setMessage("You Win! :)");
            showAnswer(correct);
            showReplay();
            setHiddenFields();
        }
        else if (!correct && (attempt.value > 10)){
            setMessage("You Lose! :(");
            showAnswer(false);
            showReplay();
            setHiddenFields();
        }
        else
            setMessage("Incorrect, try again.");
    
      }
        
}

//implement new functions here

function showAnswer(result) {
    let code = document.querySelector("#code");
    code.innerHTML = answer.value;
    if(result)
        code.classList.add("success");
    else
        code.className += " failure";
}

function showReplay() {
    document.getElementById("guessing-div").style.display = 'none';
    document.getElementById("replay-div").style.display = 'block';
}

function setHiddenFields() {
    answer.value = Math.floor(Math.random()*10000).toString();
    while (answer.value.length < 4) {
        answer.value = 0 + answer.value
    }
    attempt.value = 0;
    
}

function setMessage(message) {
    document.querySelector("#message").innerHTML = message;
}

function validateInput(l) {
    if(l.length == 4) 
        return true;
    
    else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}


function getResults(input) {
    let allCorrect = true;
    input.toString();
    let guesses = document.querySelector("#results");
    let newGuess = document.createElement('div');
    newGuess.classList.add('row');
    let newSpan = document.createElement('span');
    newSpan.classList.add('col-md-6');
    newSpan.textContent = input;
    newGuess.appendChild(newSpan);
    guesses.appendChild(newGuess);
    
    let resultGlyph = "";
    
    console.log(answer.value);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(input[i]==answer.value[i]) {
                resultGlyph += '<span class="glyphicon glyphicon-ok"></span>';
                break;
            }
            else if (input[i]==answer.value[j] &&(i!=j)){
                allCorrect = false;
                resultGlyph += '<span class="glyphicon glyphicon-transfer"></span>';
                break;
            }
            else if (j==3) {
                allCorrect=false;
                resultGlyph += '<span class="glyphicon glyphicon-remove"></span>';
            
            }
        }
    }
    
    
    let resultSpan = document.createElement('span');
    resultSpan.classList.add('col-md-6');
    resultSpan.innerHTML = resultGlyph;
    newGuess.appendChild(resultSpan);
    guesses.appendChild(newGuess);
    
    return allCorrect;
}
