class Street extends Phaser.Scene {
    constructor() {
        super("streetScene");
    }
    preload() {
        this.load.image('road', './assets/road.png');
        this.load.image('detective', './assets/detective.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#42f557');
        
        this.road = this.add.image(game.config.width + 90, game.config.height * 3/4, 'road');
        this.detective = this.add.sprite(enter, game.config.height*9/16,'detective');
        if (enter != 50) {
            this.detective.y = game.config.height*3/8;
            this.detective.setScale(0.885);
        }
        
        // define keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update() {
        let cam = this.cameras.main;
        if (keyD.isDown && this.detective.x < this.road.width - this.detective.width/2) {
            if (cam.scrollX < this.road.width - cam.width && this.detective.x > cam.width/2) {
                cam.scrollX += moveSpd;
            }
            this.detective.x += moveSpd;
        }
        if (keyA.isDown && this.detective.x > this.detective.width/2) {
            if (cam.scrollX > 0 && this.detective.x < this.road.width - cam.width/2) {
                cam.scrollX -= moveSpd;
            }
            this.detective.x -= moveSpd;
        }
        if (keyW.isDown && this.detective.y > game.config.height*3/8) {
            this.detective.y -= moveSpd;
            this.detective.setScale(this.detective.scale-.005);
            //console.log(this.detective.scale);
        }
        if (keyS.isDown && this.detective.y < game.config.height*3/4) {
            this.detective.y += moveSpd;
            this.detective.setScale(this.detective.scale+.005);
        }
        if (this.input.activePointer.isDown) {
            this.scene.start("talkScene");
        }

    }
}