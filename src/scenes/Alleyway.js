class Alleyway extends Phaser.Scene {
    constructor() {
        super("alleyWayScene");
    }

    preload() {
        this.load.image('alley', './assets/alley.png');
        this.load.image('cards', './assets/cards.png');
        this.load.image('cursor', './assets/Cursor.png');
        this.load.image('fade', './assets/fade.png');
        this.load.image('det_neut', './assets/Detective_Neutral.png');
    }

    create() {
        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'alley');
        this.cards = this.add.sprite(game.config.width/4, game.config.height*3/4, 'cards');
        this.cards.scale = .5;

        this.cursor = this.add.sprite(-100, -100, 'cursor');
        this.fade = this.add.image(game.config.width/2, game.config.height/2, 'fade');
        this.fade.scale = 1.5;

        this.det = this.add.sprite(game.config.width/6, game.config.height*1/2, 'det_neut');
        this.det.scale = .2;
        this.det.y = game.config.height - this.det.height*this.det.scale/2;
        this.det.x = -this.det.width*this.det.scale;

        this.tweens.add({
            targets: this.fade,
            alpha: { from: 0, to: 1},
            ease: 'Sine.easeOut',
            duration: 1000
        });
        this.tweens.add({
            targets: this.det,
            x: { from: this.det.x, to: game.config.width/6},
            ease: 'Sine.easeOut',
            duration: 1000
        });

        this.state = 0;
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', this.space, this);
    }

    space() {
        if (this.state) {

        } else {
            this.tweens.add({
                targets: this.fade,
                alpha: { from: 1, to: 0},
                ease: 'Sine.easeIn',
                duration: 1000
            });
            this.tweens.add({
                targets: this.det,
                x: { from: this.det.x, to: -this.det.width*this.det.scale},
                ease: 'Sine.easeIn',
                duration: 1000
            });
        }
        this.state = 1;
    }

    update() {
        if (this.state) {
            this.cursor.x = this.input.activePointer.x;
            this.cursor.y = this.input.activePointer.y;
            if (this.checkMouseOver(this.input.activePointer, this.cards)) {
            }
        }
    }

    checkMouseOver(mouse, sprite) {
        // simple AABB checking
        if (mouse.x < sprite.x + sprite.width/2 && 
            mouse.x > sprite.x - sprite.width/2 &&
            mouse.y < sprite.y + sprite.height/2 &&
            mouse.y > sprite.y - sprite.height/2) {
                return true;
        } else {
            return false;
        }
    }
}