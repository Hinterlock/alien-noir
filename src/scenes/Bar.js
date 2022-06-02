class Bar extends baseScene {
    constructor() {
        super("barScene");
    }
    preload() {
        //images
        this.load.image('bar_bg', './assets/bar/bar_bg.png');
        this.load.image('aliens', './assets/bar/aliens.png');
        this.load.image('stage', './assets/bar/stage.png');
        this.load.image('bartender', './assets/bar/bartender.png');
        this.load.image('bartender_outlined', './assets/bar/bartender_outlined.png');
        this.load.image('stage_outlined', './assets/bar/stage_outlined.png');
        this.load.image('aliens_outlined', './assets/bar/aliens_outlined.png');
        //text
        this.load.json('bar1_intro', './assets/text/bar1.json');
        this.load.json('bar2', './assets/text/bar2.json');
        this.load.json('bar3', './assets/text/bar3.json');
        this.load.json('bar4', './assets/text/bar4.json');
        this.load.json('bar5', './assets/text/bar5.json');
    }
    create() {
        this.barbg = this.add.image(game.config.width/2, game.config.height/2, 'bar_bg');
        this.stage = this.add.image(game.config.width/3.7, game.config.height*1/3, 'stage');
        this.aliens = this.add.image(game.config.width/2, game.config.height*.56, 'aliens');
        this.bartender = this.add.image(game.config.width*6/8.3, game.config.height*1/2.6, 'bartender');
        
        this.setup();
        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);

        this.clues[1] = this.bartender;
        this.clues[2] = this.stage;
        this.clues[3] = this.aliens;

        this.introTxt = this.cache.json.get('bar1_intro');
        this.bartenderTxt = this.cache.json.get('bar2');
        this.stage2Txt = this.cache.json.get('bar3');
        this.stage1Txt = this.cache.json.get('bar4');
        this.pplTxt = this.cache.json.get('bar5');
        
        this.music = this.sound.add('slugKarenMusic',{loop: true});
        this.music.play();
        this.music.pause();

        this.wipeIn(this.introTxt);
    }
    clickButton() {
        if (this.state) {
            // if (this.checkMouseOver(this.input.activePointer, this.cards) && this.investigateStatus < 1) {
            //     this.startDialogue(this.cardsTxt);
            //     this.sound.play('cardSFX');
            //     this.cards.x = 530;
            //     this.cards.y = 300;
            //     this.cards.setTexture('cards');
            //     this.investigateStatus++;
            // }
            if (this.input.activePointer.y > game.config.height*.85) {
                this.wipeOut("streetScene");
            }
        }
    }
}