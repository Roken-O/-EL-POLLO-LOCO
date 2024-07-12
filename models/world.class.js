class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collect_coins = 0;
    collect_bottles = 0;


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    status_bar = new StatusBar(5, 0, 100, [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'// 5
    ]);

    status_bar_coin = new StatusBar(5, 33, 0, [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]);

    status_bar_bottles = new StatusBar(5, 66, 0, [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'

    ]);

    status_bar_endboss = new StatusBar(550, 0, 100, [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]);

    throwableObjects = [];

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
        this.level.endbosss.world = this;
    }

    run() {
        setInterval(() => {
            //check collisions
            this.checkCollisions();
            this.checkCollisionsWithEndBoss();
            this.checkThrowObjects();
            this.CheckCharacterAboveChicken();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
        }, 200);
    }

    // checkCollisionsWithEndboss() {
    //     if (this.character.isColliding(this.level.endbosss)) {
    //         this.character.hit();
    //         this.character.isHurt();
    //         this.status_bar.setPercentage(this.character.energy, this.status_bar.images);
    //     }
    // }

    CheckCharacterAboveChicken() {
        this.level.enemies.forEach((enemy, index) => {
            // if(this.character.y < 140) { 
            // console.log('pepe is above');
            if (this.character.isAboveGround()) {
                if (this.character.isColliding(enemy)) {

                    // if (this.character.isHurt()) {

                    console.log('chicken dead!');
                    this.level.enemies.splice(index, 1);
                    // }
                }
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisionsWithEndBoss() {
        if(this.character.isColliding(this.level.endbosss)){
            this.character.hit();
            console.log('Energy:' + this.character.energy);
            this.status_bar.setPercentage(this.character.energy, this.status_bar.images);
        }
    }

    checkCollisions() {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.status_bar.setPercentage(this.character.energy, this.status_bar.images);
                }
            }); 
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (this.collect_coins < 100) {
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
                    this.collect_bottles += 10;
                    this.status_bar_bottles.setPercentage(this.collect_bottles, this.status_bar_bottles.images);
                    console.log(this.collect_bottles);
                    this.level.bottles.splice(index, 1);
                }
            }
        });
    }


    // checkCharacterX(){
    //     // return this.character.x > 2200;
    //     if(this.character.x > 2200){
    //     console.log('first mate!');
    //     return true;
    //     }
    // }
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
        this.addToMap(this.level.endbosss);
        this.addObjectsToMap(this.level.coins);

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
        mo.drawFrame(this.ctx);

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