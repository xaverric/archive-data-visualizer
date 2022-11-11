const { CONSOLE_LOG } = require("../../logger/logger");
const buildAggregationData = require("./builder/aggregation-data-builder");
const buildChartData = require("./builder/chart-data-builder");
const buildTrendData = require("./builder/trend-data-builder");
const buildTableData = require("./builder/table-data-builder");
const template = require("./template/chart-template");

const createUu5String = (visualization, range, data, command) => {
    CONSOLE_LOG.info(`Building uu5String for visualization (${visualization.id}), range: (${range.id})`);
    return template(
        visualization,
        range,
        buildTrendData(visualization, range, data),
        buildChartData(visualization, range, data),
        buildTableData(data),
        buildAggregationData(visualization, range, data),
        command
    );
}

module.exports = createUu5String;