class Bakery extends baseScene {
    constructor() {
        super("bakeryScene");
    }
    preload() {
        this.load.image('walls', './assets/bakery/walls.png');
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
    }
    create() {
        this.walls = this.add.image(game.config.width/2, game.config.height/2, 'walls');
        this.circle = this.add.image(game.config.width/2, game.config.height*4/5, 'circle');
        this.cauldron = this.add.image(game.config.width/2, game.config.height/2, 'cauldron');
        this.shelves = this.add.image(game.config.width/2, game.config.height*2/8, 'shelves');
        this.shelf_items = this.add.image(game.config.width/2, game.config.height*1/6, 'shelf_items');
        this.broken_shelf = this.add.image(game.config.width*7/8, game.config.height/2.9, 'broken_shelf');
        this.right_stand = this.add.image(game.config.width - 275/2, game.config.height*3/4, 'right_stand');
        this.broken_stand = this.add.image(275/2, game.config.height*3/4, 'broken_stand');
        this.trail_bakery = this.add.image(game.config.width/3.6, game.config.height*8/9, 'trail_bakery');
        this.setup();
        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);
        this.wipeIn();
    }
    clickButton() {
        if (this.input.activePointer.x > game.config.width*.7) {
            this.wipeOut("streetScene");
        }
    }
}