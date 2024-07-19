/**
 * Represents a character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {number} The height of the character. */
    height = 300;

    /** @type {number} The width of the character. */
    width = 150;

    /** @type {number} The y-coordinate position of the character. */
    y = 130;

    /** @type {number} The speed at which the character moves. */
    speed = 5;

    /** @type {number} The timestamp of the last movement of the character. */
    lastMoveTime = 0;

    /** @type {World} The world in which the character exists. */
    world;

    /** @type {Audio} The sound played when the character is walking. */
    walking_sound = new Audio('audio/walking.mp3');

    /** @type {Audio} The sound played when the character jumps. */
    jump_sound = new Audio('audio/jump.mp3');

    /** @type {Audio} The sound played when the character is hurt. */
    hurt_sound = new Audio('audio/hurt.mp3');

    /** @type {Object} The offset values for collision detection. */
    offset = {
        top: 120,
        bottom: 15,
        left: 30,
        right: 40
    };

    /** @type {string[]} The array of image paths for walking animation. */
    images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} The array of image paths for jumping animation. */
    images_jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /** @type {string[]} The array of image paths for dead animation. */
    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /** @type {string[]} The array of image paths for hurt animation. */
    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /** @type {string[]} The array of image paths for idle animation. */
    images_idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /** @type {string[]} The array of image paths for sleeping animation. */
    images_sleeping = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Creates an instance of Character.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_sleeping);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates the character's animation loop.
     */
    animate() {
        setStoppableInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.world.level.level_end_x > this.x) {
                this.moveRightCharacter();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeftCharacter();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jumpCharacter();
            }
            this.world.camera_x = -this.x + 200;
        }, 1000 / 60);
        this.playAnimationCharacter();
    }

    /**
  * Moves the character to the right, sets the direction, and plays the walking sound.
  * Also updates the last movement time.
  */
    moveRightCharacter() {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        this.lastMoveTime = new Date().getTime();
    }

    /**
     * Moves the character to the left, sets the direction, and plays the walking sound.
     * Also updates the last movement time.
     */
    moveLeftCharacter() {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        this.lastMoveTime = new Date().getTime();
    }

    /**
     * Makes the character jump and plays the jump sound.
     * Also updates the last movement time.
     */
    jumpCharacter() {
        this.jump();
        this.jump_sound.play();
        this.lastMoveTime = new Date().getTime();
    }

    /**
     * Plays the appropriate animation based on the character's state.
     * The animation is checked and updated at regular intervals.
     */
    playAnimationCharacter() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.images_dead);
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);
                this.hurt_sound.play();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.images_jumping);
            } else if (this.isIdle()) {
                this.playIdleOrSleepingAnimation();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.images_Walking);
            }else if(this.world.keyboard.D){
                this.lastMoveTime = new Date().getTime();
                this.playAnimation(this.images_idle);
            }
        }, 50);
    }

    /**
     * Checks if the character is idle.
     * @returns {boolean} True if the character is idle; false otherwise.
     */
    isIdle() {
        return !this.world.keyboard.SPACE &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.D &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.DOWN;
    }

    /**
     * Plays the idle or sleeping animation based on the character's activity.
     */
    playIdleOrSleepingAnimation() {
        let timeSinceLastMove = new Date().getTime() - this.lastMoveTime;
        if (timeSinceLastMove < 2000) {
            this.playAnimation(this.images_idle);
        }else {
            this.playAnimation(this.images_sleeping);
        }
    }
}
