class StatusBar extends DrawableObject{
    images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'// 5
    ];

    images_bottle =[
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    images_icons =[
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 100;

    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.images);
        this.loadImages(this.images_bottle);
        this.loadImages(this.images_icons);
        this.setPercentage(100);
    }

    // setPercentage(50)
    setPercentage(percentage){
        this.percentage = percentage; // => 0 .... 5
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if (this.percentage > 80){
            return 4;
        }else if (this.percentage > 60){
            return 3;
        }else if (this.percentage > 40){
            return 2;
        }else if (this.percentage > 20){
            return 1;
        }else {
            return 0;
        }
    }

}