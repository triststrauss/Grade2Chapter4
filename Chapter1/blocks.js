Blockly.Blocks['start_block'] = {
    init: function () {
        this.setNextStatement(true);
        this.setOutput(false);
        this.setColour("#f00");
        this.setTooltip('Starting block');
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/play.png", PLAY_BLOCK_WIDTH, PLAY_BLOCK_HEIGHT));
    }
};

Blockly.JavaScript['start_block'] = function (block) {
    return 'setPlaying(true);\n';
};

Blockly.Blocks['left_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/leftArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT))
            .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "steps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['left_block'] = function(block) {
    var dropdown_steps = block.getFieldValue('steps');
    // TODO: Assemble JavaScript into code variable.
    // d("DROP_DOWN : " + dropdown_steps);

    if(dropdown_steps == 1)
    {
        return 'walk(ACTION_LEFT,1);\n';
    }
    else if(dropdown_steps == 2)
    {
        return 'walk(ACTION_LEFT,2);\n';
    }
    else if(dropdown_steps == 3)
    {
        return 'walk(ACTION_LEFT,3);\n';
    }
    else if(dropdown_steps == 4)
    {
        return 'walk(ACTION_LEFT,4);\n';
    }
    else if(dropdown_steps == 5)
    {
        return 'walk(ACTION_LEFT,5);\n';
    }
};

Blockly.Blocks['right_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/rightArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT))
            .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "steps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['right_block'] = function(block) {
    var dropdown_steps = block.getFieldValue('steps');
    // TODO: Assemble JavaScript into code variable.
    // d("DROP_DOWN : " + dropdown_steps);

    if(dropdown_steps == 1)
    {
        return 'walk(ACTION_RIGHT,1);\n';
    }
    else if(dropdown_steps == 2)
    {
        return 'walk(ACTION_RIGHT,2);\n';
    }
    else if(dropdown_steps == 3)
    {
        return 'walk(ACTION_RIGHT,3);\n';
    }
    else if(dropdown_steps == 4)
    {
        return 'walk(ACTION_RIGHT,4);\n';
    }
    else if(dropdown_steps == 5)
    {
        return 'walk(ACTION_RIGHT,5);\n';
    }
};


Blockly.Blocks['up_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/upArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT))
            .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "steps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['up_block'] = function(block) {
    var dropdown_steps = block.getFieldValue('steps');
    // TODO: Assemble JavaScript into code variable.
    // d("DROP_DOWN : " + dropdown_steps);

    if(dropdown_steps == 1)
    {
        return 'walk(ACTION_UP,1);\n';
    }
    else if(dropdown_steps == 2)
    {
        return 'walk(ACTION_UP,2);\n';
    }
    else if(dropdown_steps == 3)
    {
        return 'walk(ACTION_UP,3);\n';
    }
    else if(dropdown_steps == 4)
    {
        return 'walk(ACTION_UP,4);\n';
    }
    else if(dropdown_steps == 5)
    {
        return 'walk(ACTION_UP,5);\n';
    }
};


Blockly.Blocks['down_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/downArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT))
            .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "steps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['down_block'] = function(block) {
    var dropdown_steps = block.getFieldValue('steps');
    // TODO: Assemble JavaScript into code variable.
    // d("DROP_DOWN : " + dropdown_steps);

    if(dropdown_steps == 1)
    {
        return 'walk(ACTION_DOWN,1);\n';
    }
    else if(dropdown_steps == 2)
    {
        return 'walk(ACTION_DOWN,2);\n';
    }
    else if(dropdown_steps == 3)
    {
        return 'walk(ACTION_DOWN,3);\n';
    }
    else if(dropdown_steps == 4)
    {
        return 'walk(ACTION_DOWN,4);\n';
    }
    else if(dropdown_steps == 5)
    {
        return 'walk(ACTION_DOWN,5);\n';
    }
};

Blockly.Blocks['collect_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("COLLECT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['collect_block'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'collectCrystal();\n';
    return code;
};

// switch (dropdown_steps)
// {
//     case 1:
//         d("STEP 1");
//         code = 'walk(ACTION_RIGHT,1);\n';
//         break;
//     case 2:
//         return 'walk(ACTION_RIGHT,2);\n';
//     case 3:
//         return 'walk(ACTION_RIGHT,3);\n';
//     case 4:
//         return 'walk(ACTION_RIGHT,4);\n';
//     case 5:
//         return 'walk(ACTION_RIGHT,5);\n';
//     default:
//         d("DEFAULT");
//         code = 'walk(ACTION_RIGHT,1);\n';
// }