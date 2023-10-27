import { game } from './game-config.js'

class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene")
    }

    preload() {
        this.load.image("background", "./assets/images/Background.png");
        this.load.audio('music', './assets/audio/Space.wav');
        this.load.image('ufo', '/assets/images/UFO.png');
    }

    create() {
        // Adding music and audio effects (source 9)
        let music = this.sound.add('music', {loop: true});
        music.play();
        music.volume = music.volume * 0.5

        this.background = this.add.image(0,0,"background")
        this.background.setOrigin(0,0);

        this.add.text(120, 50, "Super cool space game!", {font: "25px Arial", fill: "yellow"});
        this.add.text(50, 80, "Will you help this little fellow pass a highly poisonous planet?", {font: "15px Arial", fill: "white"});
        
        this.add.image(250,130,'ufo');

        // Start the game
        const startButton = this.add.text(175, 225, 'Start Game', { fontSize: '25px', fill: 'white' });
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Read instructions (Did not have time to finish this)
        /* const instructionsButton = this.add.text(150, 245, 'Read Instructions', { fontSize: '20px', fill: 'white' });
        instructionsButton.setInteractive();
        instructionsButton.on('pointerdown', () => {
            this.scene.start('InstructionsScene');
        }); */
    }
}

export {StartScene};
