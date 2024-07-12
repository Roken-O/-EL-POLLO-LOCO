class Endboss extends MovableObject {
    width = 250;
    height = 400;

    x = 2500;
    y = 55;

    images_first_contact = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    images_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    images_hurt =[
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    images_dead =[
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    energy = 100;
    hadFirstContact = false;
    world;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.images_first_contact);
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);

        this.speed = 30;

        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.images_first_contact);
            } else {
                if (this.hadFirstContact) {
                    if (this.world.character.x > this.x) {
                        this.moveRight();
                        this.otherDirection = true;
                        this.playAnimation(this.images_Walking);
                    }else if(this.isHurt()){
                        this.playAnimation(this.images_hurt);
                    }else if(this.isDead()){
                        this.playAnimation(this.images_dead);
                    } else if(this.world.character.x < this.x){
                        this.moveLeft();
                        this.otherDirection = false;
                        this.playAnimation(this.images_Walking);
                    }else{
                        this.playAnimation(this.images_first_contact); 
                    }
                }
            }
            i++;

            if (this.world.character.x > 2000 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                console.log('character x:' + this.world.character.x);
            }
        }, 200);
    }
}