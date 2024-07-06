let canvas;
let ctx;
let world = new World();

function init() {
    canvas = document.getElementById('canvas');
    // character.src = '../img/2_character_pepe/2_walk/W-21.png';
    ctx = canvas.getContext('2d');

    // console.log('My Character is', character); ما عاد يشتفل
    console.log('My World is', world['character']);
    
}