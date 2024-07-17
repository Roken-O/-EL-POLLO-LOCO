class Endboss extends MovableObject {
    width = 250;
    height = 400;
    x = 2500;
    y = 55;
    energy = 100;
    hadFirstContact = false;
    world;
    endboss_hurt_sound = new Audio('audio/endbossHurt.mp3');

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
        setStoppableInterval(() => {
            this.playAnimation(this.images_Walking);
            if (i < 10) {
                this.playAnimation(this.images_first_contact);
            } else {
                if (this.hadFirstContact) {
                    this.checkEndbossAnimation()
                }
            }
            i++;

            if (this.checkFirstContact()) {
                this.firstContsct(i);
            }
        }, 200);
    }

    checkFirstContact(){
        return this.world.character.x > 2000 && !this.hadFirstContact;
    }

    firstContsct(i){
        i = 0;
        this.hadFirstContact = true;
        console.log('character x:' + this.world.character.x);
    }

    checkEndbossAnimation(){
        if (this.world.character.x > this.x) {
            this.moveRight();
            this.otherDirection = true;
        }else if(this.isHurt()){
            this.endboss_hurt_sound.play();
            this.playAnimation(this.images_hurt);
        }else if(this.isDead()){
            this.playAnimation(this.images_dead);
        } else if(this.world.character.x <= this.x){
            this.moveLeft();
            this.otherDirection = false;
        }else if(this.world.character.x == this.x){
            this.moveRight(); 
            this.otherDirection = true;
            this.playAnimation(this.images_first_contact); 
        }
    }
}