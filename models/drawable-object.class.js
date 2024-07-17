/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    /** @type {number} The x-coordinate position of the drawable object. */
    x = 120;

    /** @type {number} The y-coordinate position of the drawable object. */
    y = 290;

    /** @type {HTMLImageElement} The image element for the drawable object. */
    img;

    /** @type {number} The height of the drawable object. */
    height = 150;

    /** @type {number} The width of the drawable object. */
    width = 100;

    /** @type {Object<string, HTMLImageElement>} A cache of loaded images. */
    imageCache = {};

    /** @type {number} The index of the current image in an animation sequence. */
    currentImage = 0;

    /** @type {number} The percentage of completion or progress for the drawable object. */
    percentage;

    /**
     * Loads a single image.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr - An array of paths to the images.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
