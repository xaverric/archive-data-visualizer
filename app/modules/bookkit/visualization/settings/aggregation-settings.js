const { getMin, getMax, getAvg, getSum, getMedian } = require("../helper/math-helper");

const AGGREGATION_SETTINGS = {
    "MIN": {
        action: (data, column) => getMin(data, column)
    },
    "MAX": {
        action: (data, column) => getMax(data, column)
    },
    "AVG": {
        action: (data, column) => getAvg(data, column)
    },
    "SUM": {
        action: (data, column) => getSum(data, column)
    },
    "MEDIAN": {
        action: (data, column) => getMedian(data, column)
    }
}

module.exports = AGGREGATION_SETTINGS;