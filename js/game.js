let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameRuning = true;
let isInfoWindowOpen = false;
let isImprintWindowOpen = false;
let checkFullscreen = false;
let isMuted = false;
let game_sound_win = new Audio('audio/gameWin.mp3');
let game_over_sound = new Audio('audio/gameover.mp3');

/**
* Initializes the game by setting up the canvas, level, and world.
* Also starts the game sound and hides the overlay.
*/
function init() {
    game_sound_win.pause();
    game_over_sound.pause();
    gameRuning = true;
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('overlay').classList.add('d-none');
    canvas.classList.remove('d-none');
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
});

document.getElementById('btnThrow').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});

document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
});

document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});

/**
 * Toggles the visibility of the information window.
 */
function toggleInfoWindow() {
    if (!isInfoWindowOpen) {
        showInfoWindow();
    } else {
        hideInfoWindow();
    }
}

/**
 * Displays the information window with game controls.
 */
function showInfoWindow() {
    let infoWindow = document.getElementById('infoWindow');
    infoWindow.style.display = 'flex';
    infoWindow.innerHTML = `
    <div id="popup-infoWindow-container" class="popup-infoWindow-container" onclick="doNotClose(event)">
      <h2>Controls</h2>
      <div class="controlsContainer">
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span id="throwBtn">D</span></div>
                    <div>Throw bottles</div>
            </div>
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span id="rightBtn">></span></div>
                    <div>Move right</div>
            </div>
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span id="leftBtn"><</span></div>
                    <div>Move left</div>
            </div>
            <div class="sub-controlsContainer">
                    <div id="jumpBtnContainer" class="letterContainer spacebar"><span id="jumpBtn">spacebar</span></div>
                    <div>Jump</div>
            </div>
      </div>

   </div>`;

    checkButtunsInfoInnerHTML();
    setTimeout(() => {
        document.getElementById('popup-infoWindow-container').classList.add('animate-popup-infoWindow-container');
    }, 200);
    isInfoWindowOpen = true;
}

/**
 * Hides the information window.
 */
function hideInfoWindow() {
    if (isInfoWindowOpen) {
        setTimeout(() => {
            document.getElementById('popup-infoWindow-container').classList.remove('animate-popup-infoWindow-container');
            setTimeout(() => {
                document.getElementById('infoWindow').style.display = 'none';
            }, 200);
        }, 200);
        isInfoWindowOpen = false;
    } else if (isImprintWindowOpen) {
        setTimeout(() => {
            document.getElementById('popup-imprintWindow-container').classList.remove('animate-popup-infoWindow-container');
            setTimeout(() => {
                document.getElementById('infoWindow').style.display = 'none';
            }, 200);
        }, 200);
        isImprintWindowOpen = false;
    }
}

/**
 * Adjusts the information window's button labels based on the window width.
 */
function checkButtunsInfoInnerHTML() {
    if (window.innerWidth < 933) {
        document.getElementById('jumpBtnContainer').classList.remove('spacebar');
        document.getElementById('throwBtn').innerHTML = '➶';
        document.getElementById('leftBtn').innerHTML = '◄';
        document.getElementById('rightBtn').innerHTML = '►';
        document.getElementById('jumpBtn').innerHTML = '▲';
    }
}

/**
 * Prevents the information window from closing when clicked inside.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Sets an interval that can be stopped later and stores the interval ID.
 * @param {Function} fn - The function to be executed.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Stops all intervals stored in the intervalIds array.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * Ends the game and displays the game over screen.
 */
function gameOver() {
    let overlay = document.getElementById('overlay');
    gameEnded(overlay);
    game_over_sound.play();
    overlay.style.backgroundImage = "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')," + returnImage();
    overlay.style.backgroundSize = "100% 100%, 40% 80%, 40% 30%, 20% 20%, 50% 50%, 100% 100%, 100% 100%";
    overlay.style.backgroundPosition = "center center, bottom left, bottom center, top center, center right";
}

/**
 * Ends the game and displays the victory screen.
 */
function youWin() {
    let overlay = document.getElementById('overlay');
    gameEnded(overlay);
    game_sound_win.play();
    overlay.style.backgroundImage = "url('img/9_intro_outro_screens/win/won_1.png')," + returnImage();
    overlay.style.backgroundSize = "40% 20%, 40% 80%, 40% 30%, 20% 20%, 50% 50%, 100% 100%, 100% 100%";
    document.getElementById('playGame').innerHTML = 'Play Game again';
}

/**
 * Ends the game and stops the game sound. Shows the end game overlay.
 * @param {HTMLElement} overlay - The overlay element to display.
 */
function gameEnded(overlay) {
    stopGame();
    document.getElementById('canvas').classList.add('d-none');
    overlay.classList.remove('d-none');
    overlay.style.backgroundRepeat = "no-repeat";
    overlay.style.backgroundPosition = "center center, bottom left, bottom center, top center, top right";
    document.getElementById('playGame').innerHTML = 'Play Game again';
}

/**
 * Returns the background image URLs for the end game overlay.
 * @returns {string} - The concatenated background image URLs.
 */
function returnImage() {
    return "url('img/2_character_pepe/3_jump/J-35.png'), " +
        "url('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'), " +
        "url('img/8_coin/coin_1.png'), " +
        "url('img/8_coin/coin_1.png'), " +
        "url('img/5_background/layers/4_clouds/1.png')," +
        "url('img/5_background/layers/air.png')";
}

function resizeCanvas() {
    let overlay = document.getElementById('overlay');
    canvas = document.getElementById('canvas');
    if (!checkFullscreen) {
        canvas.style.height = overlay.style.height = '97vh';
        canvas.style.width = overlay.style.width = '100vw';
    } else {
        canvas.style.height = overlay.style.height = '480px';
        canvas.style.width = overlay.style.width = '720px';
    }
}

function toggleFullscreen() {
    
    let canvasAndOverlayContainer = document.getElementById("canvasAndOverlayContainer");
    if (!document.fullscreenElement) {
        resizeCanvas();
        checkFullscreen = true;
        openFullscreen(canvasAndOverlayContainer);
    } else {
        resizeCanvas();
        checkFullscreen = false;
        closeFullscreen();
    }
}

/**
 * Opens fullscreen mode for the specified element.
 * @param {HTMLElement} elem - The element to display in fullscreen.
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/**
 * Closes fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

/**
 * Checks the device orientation and displays a rotation message if needed.
 */
function checkOrientation() {
    let rotation = document.getElementById('rotation');
    if (window.innerWidth < 933 && window.innerHeight + 70 > window.innerWidth) {
        rotation.style.display = 'flex';
    } else {
        rotation.style.display = 'none';
    }
}

function toggleImprint() {
    if (!isImprintWindowOpen) {
        let infoWindow = document.getElementById('infoWindow');
        infoWindow.style.display = 'flex';
        infoWindow.innerHTML = `<div id="popup-imprintWindow-container" class="popup-infoWindow-container popup-imprint">
   <h2> Impressum </h2>
   <h3> Angaben gemäß § 5 TMG:</h3>
    <span>Roken Othman<br>
    Langerfelder Str.76<br>
    42389 Wuppertal<br>
    Deutschland</span>
    <h3>Kontakt:</h3>
    <span>Telefon: 017643611217<br>
    E-Mail: roken.othman91@gmail.com </span>
    </div>
    `;

        setTimeout(() => {
            document.getElementById('popup-imprintWindow-container').classList.add('animate-popup-infoWindow-container');
        }, 200);

        isImprintWindowOpen = true;

    } else {
        hideInfoWindow();
    }
}

function toggleMute() {
    if (!isMuted) {
        document.getElementById('soundicon').src = 'img/soundlessicon.png';
        document.getElementById('mobile-soundicon').src = 'img/soundlessicon.png';
        game_sound_win.muted = true;
        game_over_sound.muted = true;
        isMuted = true;
    } else {
        document.getElementById('soundicon').src = 'img/soundicon.png';
        document.getElementById('mobile-soundicon').src = 'img/soundicon.png';
        game_sound_win.muted = false;
        game_over_sound.muted = false;
        isMuted = false;
    }
    world.toggleMuteWorld(isMuted);
}