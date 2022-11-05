const commandLineUsage = require('command-line-usage');
const { cmdArgumentsDefinition } = require('./arguments.js');
const packageJson = require("../../../package.json");

const usageDefinition = [
  {
    header: `archive-data-downloader (${packageJson.version})`,
    content: 'Visualize your archive world!'
  },
  {
    header: 'Synopsis',
    content: '$archive-data-downloader <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'help', summary: 'Display this help.' },
      { name: 'download', summary: 'Performs data download from the k8s container' }
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
