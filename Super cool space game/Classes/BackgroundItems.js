import { game } from './../game-config.js';



// This class defines how cosmetic items in the background should be moving down.
class BackgroundItems {
    constructor(scene, amount, image) {
        this.scene = scene;
        this.spriteGroup = this.scene.physics.add.group({defaultKey: image, maxSize: amount});
        for(let i = 0; i < amount; i++) {
            this.sprite = this.spriteGroup.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), image)
            this.sprite.setVisible(true)
        }
    }


    movement(velocity) {
        this.spriteGroup.setVelocityY(velocity);
        this.spriteGroup.children.iterate((sprite) => {
            if (sprite.y > game.config.height) {
                sprite.x = Phaser.Math.Between(0, game.config.width);
                sprite.y = -sprite.height; // Place the star just above the visible screen
            }
        });
    }
}

export { BackgroundItems };