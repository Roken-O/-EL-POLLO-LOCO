class DrawableObject {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    percentage;


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id = 'image' src>
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        // try{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // }catch(e){
        //     console.warn('Error loading image!', e);
        //     console.log('couldnt load image', this.img.src)
        // }
    }

    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof Endboss ){
    //         ctx.beginPath();
    //         ctx.lineWidth = "4";
    //         ctx.strokeStyle = "blue";
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

}