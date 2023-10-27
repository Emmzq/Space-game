
class ResultsScene extends Phaser.Scene {
    constructor() {
        super("ResultsScene");
    }

    preload() {
        this.load.image('ufo', './assets/images/UFO.png');
    }

    create() {
        this.add.image(210,300,'ufo');
        this.add.text(240,290, "- Good bye, player!", {font: "15px Arial", fill: "yellow"});
        // Story
        this.add.text(145,150, "Thank you for your help, player!", {font: "15px Arial", fill: "white"});
        this.add.text(30,180, "Now the little ufo can  continue his journey through galaxies again.", {font: "15px Arial", fill: "white"});
        this.add.text(70,210, "This would not have been possible without your help.", {font: "15px Arial", fill: "white"});
    }
}

export { ResultsScene };