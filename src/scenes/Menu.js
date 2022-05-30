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
        this.load.image('cursor', './assets/magnifying.png');
        this.load.image('cursorArrow', './assets/CursorArrow.png');
        this.load.image('borders', './assets/borders.png');
        this.load.image('box', './assets/textbox.png');

        
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');
    }

    create() {
        this.add.text(20, 20, 'Menu, click to start, spacebar to progress');
        //this.title = this.add.image(game.config.width/2, game.config.height/2, 'title');
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', function() {
            this.scene.start("streetScene");
            this.sound.play('click');
        }, this);
        this.input.on('pointerdown', function() {
            this.scene.start("alleyWayScene");
            this.sound.play('investigate');
        }, this);
    }
    
    update(){}
}