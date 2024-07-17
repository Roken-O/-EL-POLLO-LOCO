let level1;
/**
 * Initializes the game level by creating and assigning various game elements
 * such as enemies, clouds, coins, bottles, the end boss, and background objects.
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken()
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
            new Coins(1120, 125),
            new Coins(1000, 140),
            new Coins(1100, 200),
            new Coins(1200, 60),
            new Coins(1300, 55),
            new Coins(1400, 100),
            new Coins(1500, 40),
            new Coins(1750, 47),
            new Coins(1875, 75),
            new Coins(1935, 210),
            new Coins(2054, 180),
            new Coins(2154, 75),
            new Coins(2234, 200)
        ],
        [
            new Bottles(450, 360),
            new Bottles(500, 360),
            new Bottles(550, 360),
            new Bottles(1600, 360),
            new Bottles(1635, 360),
            new Bottles(1200, 360),
            new Bottles(1875, 120),
            new Bottles(1300, 100),
            new Bottles(1200, 360),
            new Bottles(850, 360),
            new Bottles(2045, 100),
            new Bottles(1700, 360),
            new Bottles(1520, 360),
            new Bottles(2150, 360),
            new Bottles(2180, 360),
            new Bottles(2200, 360),
            new Bottles(317, 360),
            new Bottles(1300, 360)

        ],
        new Endboss(),
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
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4)

        ]
    );
}