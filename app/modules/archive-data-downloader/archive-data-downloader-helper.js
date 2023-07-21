const { callCliCommand } = require("../../cmd/cmd-exec-module");
const { CONSOLE_LOG } = require("../logger/logger");

/**
 * Download data for the visualization using {@link https://github.com/xaverric/archive-data-downloader}
 * 
 * @param {*} visualization 
 * @param {*} range 
 * @param {*} cmdArgs 
 */
const download = async (visualization, range, cmdArgs) => {
    CONSOLE_LOG.info(`Downloading data using archive-data-downloader`);
    let command = _commandTemplate(visualization, range, cmdArgs);
    CONSOLE_LOG.info(`Download command: ${command}`);
    let result = await callCliCommand(command);
    CONSOLE_LOG.info(result);
    return command;
}

const _commandTemplate = (visualization, range, cmdArgs) => {
    let template = `archive-data-downloader download`;
    template = cmdArgs["archive-data-downloader-config"] ? `${template} --config ${cmdArgs["archive-data-downloader-config"]}` : template;
    template = `${template} --basePath ${visualization.basePath}`;
    template = `${template} --mode single`
    template = `${template} --folders ${visualization.statsFolder}`
    template = range.rangeType === "all" ? template : `${template} --filter --filterKeys ${range.filterKeys.join(" ")}`
    template = visualization.globalFilter ? `${template} --globalFilter ${visualization.globalFilter}` : template;
    template = `${template} --output ${visualization.tempFolderK8s}`
    template = `${template} --noprompt`;
    return template
}  

module.exports = {
    download
}