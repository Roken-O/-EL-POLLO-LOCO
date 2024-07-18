/**
 * Represents an end boss character in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /** @type {number} The width of the end boss. */
    width = 250;

    /** @type {number} The height of the end boss. */
    height = 400;

    /** @type {number} The initial x-coordinate position of the end boss. */
    x = 2500;

    /** @type {number} The initial y-coordinate position of the end boss. */
    y = 55;

    /** @type {number} The energy level of the end boss. */
    energy = 100;

    /** @type {boolean} Indicates whether the end boss had first contact with the character. */
    hadFirstContact = false;

    /** @type {World} The world object in which the end boss exists. */
    world;

    /** @type {string[]} Array of paths to images for the first contact animation. */
    images_first_contact = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /** @type {string[]} Array of paths to images for the walking animation. */
    images_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} Array of paths to images for the hurt animation. */
    images_hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} Array of paths to images for the dead animation. */
    images_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of Endboss.
     * Loads initial images and sets speed.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.images_first_contact);
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.speed = 30;
        this.animate();
    }

    /**
     * Initiates the animation loop for the end boss.
     * Animates walking and handles first contact with the character.
     */
    animate() {
        let i = 0;
        setStoppableInterval(() => {
            this.playAnimation(this.images_Walking);
            if (i < 10) {
                this.playAnimation(this.images_first_contact);
            } else {
                if (this.hadFirstContact) {
                    this.checkEndbossAnimation();
                }
            }
            i++;

            if (this.checkFirstContact()) {
                this.firstContact(i);
            }
        }, 200);
    }

    /**
     * Checks if the character has made first contact with the end boss.
     * @returns {boolean} True if the character has made first contact; otherwise, false.
     */
    checkFirstContact() {
        return this.world.character.x > 2000 && !this.hadFirstContact;
    }

    /**
     * Handles actions upon first contact between the character and the end boss.
     * @param {number} i - Current iteration count.
     */
    firstContact(i) {
        i = 0;
        this.hadFirstContact = true;
    }

    /**
     * Checks and performs the appropriate animation based on the character's position relative to the end boss.
     */
    checkEndbossAnimation() {
        if (this.world.character.x > this.x) {
            this.moveRight();
            this.otherDirection = true;
        } else if (this.isHurt()) {
            this.playAnimation(this.images_hurt);
        } else if (this.isDead()) {
            this.playAnimation(this.images_dead);
        } else if (this.world.character.x <= this.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (this.world.character.x == this.x) {
            this.moveRight();
            this.otherDirection = true;
            this.playAnimation(this.images_first_contact);
        }
    }
}
