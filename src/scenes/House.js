class House extends baseScene {
    constructor() {
        super("houseScene");
    }
    preload() {

    }
    create() {
        // things behind the text boxes should be added before setup

        this.setup();

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