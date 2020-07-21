

function run()
{
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log(code);
    frameCount = 1;

    isPlaying = false;
    resetPlayer();
    createBalls();

    if (code !== '' )
    {
        eval(code);
    }
    else
    {
        alert('Empty script');
    }
}