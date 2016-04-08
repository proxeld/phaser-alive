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
        // TODO: n. Load box image
        game.load.image('box', config.IMG_PATH + 'box.png');

        // loading spritesheet
        ////////////////////////////
        // TODO: 0. Load spritesheet
        game.load.spritesheet('link', config.SPRITESHEETS_PATH + 'link.png', 90, 90);

        ////////////////////////////////////////
        // TODO: n. Load sound
        game.load.audio('open', config.SOUNDSS_PATH + 'open.mp3');

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
        // TODO: 1. Add spritesheet to the game
        this.linkSprite = game.add.sprite(game.width / 2 - 50, 300, 'link');

        // enable collision with tiles
        game.physics.enable(this.linkSprite, Phaser.Physics.ARCADE);

        ////////////////////////////////////////
        // TODO: n. Set size of link body, a.k.a. collision area
        this.linkSprite.body.setSize(28, 54, 28, 18);

        ////////////////////////////////////////
        // TODO: n. Add box sprite to the game
        this.boxSprite = game.add.sprite(100, game.height/2 - 50, 'box');
        game.physics.enable(this.boxSprite, Phaser.Physics.ARCADE);
        this.boxSprite.body.immovable = true;

        ////////////////////////////////////////
        // TODO: n. Add character animations
        this.linkSprite.animations.add('walkLeft', [0, 1, 2, 3, 4]);
        this.linkSprite.animations.add('walkRight', [5, 6, 7, 8, 9]);
        this.linkSprite.animations.add('walkUp', [10, 11, 12, 13, 14]);
        this.linkSprite.animations.add('walkDown', [15, 16, 17, 18, 19]);

        ////////////////////////////////////////
        // TODO: n. Create keys for arrows
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        ////////////////////////////////////////
        // TODO: n. Add sound
        this.openSound = game.add.audio('open');

    },
    update: function () {
        //////////////////////////////////////////////////
        // TODO: n. Set zero velocity for each update call
        this.linkSprite.body.velocity.x = 0;
        this.linkSprite.body.velocity.y = 0;

        ////////////////////////////////////////
        // TODO: n. React on arrows keys pressed
        if (this.leftKey.isDown) {
            this.linkSprite.body.velocity.x = -150;

            ////////////////////////////////////////
            // TODO: n. Play animation
            this.linkSprite.animations.play('walkLeft', 6);
        }
        else if (this.rightKey.isDown) {
            this.linkSprite.body.velocity.x = 150;

            ////////////////////////////////////////
            // TODO: n. Play animation
            this.linkSprite.animations.play('walkRight', 6);
        }
        else if (this.upKey.isDown) {
            this.linkSprite.body.velocity.y = -150;

            ////////////////////////////////////////
            // TODO: n. Play animation
            this.linkSprite.animations.play('walkUp', 6);
        }
        else if (this.downKey.isDown) {
            this.linkSprite.body.velocity.y = 150;

            ////////////////////////////////////////
            // TODO: n. Play animation
            this.linkSprite.animations.play('walkDown', 6);
        }

        ////////////////////////////////////////
        // TODO: n. Perform collision check
        // TODO: n. Play 'open' sound after collision
        game.physics.arcade.collide(this.linkSprite, this.boxSprite, this.playSound, null, this);
    },
    goToMainMenu: function () {
        game.state.start('Menu');
    },
    playSound: function () {
        ////////////////////////////////////////
        // TODO: n. Play sound
        this.openSound.play();
    }
};