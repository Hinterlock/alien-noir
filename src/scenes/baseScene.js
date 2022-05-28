class baseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    setup() {
        this.state = 1;
        this.typing = false;
        this.wordDelay = 100;
        // this.timer;
        this.speaker = null;
        this.lastSpeaker = null;

        this.borders = this.add.image(game.config.width/2, game.config.height/2, 'borders');
        this.borders.scale = 1.5;
        
        this.box = this.add.image(game.config.width/2, game.config.height/2, 'box');
        this.box.alpha = 0;
        //detective talksprite
        this.det = new Speaker(this, 0, 'detective');
        
        this.cursor = this.add.sprite(-100, -100, 'cursor'); //cursor sprite

        //text formatting (please change)
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#0a0a0a'
        };
        this.text = this.add.text(game.config.width*2/8, game.config.height*6/8, '', this.textConfig);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', this.space, this);

        this.wipe = this.add.rectangle(this.cameras.main.scrollX + game.config.width/2, game.config.height/2, game.config.width, game.config.height, game.config.backgroundColor._color);
        
        this.events.on('wake', function() {this.wipeIn();}, this);

        this.input.on('pointerdown', function() {
            this.clickButton(); //this is defined in the individual scenes, covers investigation clicks
        }, this);
    } 
    update(){
        this.cursorUpdate();
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
    wipeOut(destination){ //horizontal wipe of end of scene, takes input for scene to switch to, uses sleep instead of stop
        this.wipe.x = this.cameras.main.scrollX - game.config.width/2;
        this.wipe.y = game.config.height/2;
        this.tweens.add({
            targets: this.wipe,
            x: { from: this.cameras.main.scrollX - game.config.width/2, to: this.cameras.main.scrollX + game.config.width/2},
            ease: 'Sine.easeIn',
            duration: 500,
            onComplete: function() {
                this.scene.sleep();
                if (this.scene.isSleeping(destination)) {
                    this.scene.wake(destination);
                } else {
                    this.scene.launch(destination);
                }
            },
            onCompleteScope: this
        });
    }
    
    cursorUpdate() { //moves cursor to mouse
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
        this.lastSpeaker = null;
        this.textBox = 0;
        this.state = 0;
        this.cursor.x = -100;
        this.tweens.add({
            targets: this.box,
            alpha: { from: 0, to: 1},
            ease: 'Sine.easeOut',
            duration: 1000
        });
        this.tweens.add({
            targets: this.borders,
            scale: { from: 1.5, to: 1},
            ease: 'Sine.easeOut',
            duration: 1000,
            onComplete: this.nextBox(),
            onCompleteScope: this
        });
    }
    nextBox() { //checks who is speaking, their emotion, switches up the sprites based on that, then hands off to nextLine()
        this.text.text = '';
        this.typing = true;
        let x;

        this.speaker = this.dialogue[this.textBox]['speaker'];
        if (this.speaker == 'det') {
            x = game.config.width/8;
        } else {
            x = game.config.width - game.config.width/8;
        }
        switch (this.dialogue[this.textBox].mood) { //mood handling
            case 'neutral': 
                this[this.speaker].setFrame(3);
                break;
            case 'happy':
                this[this.speaker].setFrame(1);
                break;
            case 'sad':
                this[this.speaker].setFrame(4);
                break;
            case 'frustrated':
                this[this.speaker].setFrame(0);
                break;
            case 'inquisitive':
                this[this.speaker].setFrame(2);
        }
        if (this.dialogue[this.textBox]['new'] == true) {
            if (this.lastSpeaker) {
                this.tweens.add({
                    targets: this[this.lastSpeaker],
                    x: { from: this[this.lastSpeaker].x, to: this[this.lastSpeaker].home},
                    ease: 'Sine.easeIn',
                    duration: 1000
                });
            }
            this.tweens.add({
                targets: this[this.speaker],
                x: { from: this[this.speaker].home, to: x},
                ease: 'Sine.easeIn',
                duration: 1000
            });
        }
        this.nextLine(0);
    }
    nextLine(lineIndex) { //uses timer to display a word at a time by calling nextWord()
        if (lineIndex == this.dialogue[this.textBox].text.length) {
            this.textBox += 1;
            this.typing = false;
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
            // if (this.timer.getOverallRemaining() > 0) {
            //     this.timer.remove(false);
            //     this.textBox ++;
            // }
            if (this.textBox < this.dialogue.length) {
                if (!this.typing) {
                    this.lastSpeaker = this.speaker;
                    this.nextBox();
                }
            } else {
                this.text.text = '';
                this.tweens.add({
                    targets: this.box,
                    alpha: { from: 1, to: 0},
                    ease: 'Sine.easeIn',
                    duration: 1000
                });
                this.tweens.add({
                    targets: this.borders,
                    scale: { from: 1, to: 1.5},
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