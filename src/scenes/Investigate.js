class Investigate extends Phaser.Scene {
    constructor() {
        super("investigateScene");
    }

    preload() {
        this.load.image('cursor', './assets/Cursor.png');
        this.load.image('detective', './assets/detective.png');
    }

    create() {
        this.add.text(20, 20, 'Investigate');
        this.cursor = this.add.sprite(0, 0, 'cursor');
        this.detective = this.add.sprite(game.config.width/2, game.config.height/2,'detective');
    }

    update() {
        this.cursor.x = this.input.activePointer.x;
        this.cursor.y = this.input.activePointer.y;
        if (this.checkMouseOver(this.input.activePointer, this.detective) && this.input.activePointer.isDown) {
            this.detective.x = Math.random() * game.config.width;
            this.detective.y = Math.random() * game.config.height;
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