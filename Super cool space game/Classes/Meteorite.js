import { game } from './../game-config.js';

class Meteorite {
    static maxHealth = 30;
    static damage = -10; // Damage dealt to player in collisions
    static scoreBullet = 5;
    static scoreMeteorite = 20;
    static damageMeteorite = 20;

    constructor(scene, amount, image, Emerald) {
        this.scene = scene;
        this.emerald = Emerald
        this.emeraldGroup = this.emerald.emeraldGroup
        this.spriteGroup = this.scene.physics.add.group({defaultKey: image, maxSize: amount});
        for(let i = 0; i < amount; i++) {
            this.sprite = this.spriteGroup.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), image)
            this.sprite.setVelocityY(Phaser.Math.Between(10,100));
            this.sprite.health = Meteorite.maxHealth;
            this.sprite.checkPlayerCollision = false;
        }
    }

    playerCollision(ufo, meteorite) {
        meteorite.setVelocity((meteorite.x - ufo.x)*10, (meteorite.y - ufo.y)*10); // Yeet the meteorite away
        this.ufo.updateHealth(Meteorite.damage); 
        this.healthBar.text = 'Health: ' + this.ufo.playerHealth;
        meteorite.checkPlayerCollision = true;
    }

    meteoriteCollision(meteorite1, meteorite2, player) {
        let Random = Phaser.Math.Between(1,3);

        meteorite1.setVelocity((meteorite1.x-meteorite2.x)*Random, (meteorite1.y-meteorite2.y)*Random);
        meteorite2.setVelocity((meteorite2.x-meteorite1.x)*Random, (meteorite2.y-meteorite1.y)*Random);
        
        // This if is here to give the player more points and a better chance of spawning an emerald.
        if (meteorite1.checkPlayerCollision == true || meteorite2.checkPlayerCollision == true) {
            meteorite1.checkPlayerCollision = false;
            meteorite2.checkPlayerCollision = false;
            meteorite1.health -= Meteorite.damageMeteorite;
            meteorite2.health -= Meteorite.damageMeteorite;
            if (meteorite1.health <= 0) {
                // IF meteorite is broken with another meteorite shot by the player, it will spawn an emerald with 50% chance
                if (Phaser.Math.Between(0,100) < 70) { // 70% chance of spawning an emerald
                    this.emerald.spawn(meteorite1.x, meteorite1.y);
                }
                player.score += Meteorite.scoreMeteorite;
                this.respawn(meteorite1);
                return
            } if (meteorite2.health <= 0) {
                // IF meteorite is broken with another meteorite shot by the player, it will spawn an emerald with 50% chance (same as above)
                if (Phaser.Math.Between(0,100) < 70) { // 70% chance of spawning an emerald
                    this.emerald.spawn(meteorite2.x, meteorite2.y);
                }
                player.score += Meteorite.scoreMeteorite;
                this.respawn(meteorite2);
                meteorite1.checkPlayerCollision = false;
                meteorite2.checkPlayerCollision = false;
            }
        }
    }

    bulletCollision(meteorite, bullet, player) {
        bullet.destroy();
        meteorite.health = meteorite.health - 10
        meteorite.checkPlayerCollision = false;
        if (meteorite.health <= 0) {
            if (Phaser.Math.Between(0,100) < 30) { // 40% chance of spawning an emerald
                this.emerald.spawn(meteorite.x, meteorite.y);
            }
            player.score += Meteorite.scoreBullet;
            this.respawn(meteorite);
        }
    }

    respawn(meteorite) {
        meteorite.x = Phaser.Math.Between(0, game.config.width);
        meteorite.y = -meteorite.height;
        meteorite.health = Meteorite.maxHealth;
        meteorite.setVelocity(0, Phaser.Math.Between(10,100));
        meteorite.checkPlayerCollision = false;
    }

    movement() { // Call this in update() function in main scene js file
        this.spriteGroup.children.iterate((meteorite) => {
            meteorite.angle += 0.5;
            // Check if the meteorite has left the play area and respawn it
            if (meteorite.y > game.config.height + meteorite.height || meteorite.y < -game.config.height-50 || meteorite.x > game.config.width + meteorite.width || meteorite.x < 0 - meteorite.width) {
                meteorite.x = Phaser.Math.Between(0, game.config.width);
                meteorite.y = -meteorite.height; // Place the star just above the visible screen
                meteorite.setVelocityY(Phaser.Math.Between(10,100));
                meteorite.setVelocityX(0);
                meteorite.angle = 0;
                meteorite.health = 30;
            }
        });
    }
}

export { Meteorite };