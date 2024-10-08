/**
 * Represents a Chicken in the game.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /** @type {number} The width of the chicken. */
    width = 60;

    /** @type {number} The height of the chicken. */
    height = 60;

    /** @type {number} The y-coordinate position of the chicken. */
    y = 370;

    /** @type {boolean} Indicates whether the chicken is dead. */
    chicken_dead;

    /** @type {Object} The offset for the chicken's collision box. */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /** @type {string[]} The image paths for the dead chicken animation. */
    image_dead = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /** @type {string[]} The image paths for the walking chicken animation. */
    images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Creates an instance of Chicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.loadImages(this.image_dead);
        this.chicken_dead = false;
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 10;
        this.animate();
    }

    /**
     * Animates the chicken by setting intervals for movement and animation frames.
     */
    animate() {
        setStoppableInterval(() => {
           this.chickenMovemnet();
        }, 200);
        setStoppableInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.image_dead);
            } else {
                this.playAnimation(this.images_Walking);
            }
        }, 100);
    }

    /**
 * Updates the chicken's movement based on the character's position.
 * 
 * The chicken moves left or right depending on whether the character's 
 * x-coordinate is greater than or less than the chicken's x-coordinate. 
 * If the character's x-coordinate is equal to the chicken's, the chicken 
 * moves to the right. The `otherDirection` property is updated to reflect 
 * the chicken's current movement direction.
 */
    chickenMovemnet(){
        if (this.world.character.x > this.x) {
            this.moveRight();
            this.otherDirection = true;
        } else if (this.world.character.x < this.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (this.world.character.x == this.x) {
            this.moveRight();
            this.otherDirection = true;
        }
    }
}
