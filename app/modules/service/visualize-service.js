const { updateSection, updatePage } = require("../bookkit/client/bookkit-client");
const createUu5String = require("../bookkit/visualization/line-chart/line-chart");
const { readAllCsvFilesForVisualization } = require("../io/csv-data-reader");
const { CONSOLE_LOG } = require("../logger/logger");
const {download} = require("../archive-data-downloader/archive-data-downloader-helper");
const { emptyDir } = require("../io/fs-helper");

const processVisualizations = async (cmdArgs, configuration, token) => {
    for (const visualization of configuration.visualizations) {
        CONSOLE_LOG.info(`Processing visualization id: ${visualization.id}`);
        emptyDir(visualization);
        await updatePage(configuration.bookkit.uri, visualization, token);
        await _processRanges(cmdArgs, configuration, visualization, token);
    }
}

const _processRanges = async (cmdArgs, configuration, visualization, token) => {
    for (const range of visualization.ranges) {
        CONSOLE_LOG.info(`Processing range id: ${range.id}`);
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