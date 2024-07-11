class Coins extends MovableObject {
    images = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    width = 80;
    height = 80;
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.images);
        }, 350);
    }
}