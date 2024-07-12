class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 370;
    
    images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    image_dead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.loadImages(this.images_Walking);
        this.loadImage(this.image_dead);
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
     
        setInterval(()=> {
            this.playAnimation(this.images_Walking);
        }, 200);
    }
}