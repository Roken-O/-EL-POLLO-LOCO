class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collect_coins = 0;
    collect_bottles = 0;
    coin_sound = new Audio('audio/coin.mp3');
    bottleCollect_sound = new Audio('audio/bottlecollect.mp3');
    chickenDead_sound = new Audio('audio/chickenDead.mp3');
    win_or_lost =  new WinOrLost();
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    status_bar = new StatusBar(8, 5, 100, [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'// 5
    ]);

    status_bar_coin = new StatusBar(8, 38, 0, [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]);

    status_bar_bottles = new StatusBar(8, 71, 0, [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'

    ]);

    status_bar_endboss = new StatusBar(547, 5, 100, [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]);

    throwableObjects = [];
    chicken_dead = false;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }

    run() {
        setInterval(() => {
            //check collisions
            this.checkCharacterAndEndbossEnergy();
            this.CheckCharacterAboveChicken();
            this.checkCollisions();
            this.checkCollisionsWithEndBoss();
            this.checkThrowObjects();
            this.checkBottelCollisionWithEndBoss()
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
        }, 200);
    }

    checkCharacterAndEndbossEnergy(){
        if(this.character.energy == 0){
            this.gameOver();
        }else if(this.level.endboss.energy ==0){
            this.youWin();
        }
    }

    gameOver(){
        this.addToMap(this.win_or_lost);
    }

    CheckCharacterAboveChicken() {
        this.chicken_dead = false;
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.speedY < 0) {
                    // console.log('speedyY:' + this.character.speedY);
                    this.chickenDead_sound.play();
                    this.character.speedY = 0;
                    this.chicken_dead = true;

                    // console.log('Energy:' + this.character.energy);
                    // console.log('chicken dead!');
                    this.level.enemies.splice(index, 1);
                }
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collect_bottles > 0) {
            let direction = this.character.otherDirection;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, direction);
            this.throwableObjects.push(bottle);
            this.collect_bottles -= 10;
            this.status_bar_bottles.setPercentage(this.collect_bottles, this.status_bar_bottles.images);
            this.checkBottelCollisionWithEndBoss();
        }
    }

    checkBottelCollisionWithEndBoss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.endboss)) {
                if (this.level.endboss.energy > 0) {
                    this.level.endboss.energy -= 15;
                    this.level.endboss.hit();
                    console.log(this.level.endboss.energy);
                    this.status_bar_endboss.setPercentage(this.level.endboss.energy, this.status_bar_endboss.images);
                } else {

                }
            }
        });
    }

    checkCollisionsWithEndBoss() {
        if (this.character.isColliding(this.level.endboss)) {
            this.character.energy -= 5;
            this.character.hit();
            // console.log('Energy:' + this.character.energy);
            this.status_bar.setPercentage(this.character.energy, this.status_bar.images);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.chicken_dead) {
                    this.character.hit();
                    this.status_bar.setPercentage(this.character.energy, this.status_bar.images);
                }
            }

        });
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (this.collect_coins < 100) {
                    this.coin_sound.play();
                    this.collect_coins += 5;
                    this.status_bar_coin.setPercentage(this.collect_coins, this.status_bar_coin.images);
                    // console.log(this.collect_coins);
                    this.level.coins.splice(index, 1);
                }
            }
        });
    }

    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.collect_bottles < 100) {
                    this.bottleCollect_sound.play();
                    this.collect_bottles += 10;
                    this.status_bar_bottles.setPercentage(this.collect_bottles, this.status_bar_bottles.images);
                    // console.log(this.collect_bottles);
                    this.level.bottles.splice(index, 1);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Back
        // --- space for fixed objects ---

        this.addToMap(this.status_bar);
        this.addToMap(this.status_bar_coin);
        this.addToMap(this.status_bar_bottles);
        this.addToMap(this.status_bar_endboss);

        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.level.endboss);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer aufgerufen 
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}