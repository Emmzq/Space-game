import { game } from '../game-config.js';



class Asteroid {
    static maxHealth = 100;
    static damage = 50;
    static scoreBullet = 20;
    static scoreMeteorite = 50;
    static damageMeteoritePlayer = 50;

    constructor(scene, amount, image, AmmoBox) {
        this.scene = scene;
        this.ammoBox = AmmoBox
        this.spriteGroup = this.scene.physics.add.group({defaultKey: image, maxSize: amount});
        for(let i = 0; i < amount; i++) {
            // here the asteroid is spawned for the first time and the line 13 defines that it will spawn randomly in x-axis and randomly in the upper half in y-axis
            this.sprite = this.spriteGroup.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(game.config.height - (game.config.height / 2), 0), image) // Lets spawn the first asteroid(s) above the player!
            this.sprite.setVisible(true)
            this.sprite.setVelocityY(Phaser.Math.Between(5,20)); // Learnt this using source 5.
            this.sprite.health = Asteroid.maxHealth;
            this.sprite.collisionCounter = 0
        }
    }

    playerCollision(ufo, asteroid) {
        // Yeet the player away from the asteroid
        ufo.x = asteroid.x + (ufo.x - asteroid.x) * 3
        ufo.y = asteroid.y + (ufo.y - asteroid.y) * 3
        asteroid.setVelocityX(0);
        asteroid.setVelocityY(Phaser.Math.Between(8,15));
        // Deal damage to the player
        this.ufo.updateHealth(-Asteroid.damage)
        this.healthBar.text = 'Health: ' + this.ufo.playerHealth; // wait why does this work here?
    }

    meteoriteCollision(meteorite, asteroid, player) {
        if (meteorite.checkPlayerCollision) {
            asteroid.collisionCounter += 1
            asteroid.health -= Asteroid.damageMeteoritePlayer;
            if (asteroid.collisionCounter >= 2 && asteroid.health <= 0) {
                this.respawn(asteroid);
                player.score += Asteroid.scoreMeteorite;
            }
            // meteor respawn here
            meteorite.x = Phaser.Math.Between(0, game.config.width);
            meteorite.y = -meteorite.height;
            meteorite.health = 30;
            meteorite.setVelocity(0, Phaser.Math.Between(10,100));
            meteorite.checkPlayerCollision = false;
        } else {
            // Change the asteroids flight course a little according to the meteorite collision
            asteroid.setVelocityX((asteroid.x-meteorite.x) * 0.1);
            asteroid.setVelocityY((asteroid.y-meteorite.y) * 0.5);
            meteorite.checkPlayerCollision = false;
            meteorite.setVelocity(0, Phaser.Math.Between(10,100));
        }

    }

    asteroidCollision(asteroid1, asteroid2) {
        /*let Random1 = Phaser.Math.Between(2,5)
        let Random2 = Phaser.Math.Between(2,5)
        asteroid1.setVelocity((asteroid1.x-asteroid2.x)*Random1, (asteroid1.y-asteroid2.y)*(Random1 - 5));
        asteroid2.setVelocity((asteroid2.x-asteroid1.x)*Random2, (asteroid2.y-asteroid1.y)*(Random2 - 5)); */
        asteroid1.checkPlayerCollision = false;
        asteroid2.checkPlayerCollision = false;
    }

    bulletCollision(asteroid, bullet, player) {
        asteroid.health -= bullet.damage
        bullet.destroy()
        if (asteroid.health <= 0) {
            player.score += Asteroid.scoreBullet;
            this.ammoBox.spawn(asteroid.x, asteroid.y);
            this.respawn(asteroid);
        }
    }

    respawn(asteroid) {
        asteroid.x = Phaser.Math.Between(0, game.config.width);
        asteroid.y = -asteroid.height;
        asteroid.health = Asteroid.maxHealth;
        asteroid.setVelocity(0,Phaser.Math.Between(5,20));
        asteroid.collisionCounter += 0;
    }

    movement() { // Call this in update() function in main scene js file
        this.spriteGroup.children.iterate((asteroid) => {
            asteroid.angle += 0.1;
            // Check if the meteorite has left the play area and respawn it
            if (asteroid.y > game.config.height || asteroid.y < -(asteroid.height) || asteroid.x > game.config.width + (asteroid.x / 2) || asteroid.x - asteroid.x/2 < 0) {
                asteroid.x = Phaser.Math.Between(0, game.config.width);
                asteroid.y = -asteroid.height; // Place the star just above the visible screen
                asteroid.setVelocityY(15);
                asteroid.setVelocityX(0);
                asteroid.angle = 0;
            }
        });
    }
}


export { Asteroid };