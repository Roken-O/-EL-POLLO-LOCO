/**
 * Represents a small chicken enemy in the game.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    /** @type {number} The width of the small chicken. */
    width = 60;

    /** @type {number} The height of the small chicken. */
    height = 60;

    /** @type {number} The initial y-coordinate position of the small chicken. */
    y = 370;

    /** @type {number} The vertical speed of the small chicken. */
    speedY = 5;

    /** @type {string[]} Array of paths to images of the chicken when dead. */
    image_dead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /** @type {string[]} Array of paths to images of the chicken when walking. */
    images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Creates an instance of SmallChicken.
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.loadImages(this.image_dead);
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 7;
        this.animate();
        this.applyGravity();
        this.startJumping();
    }

    /**
     * Starts the jumping behavior of the small chicken.
     */
    startJumping() {
        setStoppableInterval(() => {
            this.jump();
        }, 4000);
    }

    /**
     * Applies gravity to the small chicken's vertical movement.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the small chicken is above the ground level.
     * @returns {boolean} True if the small chicken is above the ground; otherwise, false.
     */
    isAboveGround() {
        return this.y < 370;
    }

    /**
     * Animates the small chicken's movement and actions.
     */
    animate() {
        setStoppableInterval(() => {
            if (this.world.character.x > this.x) {
                this.moveRight();
                this.otherDirection = true;
            } else if (this.world.character.x < this.x) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.world.character.x === this.x) {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 200);
        setStoppableInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.image_dead);
            } else {
                this.playAnimation(this.images_Walking);
            }
        }, 100);
    }
}
