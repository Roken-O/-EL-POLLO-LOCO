class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    endbosss;
    level_end_x = 2800;

    constructor(enemies, clouds, coins, bottles, endbosss, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.endbosss = endbosss;
        this.backgroundObjects = backgroundObjects;
    }

}