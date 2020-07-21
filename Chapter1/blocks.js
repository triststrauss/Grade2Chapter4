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

Blockly.Blocks["repeat_block"] = {
    init: function () {
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setOutput(false);
        this.setColour("#16de34");
        this.setTooltip('Repeat block');
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(3, 0, 20), 'TIMES');
        this.appendStatementInput('DO')
            .appendField(new Blockly.FieldImage('assets/blocks/repeater.png', ARROW_BLOCK_HEIGHT * 1.6, ARROW_BLOCK_HEIGHT * 1.6));
    }
};
Blockly.JavaScript['repeat_block'] = Blockly.JavaScript['controls_repeat_ext'];

Blockly.Blocks['left_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/leftArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['left_block'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'move(ACTION_LEFT);\n';
    return code;
};


Blockly.Blocks['right_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/rightArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['right_block'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'move(ACTION_RIGHT);\n';
    return code;
};

Blockly.Blocks['up_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/upArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['up_block'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'move(ACTION_UP);\n';
    return code;
};

Blockly.Blocks['down_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/blocks/downArrow.png", ARROW_BLOCK_WIDTH, ARROW_BLOCK_HEIGHT));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['down_block'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'move(ACTION_DOWN);\n';
    return code;
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