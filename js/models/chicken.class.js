class Chicken extends MovableObject{

    constructor(){
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');

        this.x = 200 + Math.random()*500;
    }

    eat(){

    }
}