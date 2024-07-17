/**
 * Represents a level in the game.
 */
class Level {
    /** @type {Array<Object>} The enemies in the level. */
    enemies;

    /** @type {Array<Object>} The clouds in the level. */
    clouds;

    /** @type {Array<Object>} The background objects in the level. */
    backgroundObjects;

    /** @type {Array<Object>} The coins in the level. */
    coins;

    /** @type {Array<Object>} The bottles in the level. */
    bottles;

    /** @type {Object} The end boss of the level. */
    endboss;

    /** @type {number} The x-coordinate position where the level ends. */
    level_end_x = 2800;

    /**
     * Creates an instance of Level.
     * @param {Array<Object>} enemies - The enemies present in the level.
     * @param {Array<Object>} clouds - The clouds present in the level.
     * @param {Array<Object>} coins - The coins present in the level.
     * @param {Array<Object>} bottles - The bottles present in the level.
     * @param {Object} endboss - The end boss of the level.
     * @param {Array<Object>} backgroundObjects - The background objects in the level.
     */
    constructor(enemies, clouds, coins, bottles, endboss, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
    }
}
