class Alleyway extends baseScene {
    constructor() {
        super("alleyWayScene");
    }

    preload() {
        this.load.image('alley', './assets/alley.png');
        this.load.image('cards', './assets/cards.png');
        this.load.spritesheet('nat', './assets/spritesheets/LadySheet.png', {frameWidth: 2891, frameHeight: 3133});
        this.load.json('alley1_intro', './assets/text/test.json');
        this.load.json('alley2', './assets/text/test2.json');
    }

    create() {
        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'alley');
        this.cards = this.add.sprite(game.config.width/4, game.config.height*3/4, 'cards');
        this.cards.scale = .5;

        this.setup();

        this.natieks = new Speaker(this, 1, 'nat');

        this.dialogue1 = this.cache.json.get('alley1_intro');
        this.dialogue2 = this.cache.json.get('alley2');
        this.wipeIn(this.dialogue1);
    }
    clickButton() {
        if (this.state) {
            if (this.checkMouseOver(this.input.activePointer, this.cards)) {
                this.startDialogue(this.dialogue2);
                this.sound.play('investigate');
                this.cards.x = this.cards.x *2.5;
                this.cards.y = this.cards.y *.70;
            }
            if (this.input.activePointer.x > game.config.width*.7) {
                this.wipeOut("streetScene");
            }
        }
    }
}