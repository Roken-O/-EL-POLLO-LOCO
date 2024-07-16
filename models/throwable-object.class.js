class ThrowableObject extends MovableObject {
    hasCollided;

    images_bottle_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    images_bottle_colliding =[
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.images_bottle_rotation);
        this.loadImages(this.images_bottle_colliding);
        this.hasCollided = false;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.direction = direction;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        setStoppableInterval(() => {
            this.playAnimation(this.images_bottle_rotation);
            if(this.hasCollided){
                this.playAnimation(this.images_bottle_colliding);
            }
            if (this.direction) {
                this.x -= 5;
            }
            else {
                this.x += 5;
            }
        }, 25);

      
    }

}