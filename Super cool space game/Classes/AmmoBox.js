

class AmmoBox {
    static size = 20

    constructor(scene, image, amount, Player) {
        this.scene = scene;
        this.player = Player;
        this.ammoBoxGroup = this.scene.physics.add.group({defaultKey: image, maxSize: amount});
        for(let i = 0; i < amount; i++) {
            this.ammoBox = this.ammoBoxGroup.create(0,0, image);
            this.ammoBox.setActive(false);
            this.ammoBox.setVisible(false)
        }
    }

    collect(ammoBox) {
        this.player.playerAmmo += AmmoBox.size
        ammoBox.setActive(false);
        ammoBox.setVisible(false);
        ammoBox.destroy();
    }

    spawn(x, y) {
        const ammoBox = this.ammoBoxGroup.get();
        if (ammoBox) {
            ammoBox.setActive(true);
            ammoBox.setVisible(true);
            ammoBox.setPosition(x, y);
            ammoBox.setVelocity(0);

        }
    }
}

export { AmmoBox };