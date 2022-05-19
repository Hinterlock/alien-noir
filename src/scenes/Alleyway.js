class Alleyway extends baseScene {
    constructor() {
        super("alleyWayScene");
    }

    preload() {
        this.load.image('alley', './assets/alley.png');
        this.load.image('cards', './assets/cards.png');
        this.load.image('cursor', './assets/Cursor.png');
        this.load.image('nat_frus', './assets/Lady_Frustrated.png');
        this.load.json('alley1_intro', './assets/test.json');
        this.load.json('alley2', './assets/test2.json');
    }

    create() {
        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'alley');
        this.cards = this.add.sprite(game.config.width/4, game.config.height*3/4, 'cards');
        this.cards.scale = .5;

        this.cursor = this.add.sprite(-100, -100, 'cursor');
        this.setup();

        this.natieks = this.setupSprite('nat_frus');

        this.dialogue1 = this.cache.json.get('alley1_intro');
        this.dialogue2 = this.cache.json.get('alley2');

        /*this.wipe = new Shape(game.config.width, 0, game.config.width, game.config.height, game.config.backgroundColor);
        this.tweens.add({
            targets: this.wipe,
            x: { from: game.config.width, to: 0},
            ease: 'Sine.easeOut',
            duration: 1000,
            onComplete: function() {
                this.startDialogue(this.dialogue1);
            },
            onCompleteScope: this
        });*/
        this.startDialogue(this.dialogue1);
    }
    update() {
        if (this.state) {
            this.cursor.x = this.input.activePointer.x;
            this.cursor.y = this.input.activePointer.y;
            if (this.checkMouseOver(this.input.activePointer, this.cards) && this.input.activePointer.isDown) {
                this.startDialogue(this.dialogue2);
                this.sound.play('investigate');
                this.cards.x = this.cards.x *2.5;
                this.cards.y = this.cards.y *.70;
            }
            if (this.input.activePointer.x > game.config.width*.7 && this.input.activePointer.isDown) {
                enter = 710;
                this.scene.start("streetScene");
            }
        }
    }
}