/**
 * Represents a status bar in the game, extending from DrawableObject.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /** @type {number} The width of the status bar. */
    width = 160;

    /** @type {number} The height of the status bar. */
    height = 40;

    /** @type {number} The current percentage value of the status bar. */
    percentage;

    /** @type {string[]} An array of image paths used to display different status bar levels. */
    images;

    /**
     * Creates an instance of StatusBar.
     * @param {number} x - The x-coordinate position of the status bar.
     * @param {number} y - The y-coordinate position of the status bar.
     * @param {number} percentage - The initial percentage value of the status bar (0 to 100).
     * @param {string[]} images - An array of image paths representing different levels of the status bar.
     */
    constructor(x, y, percentage, images) {
        super();
        this.x = x;
        this.y = y;
        this.percentage = percentage;
        this.images = images;
        this.loadImages(images);
        this.setPercentage(percentage);
    }

    /**
     * Sets the percentage value of the status bar and updates its displayed image.
     * @param {number} percentage - The new percentage value to set (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image in the images array based on the current percentage.
     * @returns {number} The index of the image to use based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
