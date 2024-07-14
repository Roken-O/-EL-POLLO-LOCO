let canvas;
let world;
let keyboard = new Keyboard();

let intervalIds = [];
let a = 0;

function init() {
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
    // console.log(e);
});

function showInfoWindow() {
    let infoWindow = document.getElementById('infoWindow');
    infoWindow.style.display = 'flex';
    infoWindow.innerHTML = /*html*/`
    <div id="popup-infoWindow-container" class="popup-infoWindow-container"  onclick="doNotClose(event)">
      <h2>Controls</h2>
      <div class="controlsContainer">
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span>D</span></div>
                    <div>Throw bottles</div>
            </div>
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span>></span></div>
                    <div>Move right</div>
            </div>
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span><</span></div>
                    <div>Move left</div>
            </div>
            <div class="sub-controlsContainer">
                    <div class="letterContainer spacebar"><span>spacebar</span></div>
                    <div>Jump</div>
            </div>
      </div>

   </div>`;

    setTimeout(() => {
        document.getElementById('popup-infoWindow-container').classList.add('animate-popup-infoWindow-container');
    }, 200);

}

function hideInfoWindow() {
    setTimeout(() => {
        document.getElementById('popup-infoWindow-container').classList.remove('animate-popup-infoWindow-container');
        setTimeout(() => {
            document.getElementById('infoWindow').style.display = 'none';
        }, 200);
    }, 200);
}

function doNotClose(event) {
    event.stopPropagation();
}

function setStoppableInterval(fn, time){
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame(){
    intervalIds.forEach(clearInterval);
    intervalIds =[];
}

function showFullscreen(){
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

function hideFullscreen(){
    let fullscreen = document.getElementById('fullscreen');
    closeFullscreen(fullscreen);
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
  function closeFullscreen(elem) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
}