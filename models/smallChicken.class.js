

class SmallChicken extends MovableObject {
    width = 60;
    height = 60;
    y = 370;
    
    images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 7;
        this.animate();
    }

    animate(){
        setStoppableInterval(() => {
            if (this.world.character.x > this.x) {
                this.moveRight();
                this.otherDirection = true;
                this.playAnimation(this.images_Walking);
            } else if(this.world.character.x < this.x){
                this.moveLeft();
                this.otherDirection = false;
                this.playAnimation(this.images_Walking);
            }else{
                this.playAnimation(this.images_first_contact); 
            }
        }, 200);
        // setStoppableInterval(()=> {
        //     this.playAnimation(this.images_Walking);
        // }, 200);
    }

}