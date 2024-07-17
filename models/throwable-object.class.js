/**
 * Represents a throwable object in the game.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /** @type {boolean} Indicates if the object has collided. */
    hasCollided;

    /** @type {string[]} Array of paths to images for bottle rotation animation. */
    images_bottle_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /** @type {string[]} Array of paths to images for bottle colliding animation. */
    images_bottle_colliding = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The x-coordinate position of the object.
     * @param {number} y - The y-coordinate position of the object.
     * @param {boolean} direction - The direction of the throw (true for left, false for right).
     */
    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.images_bottle_rotation);
        this.loadImages(this.images_bottle_colliding);
        this.hasCollided = false;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.direction = direction;
        this.throw();
    }

    /**
     * Initiates the throwing animation and movement of the object.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setStoppableInterval(() => {
            this.playAnimation(this.images_bottle_rotation);
            if (this.hasCollided) {
                this.playAnimation(this.images_bottle_colliding);
            }
            if (this.direction) {
                this.x -= 5;
            } else {
                this.x += 5;
            }
        }, 25);
    }
}
