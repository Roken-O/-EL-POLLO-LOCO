let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameRuning = true;
let isInfoWindowOpen = false;
let game_sound = new Audio('audio/gameSound.mp3');
let game_sound_win = new Audio('audio/gameWin.mp3');
let game_over_sound = new Audio('audio/gameover.mp3');

function init() {
    game_sound.play();
    gameRuning = true;
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('overlay').classList.add('d-none');

    canvas.classList.remove('d-none');
    console.log('My World is', world['character']);
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

function toggleInfoWindow() {
    if (!isInfoWindowOpen) {
        showInfoWindow();
    } else {
        hideInfoWindow();
    }
}

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

function hideInfoWindow() {
    setTimeout(() => {
        document.getElementById('popup-infoWindow-container').classList.remove('animate-popup-infoWindow-container');
        setTimeout(() => {
            document.getElementById('infoWindow').style.display = 'none';
        }, 200);
    }, 200);
    isInfoWindowOpen = false;
}

function checkButtunsInfoInnerHTML(){
    if (window.innerWidth < 933) {
        document.getElementById('jumpBtnContainer').classList.remove('spacebar');
        document.getElementById('throwBtn').innerHTML = '➶';
        document.getElementById('leftBtn').innerHTML = '◄';
        document.getElementById('rightBtn').innerHTML = '►';
        document.getElementById('jumpBtn').innerHTML = '▲';
    }
}

function doNotClose(event) {
    event.stopPropagation();
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function gameOver() {
    let overlay = document.getElementById('overlay');
    gameEnded(overlay);
    game_over_sound.play();
    overlay.style.backgroundImage = "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')," + returnImage();
    overlay.style.backgroundSize = "100% 100%, 40% 80%, 40% 30%, 20% 20%, 50% 50%, 100% 100%, 100% 100%";
    overlay.style.backgroundPosition = "center center, bottom left, bottom center, top center, center right";
}

function youWin() {
    let overlay = document.getElementById('overlay');
    gameEnded(overlay);
    game_sound_win.play();
    overlay.style.backgroundImage = "url('img/9_intro_outro_screens/win/won_1.png')," + returnImage();
    overlay.style.backgroundSize = "40% 20%, 40% 80%, 40% 30%, 20% 20%, 50% 50%, 100% 100%, 100% 100%";


    document.getElementById('playGame').innerHTML = 'Play Game again';
}

function gameEnded(overlay) {
    game_sound.pause();
    stopGame();
    document.getElementById('canvas').classList.add('d-none');
    overlay.classList.remove('d-none');
    overlay.style.backgroundRepeat = "no-repeat";
    overlay.style.backgroundPosition = "center center, bottom left, bottom center, top center, top right";
    document.getElementById('playGame').innerHTML = 'Play Game again';
}

function returnImage() {
    return "url('img/2_character_pepe/3_jump/J-35.png'), " +
        "url('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'), " +
        "url('img/8_coin/coin_1.png'), " +
        "url('img/8_coin/coin_1.png'), " +
        "url('img/5_background/layers/4_clouds/1.png')," +
        "url('img/5_background/layers/air.png')";
}

function toggleFullscreen() {
    let maincontainer = document.getElementById("maincontainer");

    if (!document.fullscreenElement) {
        openFullscreen(maincontainer);
    } else {
        closeFullscreen();
    }
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
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

function checkOrientation() {
    let landscapeOverlay = document.getElementById('landscapeOverlay');
    if (window.innerWidth < 933 && window.innerHeight > window.innerWidth) {
        // Mobile und im Hochformat
        landscapeOverlay.style.display = 'flex';
    } else {
        // Desktop oder mobiles Gerät im Querformat
        landscapeOverlay.style.display = 'none';
    }
}