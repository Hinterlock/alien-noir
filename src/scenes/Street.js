class Street extends baseScene {
    constructor() {
        super("streetScene");
    }
    preload() {
        this.load.image('street', './assets/street/street_road.png');
        this.load.image('sky', './assets/street/street_sky.png');
        this.load.image('alleyway', './assets/street/street_alley.png');
        this.load.image('alleyway_outlined', './assets/street/street_alley_outlined.png');
        this.load.image('bar', './assets/street/street_bar.png');
        this.load.image('bar_outlined', './assets/street/street_bar_outlined.png');
        this.load.image('bakery', './assets/street/street_bakery.png');
        this.load.image('bakery_outlined', './assets/street/street_bakery_outlined.png');
        this.load.image('cats', './assets/street/street_cats.png');
        this.load.image('cats_outlined', './assets/street/street_cats_outlined.png');
        this.load.image('cones', './assets/street/street_cones.png');
        this.load.image('mushrooms', './assets/street/street_mushrooms.png');
        this.load.image('ufo', './assets/street/street_ufo.png');
        this.load.spritesheet('walk', './assets/street/spritesheet.png', {frameWidth: 130, frameHeight: 184, startFrame: 0, endFrame: 7});
        this.load.image('lilDet', './assets/detective.png');
    }
    create() {
        this.buildings = this.add.image(game.config.width - 70, game.config.height * 1/4, 'sky');

        this.bar = this.add.image(this.buildings.width*7/8, game.config.height * 1/4, 'bar');
        this.alleyway = this.add.image(this.buildings.width *3/8, game.config.height * 1/4, 'alleyway');
        this.bakery = this.add.image(this.buildings.width *1/8, game.config.height * 1/4, 'bakery');

        this.cats = this.add.image(this.buildings.width *6/8, game.config.height * 1/4, 'cats');
        this.cones = this.add.image(this.buildings.width *5/8, game.config.height * 1/4, 'cones');
        this.mushrooms = this.add.image(this.buildings.width *4/8, game.config.height * 1/4, 'mushrooms');
        this.ufo = this.add.image(this.buildings.width *2/8, game.config.height * 1/4, 'ufo');

        this.street = this.add.image(game.config.width - 70, game.config.height * .72, 'street');
        // this.street = this.add.image(game.config.width + 90, game.config.height * 1/2, 'street');
        
        this.detective = this.add.sprite(710, game.config.height*.45,'walk').setOrigin(0.5, 0.9);
        if (this.detective.x < this.street.width - this.cameras.main.width/2 && this.detective.x > this.cameras.main.width/2) {
            this.cameras.main.scrollX = this.detective.x - this.cameras.main.width/2;
        }

        this.setup();

        this.clues[1] = this.alleyway;
        this.clues[2] = this.bakery;
        this.clues[3] = this.bar;
        this.clues[4] = this.cats;

        this.state = 2;
        // this.move = false;
        this.music = this.sound.add('streetsMusic',{loop: true});
        this.music.play();
        this.music.pause();
        this.wipeIn();
        this.interrupt = true;
        this.schmoovin = 0;

        //define anims
        this.anims.create({
            key: 'detwalk',
            frames: this.anims.generateFrameNumbers('walk', {start: 0, end: 7}),
            frameRate: 9,
            repeat: -1
        })        
    }
    clickButton() {
        let startY = .45;
        this.schmoovin++;
        if (this.input.activePointer.x + this.cameras.main.scrollX < this.detective.x) {
            this.detective.flipX = -1;
        } else {
            this.detective.flipX = 0;
        }
        if (this.input.activePointer.y > game.config.height*startY) {
            //this.move = true;
            this.moveTo(this.detective, this.input.activePointer.x + this.cameras.main.scrollX, this.input.activePointer.y);
            this.interrupt = true;
        } else {
            switch (this.currentHighlight) {
                case '1': //aleyway
                    this.moveTo(this.detective, this.alleyway.x, game.config.height*startY, "alleyWayScene");
                    this.interrupt = false;
                    break;
                case '2': //bakery
                    this.moveTo(this.detective, this.bakery.x, game.config.height*startY, "bakeryScene");
                    this.interrupt = false;
                    break;
                case '3': //bar
                    this.moveTo(this.detective, this.bar.x, game.config.height*startY, "barScene");
                    this.interrupt = false;
                    break;
                case '4': //cats
                    this.moveTo(this.detective, this.cats.x, game.config.height*startY, "houseScene");
                    this.interrupt = false;
                    break;
                default:
                    this.moveTo(this.detective, this.input.activePointer.x + this.cameras.main.scrollX, game.config.height*startY);
            }
        }
    }
    update() {
        let cam = this.cameras.main;
        this.cursorUpdate();
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
            scale: {from: det.scale, to: (1 + 1.5*(y-(game.config.height*.45))/(game.config.height*.55))},
            ease: 'Linear',
            duration: dur,
            onActive: this.detective.anims.play('detwalk', true),
            onComplete: function() {
                //this.move = false;
                this.schmoovin--;
                if (this.schmoovin == 0) {
                    this.detective.anims.stop(null, true);
                }
                if (enter && !this.interrupt) {
                    this.wipeOut(enter);
                }
            },
            onCompleteScope: this
        });
    }
}