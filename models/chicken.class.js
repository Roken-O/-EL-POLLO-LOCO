class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 370;
    chicken_dead;
    offset = {
        top: 0,
        left: 10,
        right: 10,
        bottom: 0
    };
    image_dead = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.loadImages(this.image_dead);
        this.chicken_dead = false;
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 10;
        this.animate();
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