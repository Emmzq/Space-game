/*
Emma Niemenmaa
27.10.2023
Sources:
1. Lecture video: https://www.youtube.com/watch?v=O6zoZAq86io
2. Help with changing arrow keys to wasd for movement: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.KeyboardPlugin.html
3. https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/graphics/health%20bars%20demo.js
4. Help with creating groups: https://github.com/photonstorm/phaser-examples/blob/master/examples/groups/add%20a%20sprite%20to%20group.js
5. Help with iterating through groups: https://phaser.discourse.group/t/how-work-method-iterate-for-group/4422
6. Help with shooting: https://gamedev.stackexchange.com/questions/13326/how-do-i-generate-projectiles-toward-the-mouse-pointer
7. Help dealing with direction vectors (in Player.js): https://rexrainbow.github.io/phaser3-rex-notes/docs/site/vector2/   
8. Help with ammo regeneration: https://gamedev.stackexchange.com/questions/182242/phaser-3-how-to-trigger-an-event-every-1-second
9. Help with adding music: https://phaser.io/examples/v2/audio/play-music
10. Help with passing score variable to next scene: https://stackoverflow.com/questions/53356039/how-do-i-pass-data-from-scene-to-scene-in-phaser-3
11. I learnt using children.iterate from here: https://phaser.io/tutorials/making-your-first-phaser-3-game/part8
12. Overall I used a lot of phasers own documentations and tutorials: https://phaser.io/examples
*/

import { StartScene } from './startScene.js';
import { GameScene } from './gameScene.js';
import { RestartScene } from './restartScene.js'
// import { InstructionsScene } from './Ei palautukseen/instructionsScene.js';
import { NextLevelScene } from './NextLevelScene.js';
import { GameScene2 } from './gameScene2.js'
import { ResultsScene } from './resultsScene.js';

let gameConfig = { //JSON object
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 500,
        height: 500,
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0}
        }
    },
    scene: [ StartScene, GameScene, GameScene2, RestartScene, NextLevelScene, ResultsScene ] // Specify all your scenes here
};

const game = new Phaser.Game(gameConfig) // Creating a new game instance


export { gameConfig, game };