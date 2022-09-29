const RANGE_TYPE_SETTINGS = require("../settings/range-type-settings");

const sortRanges = configuration => {
    configuration.visualizations.forEach(visualization => {
        visualization.ranges = visualization.ranges.sort((a,b)=> {    
            return RANGE_TYPE_SETTINGS[a.rangeType].priority - RANGE_TYPE_SETTINGS[b.rangeType].priority || 
                a.rangeSize - b.rangeSize;
        })
    });
    return configuration
}

module.exports = {
    sortRanges
}