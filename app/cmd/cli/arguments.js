const commandLineArgs = require('command-line-args');

const cmdArgumentsDefinition = [
  {
    name: 'command',
    defaultOption: true,
    type: String,
    description: 'visualize, help commands. All these can be used as default commands without providing --command argument.'
  },
  {
    name: 'config',
    alias: 'c',
    type: String,
    description: 'File path to the configuration object'
  },
  {
    name: 'archive-data-downloader-config',
    type: String,
    description: 'File path to the configuration object of the archive-data-downloader tool. Optional, in that case the archive-data-downloader will scan for the configuration file in its default location'
  },
  {
    name: 'visualizationFilter',
    multiple: true,
    type: String,
    description: 'Define what visualization should be performed from the configuration object. If not defined, the tool will perform all visualizations. Each visualization is identified by its "id" value.'
  },
  {
    name: 'rangeFilter',
    multiple: true,
    type: String,
    description: 'Define what range should be performed for each visualization from the configuration object. If not defined, the tool will perform visualization for all defined ranges. Each range is identified by its "id" value.'
  }
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
}
