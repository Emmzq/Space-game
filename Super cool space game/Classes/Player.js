import { game } from './../game-config.js';


class Player {
    // Class constants
    static maxHealth = 200
    static playerSpeed = 200
    static maxAmmo = 20

    constructor(scene, image, Bullet, strScene) {
        this.scene = scene;
        this.strScene = strScene;
        this.bullets = Bullet;
        this.player = this.scene.physics.add.sprite(game.config.width / 2, game.config.height - 10, image);
        this.player.body.collideWorldBounds = true; // Prevent the player from leaving the playing area. I learnt this from source 1.
        this.playerHealth = Player.maxHealth;
        this.playerAmmo = Player.maxAmmo;
        this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Triggers shooting
        this.player.score = 0;
    }

    
    playerMovement(wKey, aKey, sKey, dKey) {
        // I learnt how to create movement bt watching the lecture video (source 0)
        if (aKey.isDown) {
            this.player.body.velocity.x = -Player.playerSpeed
        } 
        if (dKey.isDown) { //right
            this.player.body.velocity.x = Player.playerSpeed
        } 
        if (wKey.isDown) { // up
            this.player.body.velocity.y = -Player.playerSpeed
        } 
        if (sKey.isDown) { // down
            this.player.body.velocity.y = Player.playerSpeed
        }
        if (!aKey.isDown && !dKey.isDown) { // None vertical
            this.player.body.velocity.x = 0;
        }
        if (!wKey.isDown && !sKey.isDown) { // None
            this.player.body.velocity.y = 0;
        }
        // I added these combinations for smoother movement
        if (dKey.isDown && aKey.isDown) { // both stay horizontal
            this.player.body.velocity.x = 0
        } 
        if (wKey.isDown && sKey.isDown) { // both stay vertical
            this.player.body.velocity.y = 0
        }
    }

    killPlayer() {
        this.scene.scene.start('RestartScene', {Scene: this.strScene});
    }
    
    // Updates playerhealth and checks if they died
    updateHealth(amount) {
        if (this.playerHealth + amount > Player.maxHealth) {
            this.playerHealth = Player.maxHealth
        } else {
            this.playerHealth += amount
        }
        // Check if player dies
        if (this.playerHealth <= 0) {
            this.killPlayer();
        }
    }


    shootBullets() { // Place this in the update() function of your main game scene
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
        if (this.playerAmmo <= 0) {
            return 0
            }
        this.bullets.shoot(this.player.x, this.player.y);
        return -1
        }
    return 0
    }

    // Updates player ammo
    updateAmmo(amount, ammoBar) {
        ammoBar.text = 'Ammo: ' + this.playerAmmo + '/' + Player.maxAmmo;
        if (this.playerAmmo + amount >= Player.maxAmmo) {
            this.playerAmmo = Player.maxAmmo;
        } else {
            this.playerAmmo += amount;
        }
    }
}

export { Player };