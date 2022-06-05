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
        //spritesheets
        this.load.spritesheet('bt', './assets/spritesheets/BartenderSheet.png', {frameWidth: 2891, frameHeight: 3133});
        this.load.spritesheet('og', './assets/spritesheets/OgaiSheet.png', {frameWidth: 2891, frameHeight: 3133});
        this.load.spritesheet('fatale', './assets/spritesheets/FataleSheet.png', {frameWidth: 2891, frameHeight: 3133});
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
        this.bartenderMini = this.add.image(game.config.width*6/8.3, game.config.height*1/2.6, 'bartender');
        
        this.setup();
        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);

        this.bartender = new Speaker(this, 1, 'bt');
        this.ogai = new Speaker(this, 1, 'og');
        this.leirza = new Speaker(this, 1, 'fatale');

        this.clues[1] = this.bartenderMini;
        this.clues[2] = this.stage;
        this.clues[3] = this.aliens;

        this.stage1Txt = this.cache.json.get('bar4');
        this.pplTxt = this.cache.json.get('bar5');
        
        // this.music = this.sound.add('slugKarenMusic',{loop: true});
        // this.music.play();
        // this.music.pause();

        this.investigateStatus = 0;

        this.wipeIn(this.cache.json.get('bar1_intro'));
    }
    clickButton() {
        if (this.state) {
            if (gameProgress['barScene'][this.currentHighlight]) {
                switch (this.currentHighlight) {
                    case '3':
                        this.startDialogue(this.pplTxt);
                        break;
                    case '2':
                        if (this.investigateStatus == 0) {
                            this.startDialogue(this.stage1Txt);
                        } else {
                            this.startDialogue(this.cache.json.get('bar3'));
                            this.currentHighlight = 0;
                            this.stage.setTexture('stage');
                            gameProgress['barScene'][2] = false;
                            gameProgress['streetScene'][2] = true; //opens up bakery
                        }
                        break;
                    case '1':
                        this.startDialogue(this.cache.json.get('bar2'));
                        gameProgress['barScene'][1] = false;
                        this.investigateStatus += 1;
                        this.currentHighlight = 0;
                        this.bartenderMini.setTexture('bartender');
                        break;
                    // default:
                    //     console.log(this.currentHighlight);
                }
            }
            if (this.input.activePointer.y > game.config.height*.85) {
                this.wipeOut("streetScene");
            }
        }
    }
}