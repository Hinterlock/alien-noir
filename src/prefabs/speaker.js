class Speaker extends Phaser.GameObjects.Sprite{
    constructor(scene, side, texture) {
        super(scene, -200, -200, texture);
        this.scale = .125;
        this.y = game.config.height*2/3 - this.height*this.scale/2;
        if (side == 0) {
            this.home = -this.width*this.scale;;
        } else {
            this.home = this.width*this.scale + game.config.width;
            this.flipX = -1;
        }
        this.x = this.home;
        scene.add.existing(this);
    }

}