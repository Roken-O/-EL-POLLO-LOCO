/**
 * Represents a bottle object in the game.
 * @extends MovableObject
 */
class Bottles extends MovableObject {
    /**
     * The array of image paths for the bottle animations.
     * @type {string[]}
     */
    images = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /** @type {number} The width of the bottle object. */
    width = 80;

    /** @type {number} The height of the bottle object. */
    height = 80;

    /**
     * Creates an instance of Bottles.
     * @param {number} x - The x-coordinate position of the bottle object.
     * @param {number} y - The y-coordinate position of the bottle object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.animateCoins();
    }

    /**
     * Animates the bottle object by changing its image at intervals.
     */
    animateCoins() {
        setStoppableInterval(() => {
            if (this.y < 360) {
                this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
            } else {
                this.playAnimation(this.images);
            }
        }, 350);
    }
}
