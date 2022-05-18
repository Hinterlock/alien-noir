class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('click', './assets/click.wav');
        this.load.audio('investigate', './assets/investigate.wav');

        // load menu images
        //this.load.image('title', './assets/Menu.png');
        this.load.image('fade', './assets/fade.png');
        this.load.image('det_neut', './assets/Detective_Neutral.png');
    }

    create() {
        this.add.text(20, 20, 'Menu, click to start, spacebar to progress');
        //this.title = this.add.image(game.config.width/2, game.config.height/2, 'title');
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            enter = 1000;
            this.scene.start("streetScene");

            this.sound.play('click');

        }
        if (this.input.activePointer.isDown) {
            this.scene.start("alleyWayScene");

            this.sound.play('investigate');
        }

    }
}