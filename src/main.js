//CMPM/ARTG 120 final project
//Authors: Aidan Adams, Lee Coronilia, Kirsten Lindblad, Angela Yim
let config = {
    type: Phaser.AUTO,
    width: 970,
    height: 600,
    backgroundColor: '#5e554d',
    scene: [ Menu, Street, Investigate ]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
let moveSpd = 5;
// reserve keyboard vars
let keySPACE, keyA, keyD, keyW, keyS;