/**
 * Builder function providing the data needed for visualization of line chart
 * 
 * @param {*} visualization 
 * @param {*} data 
 * @returns 
 */
const build = (visualization, data) => {
    return [
        _buildSeries(visualization),
        _buildData(visualization, data)
    ]
}

const _buildSeries = (visualization) => {
    return visualization.attributes
        .filter(attr => attr.type === "value")
        .map(attr => {
            return {
                valueKey: attr.valueKey,
                name: attr.name,
                colorSchema: attr.colorSchema
            }
        });
}

const _buildData = (visualization, data) => {
    let keys = visualization.attributes.map(attr => attr.valueKey)
    return data.map(item => {
        return keys.reduce((accumulator, key) => {
            accumulator[key] = accumulator[key] || item[key];
            !item[key] && delete accumulator[key];
            return accumulator
        }, {});
    });
}

module.exports = build