class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio

        // load menu images
        //this.load.image('title', './assets/Menu.png');
    }

    create() {
        this.add.text(20, 20, 'Menu');
        //this.title = this.add.image(game.config.width/2, game.config.height/2, 'title');
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            enter = 1000;
            this.scene.start("streetScene");
        }
        if (this.input.activePointer.isDown) {
            this.scene.start("investigateScene");
        }
    }
}