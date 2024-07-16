class Bottles extends MovableObject {
    images = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    width = 80;
    height = 80;
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.animateCoins();
    }

    animateCoins() {
        setStoppableInterval(() => {
            if (this.y < 360) {
                this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
            }
            else {
                this.playAnimation(this.images);
            }
        }, 350);
    }
}