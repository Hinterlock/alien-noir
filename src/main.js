//CMPM/ARTG 120 final project
//Authors: Aidan Adams, Lee Coronilia, Kirsten Lindblad, Angela Yim
let config = {
    type: Phaser.AUTO,
    width: 970,
    height: 600,
    backgroundColor: '#303030',
    scene: [ Menu, Street, Alleyway, baseScene, Bar, Bakery, House ]
}
let game = new Phaser.Game(config);
// game values
let moveSpd = 3;
// reserve keyboard vars
let keySPACE;

// global values to track investigation progress (what you can access)
let gameProgress = {
    alleyWayScene: {
        1 : true    //cards
    },
    streetScene: {
        1 : true,   //alleyway
        2 : false,  //bakery
        3 : false,  //bar
        4 : false   //cats
    },
    barScene: {
        1 : true, //bartender
        2 : true, //ppl
        3 : true, //singer
    },
    bakeryScene: {
        1 : true, //trail
        2 : true, //bread1
        3 : true, //bread2
        4 : true, //bread3
        5 : false, //id
        6 : true //fur
    },
    houseScene: {
        1 : true, //hat
        2 : false, //closet
        3 : true, //note
        4 : false, //chairs
        5 : false, //stairs
        6 : true //cake
    }
}