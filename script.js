// DOM consts
const bridge = document.getElementById('bridge');
const bridgePillarLeft = document.getElementById('bridgePillarLeft');
const bridgePillarRight = document.getElementById('bridgePillarRight');
const character = document.getElementById('character');
const popup = document.getElementById('popup');
const removePopup = document.getElementById('removePopup');
const cars = document.getElementsByClassName('car');
const scoreText = document.getElementById('scoreText');
const scoreShadow = document.getElementById('scoreShadow');
const highScoreText = document.getElementById('highScoreText');
const screenContainer = document.getElementById('screenContainer');
const carContainer = document.getElementById('carContainer');

const bridgeLeftPosition = bridge.getBoundingClientRect().left; //get the left position of bridge
const bridgeWidth = bridge.getBoundingClientRect().width; //get the width of bridge
const laneWidth = bridgeWidth/6; //get the width of a lane (bridgewidth divided by six)
const lanes = [0,laneWidth,laneWidth*2,laneWidth*3,laneWidth*4,laneWidth*5]; //the lanes position

let carPositions = []; //the car positions get placed here
let currentLane = 3; //starting position of the player
let currentScore = 0; //starting score

let carsDriving; 
let carsSpawning;
let scoreInterval;

let gameActive = false;

// if no high score exists, make the high score 0
if (!localStorage.highScore) {
    localStorage.highScore = '0';
} 


function removeFirstCars() {
    carContainer.removeChild(carContainer.firstChild);
    carContainer.removeChild(carContainer.firstChild);
    carContainer.removeChild(carContainer.firstChild);
    carPositions.shift();
    carPositions.shift();
    carPositions.shift();
}

function updateScoreText() {
    const score = currentScore.toFixed(0);
    scoreText.innerText = score;
    scoreShadow.innerText = score;
}
function updateHighScoreText() {
    highScoreText.innerText = 'High Score: ' + localStorage.highScore;
}

// remove all cars currently on screen
function removeCars() {
    const allCars = Array.from(cars);
    allCars.forEach(car => {
        car.remove();
    });
    carPositions = [];
}

removePopup.addEventListener('click', () => {
    const popupShade = document.getElementById('popupShade');

    updateScoreText();
    removeCars();
    currentLane = 3;
    updateLanePosition();
    if (window.innerWidth > 414) {
        carsDriving = setInterval(moveCarsForward,5);
    } else {
        carsDriving = setInterval(moveCarsForward,6);
    }
    carsSpawning = setInterval(spawnCarsRegularly,600);
    // setTimeout(() => {
    //     scoreInterval = setInterval(addScore,620);
    // }, 800);
    popup.style.display = 'none';
    popupShade.style.display = 'none';
    gameActive = true;
})

// change the speed of the cars
function changeCarSpeed(amount) {
    clearInterval(carsDriving);
    carsDriving = setInterval(moveCarsForward,amount);
}

function displayReplayPopup() {
    const popupText = document.getElementById('popupText');
    
    // popupText.innerText = 'Darn it!';
    removePopup.innerText = 'Try Again';
    popup.style.display = 'block';
}

// make sure the character fits between the bridge lines
function resizeCharacter() {
    const characterWidth = laneWidth/3;

    character.style.width = characterWidth + 'px';
}

// make sure the cars are the right size
function resizeCars() {
    const carWidth = laneWidth-laneWidth/6;

    const allCars = Array.from(cars);
    allCars.forEach(car => {
        car.style.width = carWidth + 'px';
        car.style.marginLeft = laneWidth/6;
    });
}

// align the pillars to be next to the bridge regardless of screen size
function alignBridgePillarsAndTunnel() {
    const bridgePosition = bridge.getBoundingClientRect();
    const tunnel = document.getElementById('tunnel');
    bridgePillarLeft.style.right = bridgePosition.right + 'px';
    bridgePillarRight.style.left = bridgePosition.right + 'px';
    tunnel.style.width = bridgePosition.width + 'px';
}

// spawn a car
// generate a color
function chooseCarColor() {
    const colorRoller = Math.floor(Math.random() * 5)
    return colorRoller;
}
// generate a lane
function chooseLane() {
    const laneRoller = Math.floor(Math.random() * lanes.length);

    return lanes[laneRoller];
}
// spawn the car
function spawnThreeCars() {
    const chosenCar1 = chooseCarColor(); // generate a color only once per car
    const chosenCar2 = chooseCarColor();
    const chosenCar3 = chooseCarColor();
    const chosenLane1 = chooseLane();
    const chosenLane2 = chooseLane();
    const chosenLane3 = chooseLane();
    if (chosenLane1 !== chosenLane2 && chosenLane2 !== chosenLane3 && chosenLane3 !== chosenLane1) {
    const car1 = document.createElement('img');
    const car2 = document.createElement('img');
    const car3 = document.createElement('img');
    car1.classList.add('car');
    car2.classList.add('car');
    car3.classList.add('car');
    if (chosenCar1 === 0) { //blue
        car1.setAttribute('src','cars/bluecar.svg')
    }
    if (chosenCar1 === 1) { //green
        car1.setAttribute('src','cars/greencar.svg')
    }
    if (chosenCar1 === 2) { //red
        car1.setAttribute('src','cars/redcar.svg')
    }
    if (chosenCar1 === 3) { //white
        car1.setAttribute('src','cars/whitecar.svg')
    }
    if (chosenCar1 === 4) { //yellow
        car1.setAttribute('src','cars/yellowcar.svg')
    }
    if (chosenCar2 === 0) { //blue
        car2.setAttribute('src','cars/bluecar.svg')
    }
    if (chosenCar2 === 1) { //green
        car2.setAttribute('src','cars/greencar.svg')
    }
    if (chosenCar2 === 2) { //red
        car2.setAttribute('src','cars/redcar.svg')
    }
    if (chosenCar2 === 3) { //white
        car2.setAttribute('src','cars/whitecar.svg')
    }
    if (chosenCar2 === 4) { //yellow
        car2.setAttribute('src','cars/yellowcar.svg')
    }
    if (chosenCar3 === 0) { //blue
        car3.setAttribute('src','cars/bluecar.svg')
    }
    if (chosenCar3 === 1) { //green
        car3.setAttribute('src','cars/greencar.svg')
    }
    if (chosenCar3 === 2) { //red
        car3.setAttribute('src','cars/redcar.svg')
    }
    if (chosenCar3 === 3) { //white
        car3.setAttribute('src','cars/whitecar.svg')
    }
    if (chosenCar3 === 4) { //yellow
        car3.setAttribute('src','cars/yellowcar.svg')
    }
    car1.style.left = bridgeLeftPosition + chosenLane1 + 'px';
    car2.style.left = bridgeLeftPosition + chosenLane2 + 'px';
    car3.style.left = bridgeLeftPosition + chosenLane3 + 'px';
    carContainer.appendChild(car1);
    carContainer.appendChild(car2);
    carContainer.appendChild(car3);
    }
    else {
        spawnThreeCars();
    }
}

// move character to desired lane 
function updateLanePosition() {
    character.style.left = bridgeLeftPosition + lanes[currentLane] + character.getBoundingClientRect().width + 'px';
}
function moveToLeftLane() {
    if (currentLane !== 0) {
        currentLane -= 1;
    }
    updateLanePosition();
}
function moveToRightLane() {
    if (currentLane !== 5) {
        currentLane += 1;
    }
    updateLanePosition();
}

// spawn three cars every half second unless the player is at the top
function spawnCarsRegularly() {
    if (character.getBoundingClientRect().top < 200 === false) {
        spawnThreeCars();
        carPositions.push(0);
        carPositions.push(0);
        carPositions.push(0);
        resizeCars();
    }
}

function failGame() {
    clearInterval(carsDriving);
    clearInterval(carsSpawning);
    clearInterval(scoreInterval);

    if (currentScore > localStorage.highScore) {
        localStorage.highScore = currentScore.toFixed(0);
    }
    updateHighScoreText();
    currentScore = 0;
    gameActive = false;
    displayReplayPopup();
}


// detect a collision between the character and the car
function detectCollision(car) {
    const characterPosition = character.getBoundingClientRect();
    const carPosition = car.getBoundingClientRect();
    if (characterPosition.bottom < carPosition.bottom && characterPosition.top > carPosition.top + carPosition.height/2.9) {
        addScore();
        if (currentScore >= 25 && currentScore <= 50) {
            if (window.innerWidth > 414) {
                changeCarSpeed(4);
            } else {
                changeCarSpeed(5.8);
            }
        }
        if (currentScore >= 50 && currentScore <= 75) {
            if (window.innerWidth > 414) {
                changeCarSpeed(3);
            }
            changeCarSpeed(5.6);
        }
        if (currentScore >= 75) {
            if (window.innerWidth > 414) {
                changeCarSpeed(2);
            }
            changeCarSpeed(5.4);
        }
    }
    if (characterPosition.top < carPosition.bottom && characterPosition.left > carPosition.left && characterPosition.right < carPosition.right && characterPosition.bottom > carPosition.top) {
        failGame();
    }
}

// make the cars move forward every 50ms
function moveCarsForward() {
    for (let i = 0; i < cars.length; i++) {
        if (window.innerWidth > 414) {
            carPositions[i] += 0.35;
        } else {
            carPositions[i] += 0.41;
        }
        cars[i].style.top = carPositions[i] + 'vh';
        detectCollision(cars[i]);
        if (cars[i].getBoundingClientRect().top > window.innerHeight) {
            removeFirstCars();
        }
    }
}

function addScore() {
    currentScore += 1/3;
    updateScoreText();
}

document.addEventListener('keydown', (e) => {
    if (gameActive) {
        if (e.key === 'ArrowRight' || e.key === 'd') {
            moveToRightLane();
        }
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            moveToLeftLane();
        }
    }
})

// taken from https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
let touchStartX = 0;
let touchEndX = 0;

function checkDirection() {
    if (gameActive) {
    if (touchEndX < touchStartX) { // left
        moveToLeftLane();
    }
    else if (touchEndX > touchStartX) {
        moveToRightLane();
    }
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
})
document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    checkDirection();
})

// on launch
resizeCharacter();
alignBridgePillarsAndTunnel();
updateLanePosition();
updateHighScoreText();

// since the position of many things are placed in relation to the bridge, it is important that it has loaded properly
function reloadOnZeroWidth() {
    if (bridgeWidth === 0) {
        location.reload();
    }
}
reloadOnZeroWidth();