/**
 * Represents a coin object in the game.
 * @extends MovableObject
 */
class Coins extends MovableObject {
    /** @type {string[]} An array of image paths for the coin animation. */
    images = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /** @type {number} The width of the coin. */
    width = 100;

    /** @type {number} The height of the coin. */
    height = 100;

    /**
     * Creates an instance of Coins.
     * @param {number} x - The x-coordinate position of the coin.
     * @param {number} y - The y-coordinate position of the coin.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.animateCoins();
    }

    /**
     * Animates the coin by cycling through its images.
     */
    animateCoins() {
        setStoppableInterval(() => {
            this.playAnimation(this.images);
        }, 350);
    }
}
