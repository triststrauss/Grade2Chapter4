const SPEED = 3;

const PLAY_BLOCK_HEIGHT = 50;
const PLAY_BLOCK_WIDTH = 100;

const ARROW_BLOCK_HEIGHT = 25;
const ARROW_BLOCK_WIDTH = 50;

const PLAYER_START_X = 40;
const PLAYER_START_Y = 40;

const DISTANCE_TO_TRAVEL = 80;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;

const ACTION_LEFT = 1;
const ACTION_RIGHT = 2;
const ACTION_UP = 3;
const ACTION_DOWN = 4;
const ACTION_PICK = 5;

const ANIM_LEFT = 'left';
const ANIM_RIGHT = 'right';
const ANIM_TURN = 'turn';


const ANIM_IDLE = 'idle';
const ANIM_COLLECT = 'collect';

var isMoving;
var velocityX = 0, velocityY = 0;
var currentDestinationX, currentDestinationY;
actionsQ = [];

var isPlaying;

var grid;

var player;
var balls = [];


var modalEle = document.getElementById("modal");
var successContentEle = document.getElementById("success-content");
var FailureContentEle = document.getElementById("failure-content");
var endContentEle = document.getElementById("end-content");
var TipContentEle = document.getElementById("tip-content");
var TipTextEle = document.getElementById("tip_text");
var outOfBoundsContentEle = document.getElementById("outOfBound-content");

var charSelectEle = document.getElementById("character-select-content");

var lesson_select = document.getElementById("lesson-select");

var currentLesson = 1;

var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    parent: document.getElementById("right"),
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload()
{
    this.load.image('ball','assets/gameObjects/crystal.png');
    // this.load.spritesheet('ball','assets/gameObjects/balls.png',{frameWidth: 17,frameHeight: 17});

    this.load.spritesheet('dude', 'assets/gameObjects/dude.png', { frameWidth: 32, frameHeight: 48 });

    // this.load.image('star', 'assets/star.png');

    this.load.image('sparks', 'assets/particle/blue.png');
    this.load.json('emitter', 'assets/particle/sparks.json'); // see './particle editor.js'

    this.load.audio("music",["assets/audio/music.mp3"]);
    this.load.audio("collect",["assets/audio/collect.mp3"]);
    this.load.audio("fail",["assets/audio/fail.wav"]);
}

var gridCells = [];
var text;

var music,collectSound,failSound;

function create()
{
    game = this;
    grid = this.add.grid(config.width / 2, config.height / 2, config.width, config.height, 80, 80, 0x057605);
    var k = 0;
    for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 6; j++)
        {
            var posX = 40 + (i * 80) ;
            var posY = 40 + (j * 80);
            gridCells[k] = new GridCells(k,posX,posY);
            k++;
        }
    }
    cursors = this.input.keyboard.createCursorKeys();



    setPlayerAnimation(this);
    setBallAnimation(this);
    createPlayer();
    changeLesson(currentLesson);

    collectSound = this.sound.add("collect");
    failSound = this.sound.add("fail");
    music = this.sound.add("music");
    var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek:0,
        loop: true,
        delay :0,
    };
    music.play(musicConfig);
}

function createPlayer()
{
    player = game.add.sprite(50, 50, 'dude');
    player.setScale(1.5);
    player.depth = 10;
}

// function createBalls()
// {
//     for (let i = 0; i < balls.length; i++)
//     {
//         removeBallAssets(balls[i])
//     }
//
//     for (let i = 0; i < balls.length; i++)
//     {
//         balls.pop();
//     }
//
//     switch (currentLesson)
//     {
//         case 1:
//             balls[0] = new Ball(0,game.add.image(150,50,'ball'),1,true);
//             balls[1] = new Ball(1,game.add.sprite(250,450,'ball'),10,false);
//             balls[2] = new Ball(2,game.add.sprite(150,350,'ball'),15,false);
//             balls[2] = new Ball(2,game.add.sprite(150,350,'ball'),15,false);
//             break;
//         case 2:
//             balls[0] = new Ball(0,game.add.image(250,350,'ball'),1,false);
//             balls[1] = new Ball(1,game.add.image(250,550,'ball'),4,false);
//             balls[2] = new Ball(2,game.add.image(150,150,'ball'),9,true);
//             break;
//         case 3:
//             balls[0] = new Ball(0,game.add.image(250,350,'ball'),1,false);
//             balls[1] = new Ball(1,game.add.image(550,150,'ball'),4,true);
//             balls[2] = new Ball(1,game.add.image(150,250,'ball'),6,true);
//             balls[3] = new Ball(2,game.add.image(150,150,'ball'),9,false);
//             balls[4] = new Ball(2,game.add.image(150,350,'ball'),10,true);
//             balls[5] = new Ball(2,game.add.image(350,450,'ball'),16,true);
//             break;
//         case 4:
//             balls[0] = new Ball(0,game.add.image(250,150,'ball'),1,true);
//             balls[1] = new Ball(1,game.add.image(250,550,'ball'),4,false);
//             balls[2] = new Ball(2,game.add.image(150,550,'ball'),9,true);
//             balls[3] = new Ball(3,game.add.image(550,50,'ball'),11,true);
//             balls[4] = new Ball(4,game.add.image(250,350,'ball'),8,false);
//             balls[5] = new Ball(5,game.add.image(50,450,'ball'),17,true);
//             break;
//         case 5:
//             balls[0] = new Ball(0,game.add.image(250,150,'ball'),1,true);
//             balls[1] = new Ball(1,game.add.image(250,550,'ball'),4,false);
//             balls[2] = new Ball(2,game.add.image(150,550,'ball'),9,true);
//             balls[3] = new Ball(3,game.add.image(550,50,'ball'),11,true);
//             balls[4] = new Ball(4,game.add.image(250,350,'ball'),8,false);
//             balls[5] = new Ball(5,game.add.image(50,450,'ball'),17,true);
//             break;
//     }
// }

function createBalls()
{
    for (let i = 0; i < balls.length; i++)
    {
        removeBallAssets(balls[i])
    }

    balls = [];

    d("Balls Length On Create : " + balls.length)
    switch (currentLesson)
    {
        case 1://Smallest number

            balls[0] = new Ball(0,2,1,true);
            balls[1] = new Ball(1,19,10,false);
            balls[2] = new Ball(2,28,15,false);
            balls[3] = new Ball(2,17,31,false);
            break;
        case 2://Biggest number

            balls[0] = new Ball(0,7,1,false);
            balls[1] = new Ball(0,9,25,true);
            balls[2] = new Ball(1,23,4,false);
            balls[3] = new Ball(1,4,15,false);
            balls[4] = new Ball(2,26,9,false);
            break;
        case 3://All even numbers

            balls[0] = new Ball(0,8,1,false);
            balls[1] = new Ball(1,20,4,true);
            balls[2] = new Ball(1,22,6,true);
            balls[3] = new Ball(2,4,9,false);
            balls[4] = new Ball(2,6,10,true);
            balls[5] = new Ball(2,29,17,false);
            break;
        case 4: //All odd numbers
            balls[0] = new Ball(0,20,1,true);
            balls[1] = new Ball(1,21,4,false);
            balls[2] = new Ball(2,4,9,true);
            balls[3] = new Ball(3,34,11,true);
            balls[4] = new Ball(4,7,8,false);
            balls[5] = new Ball(5,8,17,true);
            break;
        case 5: //Ascending order (1-20)
            balls[0] = new Ball(0,13,1,true);
            balls[1] = new Ball(1,27,4,true);
            balls[2] = new Ball(2,17,9,true);
            balls[3] = new Ball(3,5,11,true);
            balls[4] = new Ball(4,35,15,true);
            balls[5] = new Ball(5,32,20,true);
            break;
        case 6 : //Ascending order (80-99)
            balls[0] = new Ball(0,6,81,true);
            balls[1] = new Ball(1,18,85,true);
            balls[2] = new Ball(2,29,88,true);
            balls[3] = new Ball(3,27,91,true);
            balls[4] = new Ball(4,19,97,true);
            balls[5] = new Ball(5,3,99,true);
            break;
        case 7 : //Descending order (1 -20)
            balls[0] = new Ball(0,13,20,true);
            balls[1] = new Ball(1,20,17,true);
            balls[2] = new Ball(2,35,14,true);
            balls[3] = new Ball(3,22,11,true);
            balls[4] = new Ball(4,10,7,true);
            balls[5] = new Ball(5,2,3,true);
            break;
        case 8 : //Ascending order multiple of 10.
            balls[0] = new Ball(0,13,10,true);
            balls[1] = new Ball(1,31,30,true);
            balls[2] = new Ball(2,33,40,true);
            balls[3] = new Ball(3,21,60,true);
            balls[4] = new Ball(4,23,80,true);
            balls[5] = new Ball(5,5,90,true);
            break;
        case 9 : //Ascending order multiple of 100.
            balls[0] = new Ball(0,3,200,true);
            balls[1] = new Ball(1,5,300,false);
            balls[2] = new Ball(2,17,400,true);
            balls[3] = new Ball(3,36,600,true);
            balls[4] = new Ball(4,34,700,false);
            balls[5] = new Ball(5,21,900,true);
            break;
        case 10 : //Descending order multiple of 10.
            balls[0] = new Ball(0,7,90,true);
            balls[1] = new Ball(1,9,70,false);
            balls[2] = new Ball(2,21,60,true);
            balls[3] = new Ball(3,23,50,true);
            balls[4] = new Ball(4,35,30,false);
            balls[5] = new Ball(5,31,10,true);
            break;
        case 11 :  //Descending order multiple of 100.
            balls[0] = new Ball(0,3,800,true);
            balls[1] = new Ball(1,15,700,false);
            balls[2] = new Ball(2,17,600,true);
            balls[3] = new Ball(3,29,400,true);
            balls[4] = new Ball(4,26,300,false);
            balls[5] = new Ball(5,14,100,true);
            break;
    }
}

function setPlayerAnimation(c)
{
    c.anims.create({
        key: ANIM_LEFT,
        frames: c.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    c.anims.create({
        key: ANIM_TURN,
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    c.anims.create({
        key: ANIM_RIGHT,
        frames: c.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

}

function setBallAnimation(c)
{
    c.anims.create({
        key: ANIM_IDLE,
        frames: [ { key: 'ball', frame: 2 } ],
        frameRate:20,
        repeat:1
    });

    c.anims.create({
        key: ANIM_COLLECT,
        frames: c.anims.generateFrameNumbers('ball', { start: 1, end: 6 }),
        frameRate:20,
        repeat:1
    });
}

var currentGridCellId;

function update()
{
    if (!isMoving)
    {
        if (actionsQ.length > 0)
        {
            var action = actionsQ.shift();

            if (action === ACTION_RIGHT || action === ACTION_LEFT)
            {
                if(action === ACTION_RIGHT)
                {
                    velocityX = 1;
                    player.anims.play('right', true);
                }
                else
                {
                    velocityX = -1;
                    player.anims.play('left', true);
                }

                currentDestinationX = player.x + DISTANCE_TO_TRAVEL * velocityX;
                d('DESTINATION X : ' + currentDestinationX + " : "+velocityX);
                isMoving = true;
            }
            else if (action === ACTION_UP || action === ACTION_DOWN)
            {
                velocityY = action === ACTION_DOWN ? 1 : -1;
                currentDestinationY = player.y + DISTANCE_TO_TRAVEL * velocityY;
                d('DESTINATION Y : ' + currentDestinationY);
                isMoving = true;
            }
            else if(action === ACTION_PICK)
            {
                checkForPickUp();
            }
        }
    }
    else
    {
        player.x += SPEED * velocityX;
        player.y += SPEED * velocityY;

        if (Math.abs(player.x - currentDestinationX) < SPEED)
        {
            velocityX = 0;
        }

        if(Math.abs(player.y - currentDestinationY) < SPEED)
        {
            velocityY = 0;
        }

        if(velocityX === 0 && velocityY === 0)
        {
            isMoving = false;
            player.anims.play('turn',true);
        }
    }

    var gridCell = getGridCell(player.x,player.y);

    if(gridCell !== null)
    {
        currentGridCellId = gridCell.id;
    }
    else
    {
        currentGridCellId = 0;
    }

    if(player.x < 0 || player.x > config.width || player.y < 0 || player.y > config.height)
    {
        modalEle.hidden = false;
        outOfBoundsContentEle.hidden = false;
    }
}


function walk(action, stepsCount)
{
    if(!isPlaying)
        return;

    for (let i = 0; i < stepsCount; i++)
    {
        actionsQ.push(action);
        d("push " + action);
    }

}

function collectCrystal()
{
    actionsQ.push(ACTION_PICK);
    d("push " + ACTION_PICK);
}

function checkForPickUp()
{
    d("CHECK FOR PICK :" + balls.length);

    for (let i = 0; i < balls.length; i++)
    {
        d(balls[i].gridCell.id + "  -  " + currentGridCellId);

        if(balls[i].gridCell.id === currentGridCellId)
        {

            // balls[i].gameObject.anims.play(ANIM_COLLECT,true);
            balls[i].isPicked = true;
            removeBallAssets(balls[i]);
            var numberPicked = balls[i].number;
            collectSound.play();
            d("NUMBER PICKED " + numberPicked);

            switch(currentLesson)
            {
                case 1:
                case 2:
                    if(balls[i].isCorrectBall)
                        displayTaskSuccess();
                    else
                        displayTaskFailed();
                break;
                case 3 :
                case 4 :
                    var allCollected = true;
                    if(balls[i].isCorrectBall)
                    {
                        for (let j = 0; j < balls.length; j++)
                        {
                            if(balls[j].isCorrectBall && !balls[j].isPicked)
                                allCollected = false;

                        }

                        if(allCollected)
                            displayTaskSuccess();
                    }
                    else
                        displayTaskFailed();
                break;
                case 5:
                case 6:
                case 8:
                case 9:
                    for (let j = 0; j < balls.length; j++)
                    {
                        if(!balls[j].isPicked)
                        {
                            if(numberPicked > balls[j].number)
                            {
                                displayTaskFailed();
                            }
                        }
                    }

                    var allCollected = true;

                    for (let j = 0; j < balls.length; j++) {
                        if(!balls[j].isPicked)
                            allCollected = false;
                    }

                    if(allCollected)
                        displayTaskSuccess();
                    break;
                case 7:
                case 10:
                case 11:
                    for (let j = 0; j < balls.length; j++)
                    {
                        if(!balls[j].isPicked)
                        {
                            if(numberPicked < balls[j].number)
                            {
                                displayTaskFailed();
                            }
                        }
                    }

                    var allCollected = true;
                    d("Balls.Lenght : "  +balls.length);
                    for (let j = 0; j < balls.length; j++)
                    {
                        if(!balls[j].isPicked)
                            allCollected = false;
                    }

                    if(allCollected)
                        displayTaskSuccess();
                    break;
            }
        }
    }
}

function removeBallAssets(ball)
{
    ball.gameObject.destroy();
    ball.text.destroy();
    if(ball.containsEmitter)
    {
        ball.emitter.remove();
    }
}

function displayTaskFailed()
{
    d("Task Failed");
    failSound.play();
    modalEle.hidden = false;
    FailureContentEle.hidden = false;
}

function displayTaskSuccess()
{
    d("Task Success");
    modalEle.hidden = false;
    if(currentLesson === 11)
        endContentEle.hidden = false;
    else
        successContentEle.hidden = false;
}


function setPlaying(isPlay) {
    isPlaying = isPlay;
}

function resetPlayer()
{
    player.x = PLAYER_START_X;
    player.y = PLAYER_START_Y;

    currentDestinationX = player.x;
    currentDestinationY = player.y;

    player.anims.play('turn',true);

    velocityX = 0;
    velocityY = 0;
    actionsQ = [];
    isMoving = false;
}

function d(str) {
    console.log(str);
}

class GridCells
{
    constructor(id,posX,posY)
    {
        this.id = id;
        this.left = posX - GRID_WIDTH/2;
        this.right = posX + GRID_WIDTH/2;
        this.top = posY - GRID_HEIGHT/2;
        this.bottom = posY + GRID_HEIGHT/2;
    }
}


class Ball
{
    constructor(id,index,number,correctBall)
    {
        var posX = 40 + ((index - 1) % 6) * 80;
        var posY = 40 + Math.floor((index - 1)/6) * 80;
        d("Position X :" + posX);
        d("Position Y :" + posY);
        this.id = id;
        this.gameObject = game.add.image(posX,posY,'ball');
        this.gameObject.scale = 0.8;
        this.gridCell = getGridCell(posX,posY);
        this.isPicked = false;
        this.number = number;
        this.isCorrectBall = correctBall;
        if(correctBall && currentLesson <= 4)
        {
            this.containsEmitter = true;
            var particles = game.add.particles('sparks');
            this.emitter = particles.createEmitter(game.cache.json.get('emitter'));
            this.emitter.setPosition(posX, posY);
        }
        else
            this.emitter = null;

        var textPosX;
        if(number < 10)
            textPosX = posX - 10;
        else if(number < 100)
            textPosX = posX - 15;
        else
            textPosX = posX- 20;
        this.text = game.add.text(textPosX, posY - 14, ''+number, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color : '#000' , fontSize:'25px', fontStyle:'bold'});
        this.gameObject.depth = 1;
        this.text.depth = 2;
    }
}

function getGridCell(x, y)
{
    for (let i = 0; i < gridCells.length; i++)
    {
        var g = gridCells[i];
        // d(g.id  + " : " + g.left + " : " + g.right + " : " + g.top + " : " + g.bottom);
        if(x > g.left && x < g.right && y > g.top && y < g.bottom)
        {
            return g;
        }
    }

    return null;
}

function changeLesson(q)
{
    var selected = lesson_select.selectedIndex;
    selected += 1;
    if (q != null)
    {
        selected = q;
    }
    currentLesson = selected;

    lesson_select.selectedIndex = currentLesson - 1;

    d("CURRENT LESSON : " + currentLesson);
    workspace.clear();
    // createGameObjects();
    resetPlayer();
    createBalls();
    setPlaying(false);
    displayTask(currentLesson);

    d("TOTAL BALLS " + balls.length);

    modalEle.hidden = true;
    successContentEle.hidden = true;
    FailureContentEle.hidden = true;
    endContentEle.hidden = true;
    outOfBoundsContentEle.hidden = true;
}

function displayTip(index)
{
    FailureContentEle.hidden = true;
    TipContentEle.hidden = false;
    modalEle.hidden = false;


    switch (index)
    {
        case 1:
            TipTextEle.innerHTML = '1 is smaller than 3';
            break;
        case 2:
            TipTextEle.innerHTML = '10 is bigger than 1';
            break;
        case 3:
            TipTextEle.innerHTML = '2,4,6,...';
            break;
        case 4:
            TipTextEle.innerHTML = '1,3,5,...';
            break;
        case 5:
            TipTextEle.innerHTML = '1,2,3,...';
            break;
        case 6:
            TipTextEle.innerHTML = '81,82,83,...';
            break;
        case 7:
            TipTextEle.innerHTML = '20,19,18,...';
            break;
        case 8:
            TipTextEle.innerHTML = '10,20,30,...';
            break;
        case 9:
            TipTextEle.innerHTML = '100,200,300,...';
            break;
        case 10:
            TipTextEle.innerHTML = '90,80,70,...';
            break;
        case 11:
            TipTextEle.innerHTML = '900,800,700,...';
            break;
    }

}

function displayTask(index)
{
    var description = document.getElementById('description-text');

    switch (index) {
        case 1:
            description.innerHTML = "Collect smallest number diamond.";
            break;
        case 2:
            description.innerHTML = "Collect biggest number diamond.";
            break;
        case 3:
            description.innerHTML = "Collect all even number diamonds.";
            break;
        case 4:
            description.innerHTML = "Collect all odd number diamonds.";
            break;
        case 5:
            description.innerHTML = "Collect all diamonds in ascending order.";
            break;
        case 6:
            description.innerHTML = "Collect all diamonds in ascending order.";
            break;
        case 7:
            description.innerHTML = "Collect all diamonds in descending order.";
            break;
        case 8:
            description.innerHTML = "Collect all diamonds in ascending order.";
            break;
        case 9:
            description.innerHTML = "Collect all diamonds in ascending order.";
            break;
        case 10:
            description.innerHTML = "Collect all diamonds in descending order.";
            break;
        case 11:
            description.innerHTML = "Collect all diamonds in descending order.";
            break;
    }
}

var solutionTextEle = document.getElementById("solution-text");
var solutionContentEle = document.getElementById("solution-content");

var codeP;

function displayPySol()
{
    // solutionContentEle.hidden = false;
    // solutionTextEle.hidden = false;
    // modalEle.hidden = false;
    //
    // codeP = Blockly.Python.workspaceToCode(workspace);
    //
    // codeP = codeP.split("for").join("<br>for");
    //
    // solutionTextEle.innerHTML = codeP ;

    solutionContentEle.hidden = false;
    solutionTextEle.hidden = false;
    modalEle.hidden = false;

    codeJS  = Blockly.JavaScript.workspaceToCode(workspace);
    // eval(codeJS);
    // codeJS.replace(";", "<BR>");
    d("Disply JS solution" + codeJS);
    solutionTextEle.innerHTML = codeJS;
}

var codeJS;
function displayJsSol()
{
    solutionContentEle.hidden = false;
    solutionTextEle.hidden = false;
    modalEle.hidden = false;

    codeJS  = Blockly.JavaScript.workspaceToCode(workspace);
    // eval(codeJS);
    // codeJS.replace(";", "<BR>");
    d("Disply JS solution" + codeJS);
    solutionTextEle.innerHTML = codeJS;
}

function hideCodeSolution()
{
    solutionContentEle.hidden = true;
    solutionTextEle.hidden = true;
    modalEle.hidden = true;
}
