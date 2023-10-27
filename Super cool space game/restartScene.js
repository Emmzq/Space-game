import { game } from './game-config.js'


class RestartScene extends Phaser.Scene {
    constructor() {
        super("RestartScene")
    }

    preload() {
    }

    create(data) {
        let scene = data.Scene;

        let textWidthRestart = this.add.text(0, 0, 'Restart', { fontSize: '32px', fill: 'black' }).width;
        let textWidth = this.add.text(0, 0, "Oh no! You died!", {font: "20px Arial", fill: "black"}).width;
        let text = this.add.text((game.config.width - textWidth) / 2, 150, "Oh no! You died!", {font: "20px Arial", fill: "white"}) 
        const startButton = this.add.text((game.config.width - textWidthRestart) / 2, 200, 'Restart', { fontSize: '32px', fill: 'white' });
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start(scene); // Transition to the game scene
        })
    }
}

export { RestartScene };