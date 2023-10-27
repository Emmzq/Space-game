

class Bullet {
    static bulletSpeed = 250
    static damage = 10

    constructor(scene, image, amount, audio) {
        this.scene = scene;
        this.bulletGroup = scene.physics.add.group({defaultKey: image, maxSize: amount});
        this.bullet = this.bulletGroup.get()
        this.shootingSound = this.scene.sound.add(audio, {loop: false});
    }

    shoot(x, y) {
        this.bullet = this.bulletGroup.get();
        this.shootingSound.play();
        if (this.bullet) {
            this.bullet.setActive(true); 
            this.bullet.setVisible(true);
            this.bullet.setPosition(x, y); // Adjust the starting point of the bullet  
            this.bullet.damage = Bullet.damage
            // Create the shooting direction and adjust bullet speed. I got help with this from source 6 and 7.
            const bulletVector = new Phaser.Math.Vector2(this.scene.game.input.mousePointer.x - this.bullet.x, this.scene.game.input.mousePointer.y - this.bullet.y); // Source 7
            if (bulletVector != Phaser.Math.Vector2.ZERO) {
                bulletVector.normalize(); // Make it a unit vector if the bulletVector is not (0,0) (source 7)
            }
            bulletVector.scale(Bullet.bulletSpeed);
            this.bullet.body.setVelocity(bulletVector.x, bulletVector.y);
        }

        // Destroy bullets that have been shot and regenerate player ammo
        this.bulletGroup.children.iterate((bullet) => {
            if (bullet.active) {
                if (bullet.y < 0) {
                    bullet.setActive(false);
                    bullet.setVisible(false);
                }
            }
        });
    }
}

export { Bullet };