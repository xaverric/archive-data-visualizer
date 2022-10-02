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

const getMin = (data, columnName) => {
    return Math.min(...getValues(data, columnName));
}

const getMax = (data, columnName) => {
    return Math.max(...getValues(data, columnName));
}

const getAvg = (data, columnName) => {
    return getSum(data, columnName) / getValues(data, columnName).length;
}

const getSum = (data, columnName) => {
    return getValues(data, columnName).reduce((a, b) => a + b, 0);
}

const getMedian = (data, columnName) => {
    let values = getValues(data, columnName).sort((a, b) => {
        return a - b;
    });
    let half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    return (values[half - 1] + values[half]) / 2.0;
}

const getValues = (data, columnName) => data.map(dataItem => parseFloat(dataItem[columnName]));

module.exports = AGGREGATION_SETTINGS;