class Bakery extends baseScene {
    constructor() {
        super("bakeryScene");
    }
    preload() {
        //images
        this.load.image('bakery_walls', './assets/bakery/walls.png');
        this.load.image('circle', './assets/bakery/summoning_circle.png');
        this.load.image('cauldron', './assets/bakery/cauldron.png');
        this.load.image('shelves', './assets/bakery/shelves.png');
        this.load.image('shelf_items', './assets/bakery/shelf_items.png');
        this.load.image('broken_shelf', './assets/bakery/broken_shelf.png');
        this.load.image('fixed_shelf', './assets/bakery/fixed_shelf.png');
        this.load.image('right_stand', './assets/bakery/right_stand.png');
        this.load.image('broken_stand', './assets/bakery/broken_stand.png');
        this.load.image('fixed_stand', './assets/bakery/fixed_stand.png');
        this.load.image('trail_bakery', './assets/bakery/trail_bakery.png');
        this.load.image('trail_bakery_outlined', './assets/bakery/trail_bakery_outlined.png');
        this.load.image('bread_1', './assets/bakery/bread_1.png');
        this.load.image('bread_1_outlined', './assets/bakery/bread_1_outlined.png');
        this.load.image('bread_2', './assets/bakery/bread_2.png');
        this.load.image('bread_2_outlined', './assets/bakery/bread_2_outlined.png');
        this.load.image('bread_3', './assets/bakery/bread_3.png');
        this.load.image('bread_3_outlined', './assets/bakery/bread_3_outlined.png');
        this.load.image('id', './assets/bakery/id.png');
        this.load.image('id_outlined', './assets/bakery/id_outlined.png');
        this.load.image('fur', './assets/bakery/fur.png');
        this.load.image('fur_outlined', './assets/bakery/fur_outlined.png');
        //spritesheets
        this.load.spritesheet('baker', './assets/spritesheets/ChefSheet.png', {frameWidth: 2891, frameHeight: 3133});        
        //dialogue
        this.load.json('bakeryIntro', './assets/text/bakery2.json');
    }
    create() {
        this.bakerywalls = this.add.image(game.config.width/2, game.config.height/2, 'bakery_walls');
        this.circle = this.add.image(game.config.width/2, game.config.height*4/5, 'circle');
        this.cauldron = this.add.image(game.config.width/2, game.config.height/2, 'cauldron');
        this.shelves = this.add.image(game.config.width/2, game.config.height*2/8, 'shelves');
        this.shelf_items = this.add.image(game.config.width/2, game.config.height*1/6, 'shelf_items');
        this.broken_shelf = this.add.image(game.config.width*7/8, game.config.height/2.9, 'broken_shelf');
        this.right_stand = this.add.image(game.config.width - 275/2, game.config.height*3/4, 'right_stand');
        this.broken_stand = this.add.image(275/2, game.config.height*3/4, 'broken_stand');
        this.trail_bakery = this.add.image(game.config.width/3.6, game.config.height*8/9, 'trail_bakery');
        this.id = this.add.image(game.config.width*2.9/9, game.config.height*2.1/3, 'id');
        this.bread_1 = this.add.image(game.config.width*1.8/3, game.config.height*7.2/9, 'bread_1');
        this.bread_2 = this.add.image(game.config.width*3/4, game.config.height*2.3/3, 'bread_2');
        this.bread_3 = this.add.image(game.config.width*2.8/9, game.config.height*2.1/3, 'bread_3'); 
        this.fur = this.add.image(game.config.width*1.4/3, game.config.height*8/9.6, 'fur');

        this.setup();

        this.gabotop = new Speaker(this, 1, 'baker');

        this.clues[1] = this.trail_bakery;
        
        this.introTxt = this.cache.json.get('bakeryIntro');

        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);
        this.wipeIn(this.introTxt, 'bell');
        this.events.on('wake', function() {this.wipeIn(null, 'bell');}, this);
    }
    clickButton() {
        if (this.input.activePointer.y > game.config.height*.85 && (gameProgress['bakeryScene'][1] ? (this.input.activePointer.x < this.trail_bakery.x - this.trail_bakery.width/2 ||this.input.activePointer.x > this.trail_bakery.x + this.trail_bakery.width/2) : true)) {
            this.wipeOut("streetScene");
        }
        if (this.state) {
            if (this.checkMouseOver(this.input.activePointer, this.trail_bakery) && gameProgress['bakeryScene'][1]) {
                // this.startDialogue(this.trailClue);
                this.sound.play('clue');
                this.trail_bakery.setTexture('trail_bakery');
                this.currentHighlight = 0;
                gameProgress['bakeryScene'][1] = false;
            }
        }
    }
}