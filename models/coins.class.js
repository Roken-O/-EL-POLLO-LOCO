class Coins extends MovableObject {
    images = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    width = 100;
    height = 100;
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.animateCoins();
    }

    animateCoins() {
        setStoppableInterval(() => {
            this.playAnimation(this.images);
        }, 350);
    }
}