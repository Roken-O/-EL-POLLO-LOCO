class ThrowableObject extends MovableObject {
    world;
    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
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
            if (this.direction) {
                this.x -= 8;
            }
            else {
                this.x += 8;
            }
        }, 25);
    }

}