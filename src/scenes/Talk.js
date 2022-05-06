class Talk extends Phaser.Scene {
    constructor() {
        super("talkScene");
    }

    preload() {
        // load images
        this.load.image('textBox', './assets/textBox.png');
        this.load.text('dialogue', './assets/dialogue.txt');
    }

    create() {
        this.add.text(20, 20, 'Talk');
        this.textBox = this.add.image(game.config.width/2, 0, 'textBox');
        this.textBox.setScale(game.config.width/this.textBox.width);
        this.textBox.y = game.config.height - this.textBox.height/2;
        let text = this.cache.text.get('dialogue');
        this.add.text(borderUISize, game.config.height - this.textBox.height + borderUISize, text);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

        }
    }
}