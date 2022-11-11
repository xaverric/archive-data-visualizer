const fs = require("fs-extra");
const path = require("path");
const csv = require("csvtojson");
const { CONSOLE_LOG} = require("../logger/logger");

const readAllCsvFilesForVisualization = async (visualization) => {
    CONSOLE_LOG.info(`Reading extracted data for visualization (${visualization.id})`);
    let files = fs.readdirSync(visualization.output)
    let csvItems = [];
    for (const file of files) {
        let csvContent = await csv().fromFile(path.resolve(visualization.output, file));
        csvItems.push(mapLabel(file, csvContent));
    }
    return csvItems.flatMap(item => item);
}

const mapLabel = (file, csvContent) => {
    return csvContent.map(item => {
        // use YYYY-MM-DD from file name as a label value - data per BD
        item.label = file.match(/\d{4}-\d{2}-\d{2}/g)[0];
        return item;
    })
}

module.exports = {
    readAllCsvFilesForVisualization
}