class House extends baseScene {
    constructor() {
        super("houseScene");
    }
    preload() {

        //images 
        this.load.image('house_bg', './assets/house/house_bg.png');
        this.load.image('stairs', './assets/house/stairs.png');
        this.load.image('stairs_outlined', './assets/house/stairs_outlined.png');
        this.load.image('note', './assets/house/note.png');
        this.load.image('note_outlined', './assets/house/note_outlined.png');
        this.load.image('house_bg', './assets/house/house_bg.png');
        this.load.image('chairs', './assets/house/chairs.png');
        this.load.image('chairs_outlined', './assets/house/chairs_outlined.png');
        this.load.image('closet', './assets/house/closet.png');
        this.load.image('closet_outlined', './assets/house/closet_outlined.png');
        this.load.image('hat', './assets/house/hat.png');
        this.load.image('hat_outlined', './assets/house/hat_outlined.png');
        this.load.image('cake', './assets/house/cake.png');
        this.load.image('cake_outlined', './assets/house/cake_outlined.png');
        this.load.image('lights', './assets/house/lights.png');
        this.load.image('table', './assets/house/table.png');
        this.load.image('note_zoomed', './assets/house/note_zoomed.png');
        this.load.spritesheet('sussy', './assets/spritesheets/SussySheet.png', {frameWidth: 2891, frameHeight: 3133});

        //dialogue
        //this.load.json('houseIntro', './assets/text/house1.json');
        this.load.json('houseIntro', './assets/text/house2.json');
        this.load.json('hatText', './assets/text/house3.json');
        this.load.json('cakeText', './assets/text/house4.json');
        this.load.json('noteText', './assets/text/house5.json');
        this.load.json('evidenceConclusionText', './assets/text/house6.json');
        this.load.json('chairText', './assets/text/house7.json');
        this.load.json('upstairsText', './assets/text/house8.json');
        this.load.json('closetText', './assets/text/house9.json');
    }
    create() {
        // things behind the text boxes should be added before setup
        this.house_bg = this.add.image(game.config.width/2, game.config.height/2, 'house_bg');
        this.closet = this.add.image(game.config.width/11.9, game.config.height/2, 'closet');
        this.lights = this.add.image(game.config.width/2, game.config.height/2, 'lights');
        this.table = this.add.image(game.config.width/2, game.config.height*3/4.3, 'table');
        this.hat = this.add.image(game.config.width*3.3/5, game.config.height*4/5.3, 'hat');
        this.chairs = this.add.image(game.config.width/2.2, game.config.height*2/3, 'chairs');
        this.stairs = this.add.image(game.config.width*3/4 - 37, game.config.height/2, 'stairs');
        this.cake = this.add.image(game.config.width/2.3, game.config.height*2/3.9, 'cake');
        this.note = this.add.image(game.config.width/2.6, game.config.height*2.3/3, 'note');
        
        
        this.setup();

        this.sussy = new Speaker(this, 1, 'sussy');

        this.clues[1] = this.hat;
        this.clues[2] = this.closet;
        this.clues[3] = this.note;
        this.clues[4] = this.chairs;
        this.clues[5] = this.stairs;
        this.clues[6] = this.cake;

        this.note_zoom = this.add.image(game.config.width/2, game.config.height*3/9, 'note_zoomed');
        this.note_zoom.setScale(.7);
        this.note_zoom.alpha = 0;
        // talksprites added after
        this.midscene = false;

        this.music = this.sound.add('slugKarenMusic',{loop: true});
        this.music.play();
        this.music.pause();

        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);
        this.wipeIn(this.cache.json.get('houseIntro'));
    }
    clickButton() {
        if (gameProgress['houseScene'][this.currentHighlight]) {
            switch (this.currentHighlight) {
                case '6':
                    this.startDialogue(this.cache.json.get('cakeText'));
                    gameProgress['houseScene'][6] = false;
                    this.cake.alpha = 0;
                    this.currentHighlight = 0;
                    break;
                case '5':
                    this.startDialogue(this.cache.json.get('upstairsText'));
                    gameProgress['houseScene'][5] = false;
                    this.currentHighlight = 0;
                    break;
                case '4':
                    this.startDialogue(this.cache.json.get('chairText'));
                    gameProgress['houseScene'][4] = false;
                    this.currentHighlight = 0;
                    break;
                case '3':
                    // this.startDialogue(this.cache.json.get());
                    this.startDialogue(this.cache.json.get('noteText'));
                    gameProgress['houseScene'][3] = false;
                    this.note.alpha = 0;
                    this.tweens.add({
                        targets: this.note_zoom,
                        alpha: { from: 0, to: 1},
                        ease: 'Sine.easeIn',
                        duration: this.tweenTime
                    });
                    this.currentHighlight = 0;
                    break;
                case '2':
                    this.startDialogue(this.cache.json.get('closetText'));
                    gameProgress['houseScene'][2] = false;
                    gameProgress['houseScene'][4] = false;
                    gameProgress['houseScene'][5] = false;
                    isFinished = true;
                    this.currentHighlight = 0;
                    break;
                case '1':
                    this.startDialogue(this.cache.json.get('hatText'));
                    gameProgress['houseScene'][1] = false;
                    this.hat.alpha = 0;
                    this.currentHighlight = 0;
                    
                    break;
            }
        }
        if (this.input.activePointer.y > game.config.height*.85) {
            this.wipeOut("streetScene");
        }
    }
    space() {
        super.space();
        if (this.note_zoom.alpha == 1) {
            this.tweens.add({
                targets: this.note_zoom,
                alpha: { from: 1, to: 0},
                ease: 'Sine.easeOut',
                duration: this.tweenTime
            });
        }
        if(this.state && this.midscene == false && !gameProgress['houseScene'][1] && !gameProgress['houseScene'][6] && !gameProgress['houseScene'][3]){
            console.log("test");
            this.startDialogue(this.cache.json.get('evidenceConclusionText'));
            gameProgress['houseScene'][2] = true;
            gameProgress['houseScene'][4] = true;
            gameProgress['houseScene'][5] = true;
            this.midscene = true;
        }
    }
}