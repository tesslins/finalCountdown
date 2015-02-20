// two global variables
var secondsRemaining;
var intervalHandle;

function resetPage() {
    document.getElementById("inputTime").style.display = "block";
}

function tick() {
    // grab the h1
    var timeDisplay = document.getElementById("time");
    
    // turn seconds into mm:ss
    var min = Math.floor(secondsRemaining / 60);
    var sec = secondsRemaining - (min * 60);
    
    // add a leading zero (as a string value) if seconds less than 10
    if (sec < 10) {
        sec = "0" + sec;
    }
    // concatenate with colon
    var message = min + ":" + sec;
    // now change the display
    timeDisplay.innerHTML = message;
    
    // stop if down to zero
    if (secondsRemaining === 0) {
        alert("Done!");
        clearInterval(intervalHandle);
        resetPage();
    }
    // subtract from seconds remaining
    secondsRemaining--;
}

function pauseTick() {

}

function startCountdown() {
    // get contents of the "minutes" text box
    var minutes = document.getElementById("minutes").value;
    // check if not a number
    if (isNaN(minutes)) {
        alert("Please enter a number!");
        return;
    }
    // how many seconds?
    secondsRemaining =  minutes * 60;
    // every second, call the "tick" function
    intervalHandle = setInterval(tick, 1000);
    // hide the form
    document.getElementById("inputTime").style.display = "none";

}

function createPauseButton() {
    // create pause button
    var pauseButton = document.createElement("input");
    pauseButton.setAttribute("type", "button");
    pauseButton.setAttribute("value", "Pause Countdown");
    document.getElementById("pauseTime").appendChild(pauseButton);
    pauseButton.onclick = function () {
        pauseButton.setAttribute("value", "Release the Countdown");
        pauseTick();

        var delay = 2000;
        setTimeout( createHaterButton, delay);
    };
}

function createHaterButton() {
    // create hater button
    var haterButton = document.createElement("input");
    haterButton.setAttribute("type", "button");
    haterButton.setAttribute("value", "I hate countdowns");
    document.getElementById("iHateCountdowns").appendChild(haterButton);
}

// as soon as the page is loaded...
window.onload =  function () {
    // create input text box and give it an id of "minutes"
    var inputMinutes = document.createElement("input");
    inputMinutes.setAttribute("id", "minutes");
    inputMinutes.setAttribute("type", "text");
    // create a button
    var startButton = document.createElement("input");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("value", "Start all countdowns!");
    startButton.onclick = function () {
        startCountdown();
        createPauseButton();
    };
    // add to the DOM, to the div called "inputTime"
    document.getElementById("inputTime").appendChild(inputMinutes);
    document.getElementById("inputTime").appendChild(startButton);
};