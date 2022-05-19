class Bakery extends baseScene {
    constructor() {
        super("bakeryScene");
    }
    preload() {

    }
    create() {
        this.setup();
        enter = 50;
        this.scene.start("streetScene");
    }
}