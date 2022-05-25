class baseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    setup() {
        //bg fade in dialogue
        this.fade = this.add.image(game.config.width/2, game.config.height/2, 'fade');
        this.fade.scale = 1.5;
        this.fade.alpha = 0;

        //detective talksprite
        this.det = this.add.sprite(game.config.width/6, game.config.height*1/2, 'detective');
        this.det.scale = .2;
        this.det.y = game.config.height - this.det.height*this.det.scale/2;
        this.det.x = -this.det.width*this.det.scale;

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
        this.wipe = this.add.rectangle(this.cameras.main.scrollX + game.config.width/2, game.config.height/2, game.config.width, game.config.height, game.config.backgroundColor._color);
        this.events.on('wake', function() {this.wipeIn();}, this);
        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);
    } 
    update(){
        this.cursorUpdate();
    }

    setupSprite(key) { //sets up a sprite for the right side of the screen, if needed i can add functionality for it to set up sprites for the left
        let temp = this.add.sprite(game.config.width * 5/6, game.config.height*1/2, key);
        temp.scale = .2;
        temp.y = game.config.height - temp.height*temp.scale/2;
        temp.flipX = -1;
        temp.x = temp.width*temp.scale + game.config.width;
        return temp;
    }

    wipeIn(dialogue){ //horizontal wipe for start of scene, takes input for if dialogue automatically starts
        this.tweens.add({
            targets: this.wipe,
            x: { from: this.cameras.main.scrollX + game.config.width/2, to: this.cameras.main.scrollX + game.config.width*2},
            ease: 'Sine.easeIn',
            duration: 500,
            onComplete: function() {
                this.wipe.y = game.config.height*2;
                if (dialogue) {
                    this.startDialogue(dialogue);
                }
            },
            onCompleteScope: this
        });
    }
    wipeOut(destination){ //horizontal wipe of end of scene, takes input for scene to switch to
        this.wipe.x = this.cameras.main.scrollX - game.config.width/2;
        this.wipe.y = game.config.height/2;
        this.tweens.add({
            targets: this.wipe,
            x: { from: this.cameras.main.scrollX - game.config.width/2, to: this.cameras.main.scrollX + game.config.width/2},
            ease: 'Sine.easeIn',
            duration: 500,
            onComplete: function() {
                //this.scene.start(destination);
                this.scene.sleep();
                if (this.scene.isSleeping(destination)) {
                    // console.log(destination);
                    this.scene.wake(destination);
                } else {
                    // console.log('a');
                    this.scene.launch(destination);
                }
            },
            onCompleteScope: this
        });
    }
    
    cursorUpdate() {
        if (this.state) {
            this.cursor.x = this.input.activePointer.x;
            this.cursor.y = this.input.activePointer.y;
            if (this.input.activePointer.x > game.config.width*.7) {
                if (this.cursor.texture.key == 'cursor') {
                    this.cursor.setTexture('cursorArrow');
                }
            } else if (this.cursor.texture.key == 'cursorArrow') {
                this.cursor.setTexture('cursor');
            }
        }  
    }

    startDialogue(dialogue) { //brings in background fade and detective talk sprite, hands off to nextBox()
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
    nextBox() { //checks who is speaking, their emotion, switches up the sprites based on that, then hands off to nextLine()
        this.text.text = '';
        let temp;
        if (this.dialogue[this.textBox].speaker == 'det') {
            this.text.x = game.config.width*2/8;
            temp = this.det;
        } else {
            this.text.x = game.config.width/2;
            switch (this.dialogue[this.textBox].speaker) {
                case 'Natieks':
                    temp = this.natieks;
                    break;
                case 'Baker':
                    temp = this.baker;
                    break;
                case 'Fatale':
                    temp = this.fatale;
                    break;
                case 'Bartender':
                    temp = this.bartender;
            }
            
            
            if (this.dialogue[this.textBox].new) { //right speaker is changing
                if (this.rightSpeaker) { //there is a speaker on the right already
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
        switch (this.dialogue[this.textBox].mood) {
            case 'neutral':
                temp.setFrame(3);
                break;
            case 'happy':
                temp.setFrame(1);
                break;
            case 'sad':
                temp.setFrame(4);
                break;
            case 'frustrated':
                temp.setFrame(0);
                break;
            case 'inquisitive':
                temp.setFrame(2);
                
        }
        this.nextLine(0);
    }
    nextLine(lineIndex) { //uses timer to display a word at a time by calling nextWord()
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
    nextWord(line, wordIndex, lineIndex) { //concats words, recursively calls back to nextLine() if at the end of a line
        if (wordIndex == line.length) {
            this.text.text = this.text.text.concat("\n");
            this.nextLine(lineIndex+1);
        } else {
            this.text.text = this.text.text.concat(line[wordIndex] + " ");
        }
    }

    space() { //spacebar input to progress dialogue
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