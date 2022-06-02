class Bar extends baseScene {
    constructor() {
        super("barScene");
    }
    preload() {
        this.load.image('bar_interior', './assets/bar_interior.png');
        this.load.json('bar1_intro', './assets/text/bar1.json');
        this.load.json('bar2', './assets/text/bar2.json');
        this.load.json('bar3', './assets/text/bar3.json');
        this.load.json('bar4', './assets/text/bar4.json');
        this.load.json('bar5', './assets/text/bar5.json');
    }
    create() {
        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'bar_interior');
        
        this.setup();
        this.input.on('pointerdown', function() {
            this.clickButton();
        }, this);

        this.introTxt = this.cache.json.get('bar1_intro');
        // this.cardsTxt = this.cache.json.get('alley2');
        
        this.music = this.sound.add('slugKarenMusic',{loop: true});
        this.music.play();
        this.music.pause();

        this.wipeIn(this.introTxt);
    }
    clickButton() {
        if (this.input.activePointer.y > game.config.height*.85) {
            this.wipeOut("streetScene");
        }
    }
}