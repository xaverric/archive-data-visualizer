const fs = require("fs-extra");
const path = require("path");
const os = require("os");

const { postProcessDataRange } = require("./helper/configuration-date-range-helper.js");
const { filterConfigurationByCmdArguments } = require("./helper/configuration-filter-helper.js");
const { cmdArguments } = require("../../cmd/cli/arguments.js");
const { mapPaths } = require("./helper/configuration-path-mapper-helper.js");
const { sortRanges } = require("./helper/configuration-range-sort-helper.js");
const { cleanFilterKeysAcrossRanges } = require("./helper/configuration-range-filter-helper.js");

const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.archive-data-visualizer', 'config.js');

const readConfiguration = async cmdArgs => {
    let configuration;

    if (cmdArgs.config) {
        configuration = await loadFile(path.resolve(cmdArgs.config));
    } else {
        configuration = await loadFile(CONFIG_DEFAULT_PATH);
    }
    configuration = filterConfigurationByCmdArguments(configuration, cmdArgs);
    configuration = postProcessDataRange(configuration, cmdArguments);
    configuration = sortRanges(configuration);
    configuration = mapPaths(configuration);
    configuration = cleanFilterKeysAcrossRanges(configuration);

    return configuration;
};

const loadFile = async path => {
    let file = require(path);
    if (typeof file === "function") {
      let loadedFile = await file();
      return loadedFile;
    }
    return file;
}

module.exports = {
    readConfiguration
}


