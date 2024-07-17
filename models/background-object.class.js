/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
      /** @type {number} The width of the background object. */
      width = 720;

      /** @type {number} The height of the background object. */
      height = 480;
  
      /**
       * Creates an instance of BackgroundObject.
       * @param {string} imgPath - The path to the image for the background object.
       * @param {number} x - The x-coordinate position of the background object.
       */
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;
        this.y = 480 - this.height;
    }
}