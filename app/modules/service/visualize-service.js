const { updateSection, updatePage } = require("../bookkit/client/bookkit-client");
const createUu5String = require("../bookkit/visualization/visualization");
const { readAllCsvFilesForVisualization } = require("../io/csv-data-reader");
const { CONSOLE_LOG } = require("../logger/logger");
const {download} = require("../archive-data-downloader/archive-data-downloader-helper");
const { emptyDir } = require("../io/fs-helper");

const processVisualizations = async (cmdArgs, configuration, token) => {
    for (const [index, visualization] of configuration.visualizations.entries()) {
        CONSOLE_LOG.info(`Processing visualization id: ${visualization.id} (${index+1} of ${configuration.visualizations.length})`);
        emptyDir(visualization);
        await updatePage(configuration.bookkit.uri, visualization, token);
        await _processRanges(cmdArgs, configuration, visualization, token);
    }
}

const _processRanges = async (cmdArgs, configuration, visualization, token) => {
    for (const [index, range] of visualization.ranges.entries()) {
        CONSOLE_LOG.info(`Processing range id: ${range.id} (${index+1} of ${visualization.ranges.length})`);
        let command = await download(visualization, range, cmdArgs);
        let data = await readAllCsvFilesForVisualization(visualization);
        let uu5StringContent = createUu5String(visualization, range, data, command);
        CONSOLE_LOG.info(`Uploading data into bookkit.`);
        await updateSection(configuration.bookkit.uri, visualization.pageCode, range.sectionCode, uu5StringContent, token);
    }
}

module.exports = {
    processVisualizations
}