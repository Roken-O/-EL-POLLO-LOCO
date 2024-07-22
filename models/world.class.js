/**
 * Represents the game world where characters, enemies, and objects interact.
 */
class World {
    /** @type {Character} The main character of the game. */
    character = new Character();

    /** @type {Level} The current level of the game. */
    level = level1;

    /** @type {HTMLCanvasElement} The canvas element where the game is rendered. */
    canvas;

    /** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas. */
    ctx;

    /** @type {Keyboard} The keyboard input handler for controlling the game. */
    keyboard;

    /** @type {number} The x-coordinate of the camera in the world. */
    camera_x = 0;

    /** @type {number} The number of collected coins in the game. */
    collect_coins = 0;

    /** @type {number} The number of collected bottles in the game. */
    collect_bottles = 0;

    /** @type {Audio} The sound played when the game is started. */
    game_sound = new Audio('audio/gameSound.mp3');

    /** @type {Audio} The sound played when a coin is collected. */
    coin_sound = new Audio('audio/coin.mp3');

    /** @type {Audio} The sound played when a bottle is collected. */
    bottleCollect_sound = new Audio('audio/bottlecollect.mp3');

    /** @type {Audio} The sound played when a chicken enemy is defeated. */
    chickenDead_sound = new Audio('audio/chickenDead.mp3');

    /** @type {Audio} The sound played when the end boss gets hurt. */
    endboss_hurt_sound = new Audio('audio/endbossHurt.mp3');

    /** @type {Audio} The sound played when the bottle collided. */
    glass_sound = new Audio('audio/glass.mp3');

    /** @type {ThrowableObject[]} The list of throwable objects in the game. */
    throwableObjects = [];

    /** @type {Object} The offset values for collision detection. */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /** 
     * @type {StatusBar} The status bar representing the health of the main character.
     * It uses images to show different levels of health.
     */
    status_bar = new StatusBar(8, 5, 100, [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' // 5
    ]);

    /** 
     * @type {StatusBar} The status bar representing the collected coins.
     * It uses images to show different levels of coin collection.
     */
    status_bar_coin = new StatusBar(8, 38, 0, [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]);

    /** 
     * @type {StatusBar} The status bar representing the collected bottles.
     * It uses images to show different levels of bottle collection.
     */
    status_bar_bottles = new StatusBar(8, 71, 0, [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]);

    /** 
     * @type {StatusBar} The status bar representing the health of the end boss.
     * It uses images to show different levels of boss health.
     */
    status_bar_endboss = new StatusBar(547, 5, 100, [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]);


    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Keyboard} keyboard - The keyboard input handler for controlling the game.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
        this.game_sound.play();
        this.toggleMuteWorld(isMuted);
    }

    /** Sets up the initial state of the world, including assigning references between objects. */
    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }

    /** Starts the game loop. */
    run() {
        setStoppableInterval(() => {
            this.CheckCharacterAboveChicken();
        }, 50);
        setStoppableInterval(() => {
            // this.CheckCharacterAboveChicken();
            this.checkCollisions();
            this.checkBottelCollisionWithEnemy();
            this.checkCollisionsWithEndBoss();
            this.checkThrowObjects();
            this.checkBottelCollisionWithEndBoss();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkCharacterAndEndbossEnergy();
        }, 200);
    }

    /** Checks if the character or the end boss has run out of energy to end the game. */
    checkCharacterAndEndbossEnergy() {
        if (this.character.energy === 0) {
            this.game_sound.pause();
            gameRuning = false;
            gameOver();
        } else if (this.level.endboss.energy === 0) {
            this.game_sound.pause();
            gameRuning = false;
            youWin();
        }
    }

    /** Checks if the character is above a chicken enemy and handles collision accordingly. */
    CheckCharacterAboveChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {    
                    if (this.character.speedY < -10) {
                    enemy.chicken_dead = true;
                    enemy.hit();
                    this.character.speedY = 30;
                    this.chickenDead_sound.play();
                    this.character.jump_sound.play();
                    setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                    this.keyboard.SPACE = false;
                    }, 500);
                }
            }
                if(this.character.y> 130){
                    this.character.y = 130;
                }
            }
        });
    }

    /** Checks if the character has thrown objects and manages the throwable objects in the game. */
    checkThrowObjects() {
        if (this.keyboard.D && this.collect_bottles > 0) {
            let direction = this.character.otherDirection;
            let bottle;
            if (direction) {
                bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100, direction);
            } else {
                bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100, direction);
            }
            this.throwableObjects.push(bottle);
            this.collect_bottles -= 10;
            this.status_bar_bottles.setPercentage(this.collect_bottles, this.status_bar_bottles.images);
            this.checkBottelCollisionWithEndBoss();
        }
    }

    /** Checks if thrown bottles collide with the end boss and manages the damage. */
    checkBottelCollisionWithEndBoss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.endboss) && !bottle.hasCollided) {
                bottle.hasCollided = true;
                if (this.level.endboss.energy > 0) {
                    this.level.endboss.energy -= 5;
                    this.level.endboss.hit();
                    this.endboss_hurt_sound.play();
                    this.glass_sound.play();
                    this.status_bar_endboss.setPercentage(this.level.endboss.energy, this.status_bar_endboss.images);
                }
            }
        });
    }

    /** Checks if thrown bottles collide with chicken enemies and manages the defeat of enemies. */
    checkBottelCollisionWithEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy, index) => {
                if (bottle.isColliding(enemy) && !bottle.hasCollided) {
                    bottle.hasCollided = true;
                    this.chickenDead_sound.play();
                    this.glass_sound.play();
                    this.character.speedY = 0;
                    enemy.chicken_dead = true;
                    enemy.hit();
                    setTimeout(() => {
                            this.level.enemies.splice(index, 1);
                    }, 500);
                }
            });
        });
    }

    /** Checks if the character collides with the end boss and manages the character's energy. */
    checkCollisionsWithEndBoss() {
        if (this.character.isColliding(this.level.endboss)) {
            this.character.energy -= 5;
            this.character.hit();
            this.status_bar.setPercentage(this.character.energy, this.status_bar.images);
        }
    }

    /** Checks if the character collides with enemies and manages the character's energy. */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.chicken_dead) {
                    this.character.hit();
                    this.status_bar.setPercentage(this.character.energy, this.status_bar.images);
            }
            if(enemy.chicken_dead){
                enemy.chicken_dead = false;
            }
        });
    }

    /** Checks if the character collides with coins and manages the coin collection. */
    checkCollisionsCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (this.collect_coins < 100) {
                    this.coin_sound.play();
                    this.collect_coins += 5;
                    this.status_bar_coin.setPercentage(this.collect_coins, this.status_bar_coin.images);
                    this.level.coins.splice(index, 1);
                }
            }
        });
    }

    /** Checks if the character collides with bottles and manages the bottle collection. */
    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.collect_bottles < 100) {
                    this.bottleCollect_sound.play();
                    this.collect_bottles += 10;
                    this.status_bar_bottles.setPercentage(this.collect_bottles, this.status_bar_bottles.images);
                    this.level.bottles.splice(index, 1);
                }
            }
        });
    }

    /** Renders the game world on the canvas. */
    draw() {
        if (gameRuning) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);

            this.ctx.translate(-this.camera_x, 0); // Reset translation

            // Draw fixed objects
            this.addToMap(this.status_bar);
            this.addToMap(this.status_bar_coin);
            this.addToMap(this.status_bar_bottles);
            this.addToMap(this.status_bar_endboss);

            this.ctx.translate(this.camera_x, 0); // Apply camera translation

            // Draw dynamic objects
            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addToMap(this.level.endboss);

            this.ctx.translate(-this.camera_x, 0); // Reset camera translation

            // Request the next animation frame
            let self = this;
            requestAnimationFrame(() => {
                self.draw();
            });
        }
    }

    /**
     * Adds multiple objects to be drawn on the canvas.
     * @param {Array} objects - The array of objects to be added to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to be drawn on the canvas.
     * @param {MovableObject} mo - The movable object to be drawn on the canvas.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for the given movable object.
     * @param {MovableObject} mo - The movable object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1; // Adjust x-coordinate for flipped image
    }

    /**
     * Restores the image to its original orientation after flipping.
     * @param {MovableObject} mo - The movable object whose image needs to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1; // Restore original x-coordinate
        this.ctx.restore();
    }

    toggleMuteWorld(isMuted) {
        this.game_sound.muted = isMuted;
        this.bottleCollect_sound.muted = isMuted;
        this.coin_sound.muted = isMuted;
        this.chickenDead_sound.muted = isMuted;
        this.character.hurt_sound.muted = isMuted;
        this.glass_sound.muted = isMuted;
        this.character.jump_sound.muted = isMuted;
        this.character.walking_sound.muted = isMuted;
        this.endboss_hurt_sound.muted = isMuted;
    }
}
