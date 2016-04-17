// global object of the game
var game,
    config = {
        IMG_PATH: 'src/assets/images/',
        SPRITESHEETS_PATH: 'src/assets/spritesheets/',
        SOUNDSS_PATH: 'src/assets/sounds/'
    };

function bootstrapGame(target) {

    // create our game object
    game = new Phaser.Game(1280, 720, Phaser.AUTO, target);

    // add new state to game
    game.state.add('Menu', Menu);
    game.state.add('Loading', Loading);
    game.state.add('Gameplay', Gameplay);

    // start first state
    game.state.start('Loading');
}

// bootstrap our game after loading of DOM content finished
document.addEventListener('DOMContentLoaded', function () {
    bootstrapGame('canvas-target');
});

///////////////////////////////////////////////
// STATES, TRANSITIONS, EVENTS
///////////////////////////////////////////////

var Loading = {
    preload: function () {
        game.load.image('loadingBg', config.IMG_PATH + 'loadingBg.png');
    },
    create: function () {
        // scale the canvas to browser's viewport, and the game world to 100% of viepowrt's width
        // not important for exercise
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.setResizeCallback(function () {
            var ratioW = window.innerWidth / game.width;
            var ratioH = window.innerHeight / game.height;
            game.scale.setUserScale(ratioW, ratioH);
        }, this);

        // specify what happens on complete of resource loading
        game.load.onLoadComplete.add(function () {
            game.state.start('Menu');
        }, this);

        var background = game.add.sprite(game.width / 2, game.height / 2, 'loadingBg');
        // move to center
        background.anchor.setTo(0.5);

        // load other resources - graphics, sounds, etc.
        game.load.image('btnPlay', config.IMG_PATH + 'playBtn.png');
        game.load.image('menuBg', config.IMG_PATH + 'menuBg.png');

        ////////////////////////////////////////
        // TODO: 9. Load box image

        ////////////////////////////
        // TODO: 1. Load spritesheet

        ////////////////////////////////////////
        // TODO: 15. Load sound

        // start Phaser loading routine
        game.load.start();
    }
};


var Menu = {
    init: function () {
        console.info('Initialization of Menu state.');
    },
    preload: function () {
        console.info('Preloading in Menu state.');
    },
    create: function () {
        console.info('Creation of Menu state.');

        var w = game.width,
            h = game.height;

        var background = game.add.sprite(w / 2, h / 2, 'menuBg');
        background.anchor.setTo(0.5);

        // 4-th argument defines function that will be called after clicking on button
        var btnPlay = game.add.button(w / 2, h / 2, 'btnPlay', Menu.startGame);
        btnPlay.anchor.setTo(0.5);
    },
    startGame: function () {
        game.state.start('Gameplay');
    }
};

var Gameplay = {
    create: function () {
        this.escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.escapeKey.onDown.add(Gameplay.goToMainMenu, this);


        ////////////////////////////////////////
        // TODO: 2. Add spritesheet to the game

        ////////////////////////////////////////
        // TODO: 4. Enable collision for player sprite

        ////////////////////////////////////////
        // TODO: 14. Set size of link body, a.k.a. collision area

        ////////////////////////////////////////
        // TODO: 10. Add box sprite to the game

        ////////////////////////////////////////
        // TODO: 11. Enable collision for box sprite

        ////////////////////////////////////////
        // TODO: 13. Make box immovable

        ////////////////////////////////////////
        // TODO: 7. Add character animations

        ////////////////////////////////////////
        // TODO: 3. Create keys for arrows

        ////////////////////////////////////////
        // TODO: 16. Add sound

    },
    update: function () {
        //////////////////////////////////////////////////
        // TODO: 6. Set zero velocity for each update call

        ////////////////////////////////////////
        // TODO: 5. React on arrows keys pressed
        // TODO: 8. Play animation

        ////////////////////////////////////////
        // TODO: 12. Perform collision check
        // TODO: 18. Play 'open' sound after collision
    },
    goToMainMenu: function () {
        game.state.start('Menu');
    },
    playSound: function () {
        ////////////////////////////////////////
        // TODO: 17. Play sound
    }
};