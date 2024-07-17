/**
 * Represents a cloud object in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} The y-coordinate position of the cloud. */
    y = 20;

    /** @type {number} The width of the cloud. */
    width = 500;

    /** @type {number} The height of the cloud. */
    height = 250;

    /**
     * Creates an instance of Cloud.
     * @param {number} x - The x-coordinate position of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x + Math.random() * 300;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left at a set interval.
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
