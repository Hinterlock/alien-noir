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

        this.move = false;
    }
    update() {
        let cam = this.cameras.main;
        /* keyboard movement (doesn't play nice with the mouse movement)
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
        }*/
        /*if (this.input.activePointer.isDown) {
            this.scene.start("talkScene");
        }*/
        if (/*!this.move &&*/ this.input.activePointer.isDown && this.input.activePointer.y > game.config.height * 3/4 - this.road.height/2) {
            //this.move = true;
            this.moveTo(this.detective, this.input.activePointer.x, this.input.activePointer.y);
        }
        if (this.detective.x < this.road.width - cam.width/2 && this.detective.x > cam.width/2) {
            cam.scrollX = this.detective.x - cam.width/2;
        }
    }
    moveTo(det, x, y) {
        let cam = this.cameras.main;
        let dur = moveSpd * Math.sqrt((det.x - (x+cam.scrollX))*(det.x - (x+cam.scrollX)) + (det.y - y)*(det.y - y));
        this.tweens.add({
            targets: det,
            x: { from: det.x, to: x + cam.scrollX},
            y: { from: det.y, to: y},
            scale: {from: det.scale, to: det.scale - (det.y - y)*.0015},
            ease: 'Linear',
            duration: dur/*,
            onComplete: function() {this.move = false;},
            onCompleteScope: this*/
        });
    }
}