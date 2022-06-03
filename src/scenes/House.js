class House extends baseScene {
    constructor() {
        super("houseScene");
    }
    preload() {

        //images 
        this.load.image('house_bg', './assets/house/house_bg.png');
        this.load.image('stairs', './assets/house/stairs.png');
        this.load.image('stairs_outlined', './assets/house/stairs_outlined.png');
        this.load.image('note', './assets/house/note.png');
        this.load.image('note_outlined', './assets/house/note_outlined.png');
        this.load.image('house_bg', './assets/house/house_bg.png');
        this.load.image('chairs', './assets/house/chairs.png');
        this.load.image('chairs_outlined', './assets/house/chairs_outlined.png');
        this.load.image('closet', './assets/house/closet.png');
        this.load.image('closet_outlined', './assets/house/closet_outlined.png');
        this.load.image('hat', './assets/house/hat.png');
        this.load.image('hat_outlined', './assets/house/hat_outlined.png');
        this.load.image('cake', './assets/house/cake.png');
        this.load.image('cake_outlined', './assets/house/cake_outlined.png');
        this.load.image('lights', './assets/house/lights.png');
        this.load.image('table', './assets/house/table.png');
    }
    create() {
        // things behind the text boxes should be added before setup
        this.house_bg = this.add.image(game.config.width/2, game.config.height/2, 'house_bg');
        this.closet = this.add.image(game.config.width/11.9, game.config.height/2, 'closet');
        this.lights = this.add.image(game.config.width/2, game.config.height/2, 'lights');
        this.table = this.add.image(game.config.width/2, game.config.height*3/4.3, 'table');
        this.hat = this.add.image(game.config.width*3.3/5, game.config.height*4/5.3, 'hat');
        this.chairs = this.add.image(game.config.width/2.2, game.config.height*2/3, 'chairs');
        this.stairs = this.add.image(game.config.width*3/4 - 37, game.config.height/2, 'stairs');
        this.cake = this.add.image(game.config.width/2.3, game.config.height*2/3.9, 'cake');
        this.note = this.add.image(game.config.width/4, game.config.height*2.7/3, 'note');
        
        this.setup();

        this.clues[1] = this.hat;
        this.clues[2] = this.closet;
        this.clues[3] = this.note;
        this.clues[4] = this.chairs;
        this.clues[5] = this.stairs;
        this.clues[6] = this.cake;

        // talksprites added after

        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);
        this.wipeIn();
    }
    clickButton() {
        if (this.input.activePointer.y > game.config.height*.85) {
            this.wipeOut("streetScene");
        }
    }
}