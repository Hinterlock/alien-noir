class Bar extends baseScene {
    constructor() {
        super("barScene");
    }
    preload() {
        this.load.image('bar_interior', './assets/bar_interior.png');
    }
    create() {
        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'bar_interior');
        
        this.setup();
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