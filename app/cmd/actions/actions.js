const { cmdArguments } = require('../cli/arguments.js');
const { usage } = require('../cli/usage.js');
const { visualize, help } = require('../../archive-data-visualizer.js');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_VISUALIZE: 'visualize'
};

const actions = {
  help: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0),
    action: async () => await help(usage)
  },
  visualize: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_VISUALIZE),
    action: async () => await visualize(cmdArguments)
  }
};

const handleCondition = (condition) => {
  if (_isKnownAction()) {
    return condition;
  }
};

const _isKnownAction = () => !cmdArguments._unknown;

module.exports = {
  actions,
  COMMANDS
}