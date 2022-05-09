class Street extends Phaser.Scene {
    constructor() {
        super("streetScene");
    }

    preload() {
        this.load.image('road', './assets/road.png');
        this.load.image('detective', './assets/detective.png');
    }

    create() {
        this.add.text(20, 20, 'Street');

        // x position (for camera)
        this.xpos = enter;

        this.road = this.add.image(game.config.width + 90, game.config.height * 3/4, 'road');
        this.detective = this.add.sprite(this.xpos, game.config.height*9/16,'detective');

        if (this.xpos < this.road.width - game.config.width/2 - this.detective.width*.5 &&
            this.xpos > game.config.width/2) {
            this.road.x = game.config.width*1.5 + 90 - this.xpos;
            this.detective.x = game.config.width/2;
        }
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
        if (keyD.isDown && this.xpos < this.road.width - this.detective.width) {
            this.xpos += moveSpd;
            this.changeX(this.road, this.detective);
        }
        if (keyA.isDown && this.xpos > this.detective.width/2) {
            this.xpos -= moveSpd;
            this.changeX(this.road, this.detective);
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

    changeX(road, detective) {
        if (this.xpos < game.config.width/2) {
            // camera stationary, det moves left
            detective.x = this.xpos;
        } else if (this.xpos > this.road.width - game.config.width/2 - this.detective.width*.5) {
            // camera stationary, det moves right
            detective.x = this.xpos + game.config.width - this.road.width + this.detective.width*.5;
        }else {
            // camera moves, det stationary
            road.x = game.config.width*1.5 + 90 - this.xpos;
        }
    }
}