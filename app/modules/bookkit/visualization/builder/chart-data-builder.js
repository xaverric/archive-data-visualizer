/**
 * Builder function providing the data needed for visualization of chart
 *
 * @param visualization
 * @param range
 * @param data
 * @returns {[undefined, undefined]}
 */
const build = (visualization, range, data) => {
    return [
        _buildSeries(visualization, range),
        _buildData(visualization, range, data)
    ]
}

const _buildSeries = (visualization, range) => {
    return visualization.attributes
        .filter(attr => attr.type === "value")
        .flatMap(attr => _duplicateAttributeIfMonitored(attr, range))
        .map(attr => {
            return {
                valueKey: attr.valueKey,
                name: attr.name,
                colorSchema: attr.colorSchema,
                type: attr.chartType
            }
        });
}

const _buildData = (visualization, range, data) => {
    let keys = visualization.attributes
        .flatMap(attr => _duplicateAttributeIfMonitored(attr, range))
        .map(attr => attr.valueKey)

    return data.map(item => {
        return keys.reduce((accumulator, key) => {
            accumulator[key] = accumulator[key] || item[key];
            !item[key] && delete accumulator[key];
            return accumulator
        }, {});
    });
}

const _duplicateAttributeIfMonitored = (attr, range) => {
    let result = [];
    result.push(attr);
    if (attr.monitorTrend?.enabled && range.monitorTrend?.enabled) {
        // add trend line covering whole interval
        result.push({
            ...attr,
            ...attr.monitorTrend
        });
        // add trend line covering specific monitored interval
        result.push({
            ...attr,
            ...attr.monitorTrend,
            valueKey: `${attr.monitorTrend.valueKey}_monitored_${range.monitorTrend.rangeSize}${range.monitorTrend.rangeType}`,
            name: `${attr.monitorTrend.name} (Monitored ${range.monitorTrend.rangeSize} ${range.monitorTrend.rangeType} back)`
        })
    }
    return result;
}

module.exports = build