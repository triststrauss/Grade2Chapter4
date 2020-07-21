

function run()
{
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log(code);
    frameCount = 1;

    resetPlayer();

    if (code !== '' )
    {
        eval(code);
    }
    else
    {
        alert('Empty script');
    }
}