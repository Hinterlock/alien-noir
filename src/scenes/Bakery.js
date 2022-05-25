class Bakery extends baseScene {
    constructor() {
        super("bakeryScene");
    }
    preload() {
        this.load.image('walls', './assets/bakery/walls.png');
    }
    create() {
        this.walls = this.add.image(game.config.width/2, game.config.height/2, 'walls');
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