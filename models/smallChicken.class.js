class SmallChicken extends MovableObject {
    width = 60;
    height = 60;
    y = 370;
    speedY = 5;
    image_dead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.loadImages(this.image_dead);
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 7;
        this.animate();
        this.applyGravity();
        this.startJumping();
    }

    startJumping() {
        setStoppableInterval(() => {
            this.jump();
        }, 4000);
    }

    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 370;
    }

    animate() {
        setStoppableInterval(() => {
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
        }, 200);
        setStoppableInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.image_dead);
            } else {
                this.playAnimation(this.images_Walking);
            }
        }, 100);
    }
}