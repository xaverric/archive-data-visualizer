const AGGREGATION_SETTINGS = require("../settings/aggregation-settings");

const COLUMNS = [
    { header: "Aggregation Type" },
    { header: "Name" },
    { header: "Value" }
]

/**
 * Builder function providing the data needed for visualization of aggregations
 * 
 * @param {*} visualization 
 * @param {*} data 
 * @returns 
 */
const build = (visualization, range, data) => {
    const tableData = _buildTableData(visualization, range, data);
    return [
        COLUMNS,
        !isEmptyArray(tableData) ? tableData : []
    ]
}

const _buildTableData = (visualization, range, data) => {
    return visualization.attributes
        .filter(attr => attr.type === "value")
        .flatMap(attr => {
            return range.aggregations?.map(aggregationType => getTableRowAggregatedData(aggregationType, attr, data));
        });
}

const getTableRowAggregatedData = (aggregationType, attribute, data) => {
    return {
        value: [
            aggregationType,
            attribute.name,
            roundValue(AGGREGATION_SETTINGS[aggregationType].action(data, attribute.valueKey))
        ],
        style: {
            colorSchema: attribute.aggregationColorSchema,
            bgStyle: "filled"
        }
    }
}

const isEmptyArray = array => {
    return !array || array.every(item => !item);
}

const roundValue = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
}

module.exports = build;