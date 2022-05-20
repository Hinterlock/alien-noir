class Street extends baseScene {
    constructor() {
        super("streetScene");
    }
    preload() {
        this.load.image('buildings', './assets/buildings.png');
        this.load.image('alleyway', './assets/alleyway.png');
        this.load.image('bar', './assets/bar.png');
        this.load.image('bakery', './assets/bakery.png');
        this.load.image('street', './assets/street.png');
        this.load.image('detective', './assets/detective.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#42f557');
        
        this.buildings = this.add.image(game.config.width - 70, game.config.height * 1/2, 'buildings');
        this.bar = this.add.image(this.buildings.width*5/6, game.config.height * 1/3, 'bar');
        this.alleyway = this.add.image(this.buildings.width *4/9, game.config.height * 1/3, 'alleyway');
        this.bakery = this.add.image(this.buildings.width *1/8, game.config.height * 1/3, 'bakery');
        this.street = this.add.image(game.config.width - 70, game.config.height * 1/2, 'street');
        // this.street = this.add.image(game.config.width + 90, game.config.height * 1/2, 'street');
        this.detective = this.add.sprite(enter, game.config.height*9/16,'detective');
        let startY = .45;
        if (enter != 50) { 
            this.detective.setScale((.0012*(game.config.height*startY - this.detective.height*3/8-(game.config.height*9/16)) + 1));
            this.detective.y = game.config.height*startY - this.detective.height*3/8;
            if (this.detective.x < this.street.width - this.cameras.main.width/2 && this.detective.x > this.cameras.main.width/2) {
                this.cameras.main.scrollX = this.detective.x - this.cameras.main.width/2;
            }
        }
        this.setup();
        
        // define keys
        // keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.move = false;
        this.wipeIn();

        this.input.on('pointerdown', function() {
            if (this.input.activePointer.y > game.config.height*startY) {
                //this.move = true;
                this.moveTo(this.detective, this.input.activePointer.x + this.cameras.main.scrollX, this.input.activePointer.y - this.detective.height*3/8);
            } else {
                if (this.checkMouseOver(this.input.activePointer, this.bar)) {
                    this.moveTo(this.detective, 1500, game.config.height*startY - this.detective.height*3/8, "barScene");
                }
                if (this.checkMouseOver(this.input.activePointer, this.bakery)) {
                    this.moveTo(this.detective, 20, game.config.height*startY - this.detective.height*3/8, "bakeryScene");
                }
                if (this.checkMouseOver(this.input.activePointer, this.alleyway)) {
                    this.moveTo(this.detective, 710, game.config.height*startY - this.detective.height*3/8, "alleyWayScene");
                }
            }
        }, this);
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
        if (this.detective.x < this.street.width - cam.width/2 && this.detective.x > cam.width/2) {
            cam.scrollX = this.detective.x - cam.width/2;
        }
    }
    moveTo(det, x, y, enter) {
        let dur = moveSpd * Math.sqrt((det.x - (x))*(det.x - (x)) + (det.y - y)*(det.y - y));
        this.tweens.add({
            targets: det,
            x: { from: det.x, to: x},
            y: { from: det.y, to: y},
            scale: {from: det.scale, to: (.0012*(y-(game.config.height*9/16)) + 1)},
            ease: 'Linear',
            duration: dur,
            onComplete: function() {
                //this.move = false;
                if (enter) {
                    this.wipeOut(enter);
                }
            },
            onCompleteScope: this
        });
    }
}