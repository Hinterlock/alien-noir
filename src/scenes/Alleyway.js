class Alleyway extends baseScene {
    constructor() {
        super("alleyWayScene");
    }

    preload() {
        this.load.image('alley', './assets/alley.png');
        // this.load.image('cards', './assets/cards.png');
        this.load.spritesheet('nat', './assets/spritesheets/LadySheet.png', {frameWidth: 2891, frameHeight: 3133});
        this.load.json('alley1_intro', './assets/text/test.json');
        this.load.json('alley2', './assets/text/test2.json');

        //final assets
        this.load.image('boxes', './assets/alleyway/boxes.png');
        this.load.image('cards', './assets/alleyway/cards.png');
        this.load.image('cards_outlined', './assets/alleyway/cards_outlined.png');
        this.load.image('papers', './assets/alleyway/papers.png');
        this.load.image('posters', './assets/alleyway/posters.png');
        this.load.image('stand', './assets/alleyway/stand.png');
        this.load.image('trash', './assets/alleyway/trash.png');
        this.load.image('alley_walls', './assets/alleyway/walls.png');

    }

    create() {
        // this.bg = this.add.image(game.config.width/2, game.config.height/2, 'walls');
        //this.cards = this.add.sprite(game.config.width/4, game.config.height*3/4, 'cards');
        //this.cards.scale = .5;
        this.alleywalls = this.add.image(game.config.width/2, game.config.height/2, 'alley_walls');
        this.posters = this.add.image(game.config.width/2, game.config.height/3, 'posters');
        this.stand = this.add.image(game.config.width/2, game.config.height/2, 'stand');
        this.papers = this.add.image(game.config.width/2, game.config.height*1/2, 'papers');
        this.trash = this.add.image(game.config.width/5, game.config.height*4/5, 'trash');
        this.cards = this.add.image(game.config.width/10, game.config.height*3/4, 'cards');
        this.cards_outlined = this.add.image(game.config.width/10, game.config.height*3/4, 'cards_outlined');
        this.boxes = this.add.image(game.config.width*5/6, game.config.height*5/6, 'boxes');

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