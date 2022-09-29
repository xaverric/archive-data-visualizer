const { LOG } = require("../../../logger/logger");
const buildChartData = require("./builder/chart-data-builder");
const buildTableData = require("./builder/table-data-builder");
const template = require("./template/chart-template");

const createUu5String = (visualization, range, data, command) => {
    LOG.info(`Building uu5String for visualization (${visualization.id}), range: (${range.id})`);
    const [chartSeries, chartData] = buildChartData(visualization, data);
    const [tableColumns, tableData] = buildTableData(data);
    return template(visualization, range, chartSeries, chartData, tableColumns, tableData, command);
}

module.exports = createUu5String;