class Endgame extends Phaser.Scene{
    constructor() {
        super("endgameScene");
    }

    preload(){
        this.load.image('end', './assets/endscreen.png');
    }

    create(){
        this.endgame = this.add.image(game.config.width/2, game.config.height/2, 'end');
    }


}