/**
 * Represents a movable object in the game, extending {@link DrawableObject}.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** @type {number} The speed of the movable object. */
    speed = 0.15;

    /** @type {boolean} Indicates if the object is moving in the opposite direction. */
    otherDirection = false;

    /** @type {number} The vertical speed of the movable object. */
    speedY = 0;

    /** @type {number} The acceleration of the movable object when applying gravity. */
    acceleration = 2.5;

    /** @type {number} The energy level of the movable object. */
    energy = 100;

    /** @type {number} The timestamp when the object was last hit. */
    lastHit = 0;

    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the movable object, making it fall towards the ground.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the movable object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if there is a collision, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Decreases the energy level of the movable object when hit.
     * If energy drops below 0, sets it to 0. Updates the last hit timestamp.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is still hurt (within 0.8 seconds of last hit).
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 0.8;
    }

    /**
     * Checks if the movable object is dead (energy is zero).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Initiates a jump action for the movable object.
     * @returns {number} The vertical speed applied to the jump.
     */
    jump() {
        return this.speedY = 30;
    }

    /**
     * Moves the movable object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the movable object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation sequence for the movable object.
     * @param {string[]} images - Array of image paths for the animation sequence.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
