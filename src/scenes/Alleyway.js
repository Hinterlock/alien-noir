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

        //bg fade in dialogue
        this.fade = this.add.image(game.config.width/2, game.config.height/2, 'fade');
        this.fade.scale = 1.5;

        //detective talksprite
        this.det = this.add.sprite(game.config.width/6, game.config.height*1/2, 'det_neut');
        this.det.scale = .2;
        this.det.y = game.config.height - this.det.height*this.det.scale/2;
        this.det.x = -this.det.width*this.det.scale;

        //text formatting (please change)
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '24px'
            //color: ''
        };
        this.text = this.add.text(game.config.width*3/8, game.config.height/8, '', this.textFormat);

        //json object containing dialogue: in future will move to separate file thats loaded in
        this.dialogue1 = [
            {
                'text': ["A B C",
                        "1 2 3 4 5"],
                'speaker': 'det'
            },
            {
                'text': ["yay",
                        "a a b",
                        ""],
                'speaker': 'someone else lol'
            }
        ];
        this.dialogue2 = [
            {
                'text': ["*Sigh…*"],
                'speaker': 'det'
            },
            {
                'text': ["yay",
                        "a a b",
                        ""],
                'speaker': 'someone else lol'
            }
        ];
        this.wordDelay = 100;
        this.timer;
        this.startDialogue(this.dialogue1);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', this.space, this);
    }

    startDialogue(dialogue) {
        this.dialogue = dialogue;
        this.textBox = 0;
        this.state = 0;
        this.cursor.x = -100;
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
            duration: 1000,
            onComplete: this.nextBox(),
            onCompleteScope: this
        });
    }

    nextBox() {
        this.text.text = '';
        if (this.dialogue[this.textBox].speaker == 'det') {
            this.text.x = game.config.width*2/8;
        } else {
            this.text.x = game.config.width/2;
        }
        this.nextLine(0);
    }
    nextLine(lineIndex) {
        if (lineIndex == this.dialogue[this.textBox].text.length) {
            this.textBox += 1;
            return;
        }
        let wordIndex = 0;
        let line = this.dialogue[this.textBox].text[lineIndex].split(' ');
        this.timer = this.time.addEvent({
            delay: this.wordDelay,
            callback: function(){
                this.nextWord(line, wordIndex, lineIndex);
                wordIndex++;
            },
            callbackScope: this,
            repeat: line.length
        });
    }
    nextWord(line, wordIndex, lineIndex) {
        if (wordIndex == line.length) {
            this.text.text = this.text.text.concat("\n");
            this.nextLine(lineIndex+1);
        } else {
            this.text.text = this.text.text.concat(line[wordIndex] + " ");
        }
    }

    space() {
        if (!this.state){
            if (this.timer.getOverallRemaining() > 0) {
                this.timer.remove(false);
                this.textBox ++;
            }
            if (this.textBox < this.dialogue.length) {
                this.nextBox();
            } else {
                this.text.text = '';
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
                this.state = 1;
            }
        }
    }

    update() {
        if (this.state) {
            this.cursor.x = this.input.activePointer.x;
            this.cursor.y = this.input.activePointer.y;
            if (this.checkMouseOver(this.input.activePointer, this.cards) && this.input.activePointer.isDown) {
                this.startDialogue(this.dialogue2);
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