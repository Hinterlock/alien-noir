class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio sfx
        this.load.audio('click', './assets/click.wav');
        this.load.audio('investigate', './assets/investigate.wav');
        this.load.audio('bell', './assets/sound/bell.wav');
        this.load.audio('clue', './assets/sound/clue.wav');
        this.load.audio('startup', './assets/sound/menu_startup.mp3');
        // load music
        this.load.audio('streetsMusic', './assets/sound/The_Streets.wav');
        this.load.audio('slugKarenMusic', './assets/sound/An_Interruption.wav');
        this.load.audio('barMusic', './assets/sound/The_Eyesore.wav');
        this.load.audio('alleywayMusic', './assets/sound/Alleyway.wav');

        // load base images
        this.load.spritesheet('detective', './assets/spritesheets/DetectiveSheet.png', {frameWidth: 2891, frameHeight: 3133});
        this.load.image('cursor', './assets/magnifying.png');
        this.load.image('cursorArrow', './assets/CursorArrow.png');

        // load menu images
        this.load.image('menuBg', './assets/menu/title_screen.png');
        this.load.image('credits_button', './assets/menu/credits_button.png');
        this.load.image('start_button', './assets/menu/start_button.png');

        // load font
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');
    }

    create() {
        this.add.image(game.config.width/2, game.config.height/2, 'menuBg');
        this.add.text(20, 20, 'Click to start, use the mouse to investigate and move around the neighborhood');
        
        this.menuBttn = this.add.image(game.config.width/2, game.config.height*2/3, 'start_button');
        this.creditsBttn = this.add.image(game.config.width/2, game.config.height*5/6, 'credits_button');
        //this.title = this.add.image(game.config.width/2, game.config.height/2, 'title');

        this.wipe = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, game.config.backgroundColor._color);
        this.wipe.alpha = 0;
        
        this.sound.play('startup');

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', function() {
            for (let n in gameProgress['streetScene']) {
                gameProgress['streetScene'][n] = true;
            }
            //gameProgress['streetScene'][4] = false;
            this.scene.start("streetScene");
            this.sound.play('click');
        }, this);
        this.input.on('pointerdown', function() {
            if (this.checkMouseOver(this.input.activePointer, this.menuBttn)) {
                this.wipe.alpha = 1;
                this.tweens.add({
                    targets: this.wipe,
                    x: { from: this.cameras.main.scrollX - game.config.width/2, to: this.cameras.main.scrollX + game.config.width/2},
                    ease: 'Sine.easeIn',
                    duration: 500,
                    onComplete: function() {
                        this.scene.start("alleyWayScene");
                    },
                    onCompleteScope: this
                });
            }
        }, this);
    }
    
    update(){}
    
    checkMouseOver(mouse, sprite) {
        // simple AABB checking
        if (mouse.x + this.cameras.main.scrollX < sprite.x + sprite.width/2 && 
            mouse.x + this.cameras.main.scrollX > sprite.x - sprite.width/2 &&
            mouse.y < sprite.y + sprite.height/2 &&
            mouse.y > sprite.y - sprite.height/2) {
                return true;
        } else {
            return false;
        }
    }
}