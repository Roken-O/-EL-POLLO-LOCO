class WinOrLost extends DrawableObject{
    img;
    constructor(img) {
        this.img=img;
        super().loadImage(img);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
        
    }
}