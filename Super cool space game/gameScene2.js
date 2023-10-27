import { BackgroundItems } from './Classes/BackgroundItems.js';
import { Asteroid } from './Classes/Asteroid.js';
import { Player } from './Classes/Player.js';
// import { RedAlien } from './classes/RedAlien.js';
import { Meteorite } from './Classes/Meteorite.js'
import { Emerald } from './Classes/Emerald.js';
import { AmmoBox } from './Classes/AmmoBox.js';
import { Bullet } from './Classes/Bullets.js';

const gameOptions = {
}


class GameScene2 extends Phaser.Scene {
    constructor() {
        super("GameScene2");
    }

    preload() {
        // Images
        this.load.image("bigstar", './assets/images/star1.png');
        this.load.image("smallstar", '../assets/images/star2.png');
        this.load.image("ufo", "./assets/images/UFO.png");
        this.load.image("alien", './assets/images/Alien.png');
        this.load.image("bullet", './assets/images/Bullet.png');
        this.load.image("asteroid", './assets/images/Asteroid.png');
        this.load.image("meteorite", './assets/images/Meteorite.png');
        this.load.image("planetRed", './assets/images/PlanetRed.png');
        this.load.image("SpaceShip", './assets/images/AVARUUSALUS_Tonninseteli.png');
        this.load.image("alienRed", './assets/images/AlienRed.png');
        this.load.image('emerald', './assets/images/Emerald.png');
        this.load.image('ammoBox', './assets/images/AmmoBox.png');
        this.load.image('Planet', './assets/images/Map2.png')

        // Audio
        this.load.audio('beam', './assets/audio/laserShoot.wav');
    }

    create() {
        // Initialization of variables
        this.timer = 0;
        this.timeLeft = 60000 // one round lasts 1 minute

        // Creating stars and planets in order to make the background look cooler
        this.starBig = new BackgroundItems(this, 10, "bigstar");
        this.starSmall = new BackgroundItems(this, 30, "smallstar");
        this.planetRed = new BackgroundItems(this, 1, "planetRed");

        this.background = this.add.image(0,0,'Planet')
        this.background.setOrigin(0,0);

        // Creating the player, bullet and ammoBox instances
        this.bullet = new Bullet(this, 'bullet', 20, 'beam', this.ufo);
        this.ufo = new Player(this, 'ufo', this.bullet, 'GameScene2');
        this.ammoBox = new AmmoBox(this, 'ammoBox', 10, this.ufo)
        // Initialization of player ammo
        this.playerMaxAmmo = this.ufo.playerAmmo
        // Creating a variable for the bullet group
        this.bullets = this.bullet.bulletGroup

        // Create aliens, asteroids, meteorites and emeralds
        this.emerald = new Emerald(this, 'emerald', 10, this.ufo);
        this.meteorite = new Meteorite(this, 10, "meteorite", this.emerald); 
        this.asteroid = new Asteroid(this, 2, 'asteroid', this.ammoBox);
        // this.alienRed = new RedAlien(this, "alienRed", 3); // I had no time to do this :(
        this.physics.add.collider(this.meteorite.spriteGroup, this.asteroid.spriteGroup, (meteorite, asteroid) => {
            this.asteroid.meteoriteCollision(meteorite, asteroid, this.ufo.player)
        }, null, this);
        this.physics.add.collider(this.meteorite.spriteGroup, this.meteorite.spriteGroup, (meteorite1, meteorite2) => {
            this.meteorite.meteoriteCollision(meteorite1, meteorite2, this.ufo.player);
        }, null, this);

        // Adding colliders to player and other things
        this.physics.add.collider(this.ufo.player, this.meteorite.spriteGroup, this.meteorite.playerCollision, null, this);
        this.physics.add.collider(this.ufo.player, this.asteroid.spriteGroup, this.asteroid.playerCollision, null, this);
        // this.physics.add.collider(this.ufo.player, this.alienRed.alienGroup, this.alienRed.playerCollision, null, this);
        
        // KEYBOARD COMMANDS FOR MOVING (I found this command using the source 2)
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // W key
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // A key
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // S key
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // D key

        // Creating game info texts:
        this.timerBar = this.add.text(400, 16, 'Time: ' + this.timeLeft / 1000, { font: '20px Bold', fill: 'white' });
        this.ammoBar = this.add.text(16, 46, 'Ammo: ' + this.playerMaxAmmo + '/' + this.playerMaxAmmo, { font: '20px Bold', fill: 'white' });
        this.healthBar = this.add.text(16, 16, 'Health: ' + this.ufo.playerHealth, { font: '20px Bold', fill: 'white' });
        this.scoreBar = this.add.text(16, 76, 'Score: ' + this.ufo.player.score, { font: '20px Bold', fill: 'white' });
    }

    update(time, delta) { // In update it is defined how the ufo moves
        // Move stars and planets in the background to make the background look cooler
        this.starBig.movement(3);
        this.starSmall.movement(1);
        this.planetRed.movement(10);
        
        // ufo movement and player score updates
        this.ufo.playerMovement(this.wKey, this.aKey, this.sKey, this.dKey);
        
        // update ammo all the time to show the correct amount of ammutation
        this.ufo.updateAmmo(0, this.ammoBar)

        // Adds 1 ammo every 1 second, also keeps track of time the player has left to play.
        this.timer += delta
        while (this.timer > 1000) { // I got help with this using source 8. 
            this.ufo.updateAmmo(1, this.ammoBar)
            this.timer -= 1000;
            this.timeLeft -= 1000;
            this.ufo.updateHealth(-5); // Damage caused by poison around the green planet
            this.timerBar.text = 'Time: ' + this.timeLeft / 1000
            if (this.timeLeft <= 0) {
                this.scene.start('ResultsScene', { score: this.ufo.player.score });
            }
        }

        this.ufo.updateAmmo(this.ufo.shootBullets(), this.ammoBar);

        this.meteorite.movement();
        this.asteroid.movement();
        // this.alienRed.movement(this.ufo.player);
        
        // If player shoots the meteorite 3 times, it will break and has a 20% chance of dropping an emerald
        this.physics.overlap(this.meteorite.spriteGroup, this.bullets, (meteorite, bullet) => {
            this.meteorite.bulletCollision(meteorite, bullet, this.ufo.player); // I had to make an arrow function to be able to pass the bulletBox
        });

        this.physics.overlap(this.asteroid.spriteGroup, this.bullets, (asteroid, bullet) => {
            this.asteroid.bulletCollision(asteroid, bullet, this.ufo.player);
        });
        
        // Check if player collects an emerald and grants the player 10 hp for each collected emerald
        this.physics.overlap(this.ufo.player, this.emerald.emeraldGroup, (ufo, emerald) => {
            this.emerald.collect(emerald)
            this.ufo.player.score += 10; // Collecting emeralds result in +10 score
        }, null, this);

        this.physics.overlap(this.ufo.player, this.ammoBox.ammoBoxGroup, (ufo, ammoBox) => {
            this.ammoBox.collect(ammoBox);
            this.ufo.player.score += 10; // Collecting ammo result in +10 score
        }, null, this);

        this.scoreBar.text = 'Score: ' + this.ufo.player.score;
        this.healthBar.text = 'Health: ' + this.ufo.playerHealth;
    }
}

export { GameScene2 }