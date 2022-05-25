class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('click', './assets/click.wav');
        this.load.audio('investigate', './assets/investigate.wav');

        // load menu images
        this.load.image('fade', './assets/fade.png');
        this.load.spritesheet('detective', 'assets/spritesheets/DetectiveSheet.png', {frameWidth: 2891, frameHeight: 3133});
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