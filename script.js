// two global variables
var secondsRemaining;
var intervalHandle;
var running;

function resetPage() {
    document.getElementById("inputTime").style.display = "block";
}

function tick() {
    if (running === true) {
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
            alert("Ding, you are free!");
            clearInterval(intervalHandle);
            resetPage();
        }
        // subtract from seconds remaining
        secondsRemaining--;
    }
}

function startCountdown() {
    // get contents of the "minutes" text box
    var minutes = document.getElementById("minutes").value;
    // check if not a number
    if (isNaN(minutes)) {
        alert("Please enter only a number!");
        return;
    }
    // how many seconds?
    secondsRemaining =  minutes * 60;
    // every second, call the "tick" function
    intervalHandle = setInterval(tick, 1000);
    // set running to true
    running = true;
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
        running = false;
        document.getElementById("resumeTime").style.display = "block";
    };
}

function createResumeButton() {
    var resumeButton = document.createElement("input");
    resumeButton.setAttribute("type", "button");
    resumeButton.setAttribute("value", "Release the Countdown");
    document.getElementById("resumeTime").appendChild(resumeButton);
    resumeButton.onclick = function() {
        running = true;

    };
}

function createHaterLink() {
    // show hater link after 5 seconds
    setTimeout(function() {
        // create hater link, set href and inner html
        var haterButton = document.createElement("a");
        haterButton.setAttribute("href", "#" );
        haterButton.innerHTML= "also, I hate countdowns";

        // choose link randomly from array
        haterButton.onclick = function () {

            var haterLinks = [
                'https://medium.com/message/just-checking-in-d2b5540f0064',
                'http://wormaesthetics.tumblr.com/post/111364233097/a-dialogue-on-marginal-geology-miguel-fernandez',
                'http://water.usgs.gov/data/',
                'http://techblog.netflix.com/2015/02/a-microscope-on-microservices.html'
            ];

            var max = haterLinks.length - 1;
            var min = 0;
            var element = Math.floor(Math.random()*(max-min+1)+min);

            haterButton.href = haterLinks[element];

            document.getElementById("iHateCountdowns").style.display = "block";
        };

    // append haterlink to div
    document.getElementById("iHateCountdowns").appendChild(haterButton);
    }, 5000);
}

// as soon as the page is loaded...
window.onload =  function () {
    // set running to false
    running = false;
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
        createResumeButton();
        createHaterLink();
    };
    // add to the DOM, to the div called "inputTime"
    document.getElementById("inputTime").appendChild(inputMinutes);
    document.getElementById("inputTime").appendChild(startButton);
};


