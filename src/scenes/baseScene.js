class baseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    setup() {
        console.log('oh');
        this.rat = "rat";
        //bg fade in dialogue
        this.fade = this.add.image(game.config.width/2, game.config.height/2, 'fade');
        this.fade.scale = 1.5;

        //detective talksprite
        this.det = this.add.sprite(game.config.width/6, game.config.height*1/2, 'det_neut');
        this.det.scale = .2;
        this.det.y = game.config.height - this.det.height*this.det.scale/2;
        this.det.x = -this.det.width*this.det.scale;

        
        this.det2 = this.add.sprite(game.config.width * 5/6, game.config.height*1/2, 'det_neut');
        this.det2.scale = .2;
        this.det2.y = game.config.height - this.det2.height*this.det2.scale/2;
        this.det2.flipX = -1;
        this.det2.x = this.det2.width*this.det2.scale + game.config.width;

        this.rightSpeaker;

        //text formatting (please change)
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '24px'
            //color: ''
        };
        this.text = this.add.text(game.config.width*3/8, game.config.height/8, '', this.textFormat);
        this.wordDelay = 100;
        this.timer;
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
            let temp;
            switch (this.dialogue[this.textBox].speaker) {
                case 'Natieks':
                    temp = this.natieks;
                    break;
                case 'det2':
                    temp = this.det2;
            }
            /*
            switch (this.dialogue[this.textBox].mood) {
                case 'neutral':
                    break;
                case 'happy':
                    break;
                case 'sad':
                    break;
                case 'frustrated':
                    break;
                case 'inquisitive':
                    
            }
            */
            if (this.dialogue[this.textBox].new) {
                if (this.rightSpeaker) {
                    let timeline = this.tweens.createTimeline();
                    timeline.add({
                        targets: this.rightSpeaker,
                        x: { from: this.rightSpeaker.x, to: game.config.width + this.rightSpeaker.width*this.rightSpeaker.scale},
                        ease: 'Sine.easeIn',
                        duration: 500,
                        onComplete: function() {
                            this.rightSpeaker = temp;
                            if (this.state) {
                                timeline.destroy();
                            }
                        },
                        onCompleteScope: this
                    });
                    timeline.add({
                        targets: temp,
                        x: { from: temp.x, to: game.config.width*5/6},
                        ease: 'Sine.easeOut',
                        duration: 500
                    });
                    timeline.play();
                } else {
                    this.rightSpeaker = temp;
                    this.tweens.add({
                        targets: this.rightSpeaker,
                        x: { from: this.rightSpeaker.x, to: game.config.width*5/6},
                        ease: 'Sine.easeOut',
                        duration: 1000
                    });
                }
            }
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
                if (this.rightSpeaker) {
                    this.tweens.add({
                        targets: this.rightSpeaker,
                        x: { from: this.rightSpeaker.x, to: game.config.width + this.rightSpeaker.width*this.rightSpeaker.scale},
                        ease: 'Sine.easeIn',
                        duration: 1000,
                        onComplete: function() {this.rightSpeaker = null;},
                        onCompleteScope: this
                    });
                }
            }
        }
        this.sound.play('click');
    }
}