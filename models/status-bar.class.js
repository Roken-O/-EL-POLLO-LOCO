class StatusBar extends DrawableObject {
    width = 160;
    height = 40;
    percentage;
    images;

    constructor(x, y, percentage, images) {
        super();
        this.x = x;
        this.y = y;
        this.percentage = percentage;
        this.images = images;
        this.loadImages(images);
        this.setPercentage(percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .... 5
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}