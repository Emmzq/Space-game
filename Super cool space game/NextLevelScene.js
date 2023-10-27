import { game } from './game-config.js';


class NextLevelScene extends Phaser.Scene {
    constructor() {
        super('NextLevelScene');
    }


    preload() {
    }

    create(data) {
        this.score = data.score; // for now, score is not used for anything.
        // Place the congratulations in the middle
        let textWidth = this.add.text(0, 0, "You passed the level!", {font: "20px Arial", fill: "black"}).width;
        this.add.text((game.config.width-textWidth) / 2, 100, "You passed the level!", {font: "20px Arial", fill: "yellow"}); 

        // Story
        this.add.text(190,150, "Good work, player!", {font: "15px Arial", fill: "white"});
        this.add.text(90,180, "Now we are getting closer to the poisonous planet.", {font: "15px Arial", fill: "white"});
        this.add.text(40,210, "The surrounding area of the planet is filled with poisonous gases.", {font: "15px Arial", fill: "white"});
        this.add.text(205,240, "In other words,", {font: "15px Arial", fill: "white"});
        this.add.text(85, 270, 'you will take 5 damage per second in the next level.', {font: "15px Arial", fill: "white"});
        this.add.text(110,300, "Be prepared, we are now passing the planet!", {font: "15px Arial", fill: "white"});
        
        // Place the next level button in the middle
        let textNLWidth = this.add.text(0, 0, 'Next Level', { fontSize: '32px', fill: 'black' }).width;
        const startButton = this.add.text((game.config.width - textNLWidth) / 2, 350, 'Next level', { fontSize: '32px', fill: 'white' });
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene2'); // Transition to the game scene
        })
    }
}

export { NextLevelScene };