class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    endboss;
    level_end_x = 2800;

    constructor(enemies, clouds, coins, bottles, endboss, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
    }
}