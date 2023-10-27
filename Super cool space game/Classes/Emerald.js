

class Emerald {
    static health = 20;
    constructor(scene, image, amount, Player) {
        this.scene = scene;
        this.player = Player
        this.emeraldGroup = this.scene.physics.add.group({defaultKey: image, maxSize: amount});
        for(let i = 0; i < amount; i++) {
            this.emerald = this.emeraldGroup.create(0,0, image);
            this.emerald.setActive(false);
            this.emerald.setVisible(false);
        }
    }

    spawn(x, y) {
        const emerald = this.emeraldGroup.get();
        if (emerald) {
            emerald.setActive(true);
            emerald.setVisible(true);
            emerald.setPosition(x, y);
            emerald.setVelocity(0);
        }
    }

    collect(emerald) {
        emerald.setActive(false);
        emerald.setVisible(false);
        emerald.destroy();
        this.player.updateHealth(Emerald.health);
    }
}

export { Emerald };