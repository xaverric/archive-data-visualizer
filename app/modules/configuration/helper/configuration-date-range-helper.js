const RANGE_TYPE_SETTINGS = require("../settings/range-type-settings");


const postProcessDataRange = (configuration, cmdArguments) => {
    configuration.visualizations.forEach(visualization => {
        visualization.ranges.forEach(range => {
            const [startDate, endDate] = _calculateDatesBasedOnRangeType(range);
            range.filterKeys = _generateDateRange(startDate, endDate);
        })
    });
    return configuration;
}

const _calculateDatesBasedOnRangeType = (range) => {
    let startDate;
    let endDate;
    if (range.rangeType === "custom") {
        startDate = Date.parse(range.rangeStart)
        endDate = Date.parse(range.rangeEnd)
    } else {
        endDate = new Date();
        startDate = (endDate - 1000 * 60 * 60 * 24 * RANGE_TYPE_SETTINGS[range.rangeType].length * range.rangeSize);
    }
    return [startDate, endDate]
}

const _generateDateRange = (startDate, endDate) => {
    let dateRange = [];
    for(let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
        dateRange.push(_formatDate(new Date(date)));
    }
    return dateRange;
}

const _formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    if (month <= 9) {
        month = '0' + month;
    }
    if (day <= 9) {
        day = '0' + day;
    } 

    return [year, month, day].join('-');
}

module.exports = {
    postProcessDataRange
}