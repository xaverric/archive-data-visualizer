const commandLineUsage = require('command-line-usage');
const { cmdArgumentsDefinition } = require('./arguments.js');
const packageJson = require("../../../package.json");

const usageDefinition = [
  {
    header: `archive-data-visualizer (${packageJson.version})`,
    content: 'Visualize your archive world!'
  },
  {
    header: 'Synopsis',
    content: '$archive-data-visualizer <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'help', summary: 'Display this help.' },
      { name: 'visualize', summary: 'Performs data visualization into the predefined bookkit page based on the configuration object.' }
    ]
  },
  {
    header: 'Parameters',
    optionList: cmdArgumentsDefinition
  }
];

const usage = commandLineUsage(usageDefinition);

module.exports = {
  usage
}
