const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud(0),
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500),
        new Cloud(3000),
        new Cloud(3500),
    ],
    [
        new Coins(300, 210),
        new Coins(450, 50),
        new Coins(400, 200),
        new Coins(500, 40),
        new Coins(700, 250),
        new Coins(800, 190),
        new Coins(900, 55),
        new Coins(1120, 44),
        new Coins(1000, 50),
        new Coins(1100, 200),
        new Coins(1200, 30),
        new Coins(1300, 55),
        new Coins(1400, 100),
        new Coins(1500, 40),
        new Coins(1750, 47),
        new Coins(1875, 20),
        new Coins(1935, 210),
        new Coins(2054, 180),
        new Coins(2154, 20),
        new Coins(2234, 200)
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)

    ]
);