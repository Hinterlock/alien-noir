class Alleyway extends baseScene {
    constructor() {
        super("alleyWayScene");
    }

    preload() {
        this.load.image('alley', './assets/alley.png');
        this.load.image('cards', './assets/cards.png');
        this.load.image('cursor', './assets/Cursor.png');
        this.load.image('nat_frus', './assets/Lady_Frustrated.png');
    }

    create() {
        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'alley');
        this.cards = this.add.sprite(game.config.width/4, game.config.height*3/4, 'cards');
        this.cards.scale = .5;

        this.cursor = this.add.sprite(-100, -100, 'cursor');
        this.setup();

        this.natieks = this.add.sprite(game.config.width * 5/6, game.config.height*1/2, 'nat_frus');
        this.natieks.scale = .2;
        this.natieks.y = game.config.height - this.natieks.height*this.natieks.scale/2;
        this.natieks.flipX = -1;
        this.natieks.x = this.natieks.width*this.natieks.scale + game.config.width;

        //json object containing dialogue: in future will move to separate file thats loaded in
        this.dialogue1 = [
            {
                'text': ["A B C",
                        "1 2 3 4 5"],
                'speaker': 'det'
            },
            {
                'text': ["yay",
                        "a a b",
                        ""],
                'speaker': 'someone else lol'
            }
        ];
        this.dialogue2 = [
            {
                'text': ["*Sigh…*"],
                'speaker': 'det'
            },
            {
                'text': ["yay",
                        "a a b",
                        ""],
                'speaker': 'Natieks',
                'mood': 'frustrated',
                'new': true
            },
            {
                'text': ["yay",
                        "a a b",
                        ""],
                'speaker': 'det2',
                'mood': 'frustrated',
                'new': true
            }
        ];

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

    checkMouseOver(mouse, sprite) {
        // simple AABB checking
        if (mouse.x < sprite.x + sprite.width/2 && 
            mouse.x > sprite.x - sprite.width/2 &&
            mouse.y < sprite.y + sprite.height/2 &&
            mouse.y > sprite.y - sprite.height/2) {
                return true;
        } else {
            return false;
        }
    }
}