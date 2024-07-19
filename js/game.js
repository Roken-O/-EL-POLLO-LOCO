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

/**
 * Event listener for keydown events to update the keyboard state.
 * 
 * This listener sets the corresponding properties of the keyboard object 
 * to true or false based on the keyCode of the pressed key.
 * 
 * @param {KeyboardEvent} e - The keyboard event object.
 */
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

/**
 * Adds touch event listeners to buttons for controlling the keyboard state.
 * 
 * The following buttons are configured:
 * - btnLeft: Sets keyboard.LEFT to true on touchstart, false on touchend.
 * - btnRight: Sets keyboard.RIGHT to true on touchstart, false on touchend.
 * - btnThrow: Sets keyboard.D to true on touchstart, false on touchend.
 * - btnJump: Sets keyboard.SPACE to true on touchstart, false on touchend.
 */
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
    isInfoWindowOpen ? hideInfoWindow() : showInfoWindow();
}

/**
 * Displays the information window with game controls.
 */
function showInfoWindow() {
    let infoWindow = document.getElementById('infoWindow');
    infoWindow.style.display = 'flex';
    infoWindow.innerHTML = infoWindowHTML();
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
            InfoWindowDisplayNone();
        }, 200);
        isInfoWindowOpen = false;
    } else if (isImprintWindowOpen) {
        setTimeout(() => {
            document.getElementById('popup-imprintWindow-container').classList.remove('animate-popup-infoWindow-container');
            InfoWindowDisplayNone();
        }, 200);
        isImprintWindowOpen = false;
    }
}

/**
 * Hides the information window after a delay.
 * 
 * This function sets a timeout to change the display property of the 
 * information window element to 'none' after 200 milliseconds, effectively 
 * hiding the window.
 */
function InfoWindowDisplayNone() {
    setTimeout(() => {
        document.getElementById('infoWindow').style.display = 'none';
    }, 200);
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
 * Resizes the canvas and overlay elements based on the fullscreen status.
 * 
 * If the application is not in fullscreen mode, the canvas and overlay
 * will be set to nearly full screen size. Otherwise, they will be set
 * to a fixed smaller size.
 */
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

/**
 * Toggles the fullscreen mode for the canvas and overlay container.
 * 
 * If the document is not in fullscreen mode, it enters fullscreen and resizes
 * the canvas and overlay to nearly full screen size. If the document is
 * already in fullscreen mode, it exits fullscreen and resizes the canvas
 * and overlay to a fixed smaller size.
 */
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
window.addEventListener('resize', checkovelayAndCanvasSize);
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

/**
 * Adjusts the size of the overlay and canvas based on the window width and fullscreen state.
 * 
 * This function sets the height and width of the canvas and overlay elements based on
 * the current window width and the fullscreen mode. It ensures that the canvas and overlay
 * are sized appropriately to fit different screen sizes and orientations.
 * 
 * - If the window width is less than 933 pixels and fullscreen mode is not active:
 *   - The canvas will stretch to 100% of the viewport's height and width.
 *   - The overlay will adjust its height and width to `auto`.
 * 
 * - If the window width is greater than 933 pixels and fullscreen mode is not active:
 *   - Both the canvas and overlay will have a fixed height of 480 pixels and a width of 720 pixels.
 * 
 * This function is typically used to ensure that the game's canvas and overlay fit well on different
 * screen sizes and orientations, providing a consistent user experience.
 * 
 * @returns {void}
 */
function checkovelayAndCanvasSize() {
    let overlay = document.getElementById('overlay');
    canvas = document.getElementById('canvas');
    if (window.innerWidth < 933 && !checkFullscreen) {
        canvas.style.height= '100%';
        overlay.style.height = 'auto';
        canvas.style.width = '100%';
        overlay.style.width = 'auto';
    } else if (window.innerWidth > 933 && !checkFullscreen) {
        canvas.style.height = overlay.style.height = '480px';
        canvas.style.width = overlay.style.width = '720px';
    }
}
/**
 * Toggles the display of the imprint window.
 * 
 * If the imprint window is not currently open, this function displays it
 * with the imprint content and applies animation. If the imprint window is
 * already open, it hides the window using the `hideInfoWindow` function.
 */
function toggleImprint() {
    if (!isImprintWindowOpen) {
        let infoWindow = document.getElementById('infoWindow');
        infoWindow.style.display = 'flex';
        infoWindow.innerHTML = imprintHTML();
        setTimeout(() => {
            document.getElementById('popup-imprintWindow-container').classList.add('animate-popup-infoWindow-container');
        }, 200);
        isImprintWindowOpen = true;
    } else {
        hideInfoWindow();
    }
}

/**
 * Toggles the mute state of the game sounds.
 * 
 * If the game is currently not muted, this function mutes the game sounds,
 * updates the sound icon to indicate the muted state, and updates the 
 * `isMuted` flag. If the game is currently muted, it unmutes the game sounds,
 * updates the sound icon to indicate the unmuted state, and updates the 
 * `isMuted` flag. It also calls `world.toggleMuteWorld` to update the world 
 * sound state based on the new mute status.
 */

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