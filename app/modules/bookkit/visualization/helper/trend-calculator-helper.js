const {getValues} = require("./math-helper");
const RANGE_TYPE_SETTINGS = require("../../../configuration/settings/range-type-settings");

const calculateTrend = (visualization, range, data) => {
    return visualization.attributes
        // calculate trend within each range and attribute combination within each visualization for the enabled attributes only
        .filter(attr => attr.monitorTrend?.enabled && range.monitorTrend?.enabled)
        .flatMap(attr => createTrendData(attr, range, data));
}

const createTrendData = (attr, range, data) => {
    return [
        calculateTrendForRange(attr, range, data),
        calculateTrendForMonitoredRange(attr, range, data)
    ];
}

const calculateTrendForRange = (attr, range, data) => {
    let yValues = getValues(data, attr.valueKey);
    let xValues = getArrayRangeFrom(1, yValues.length);
    let [slope, intercept] = calculateSlopeAndIntercept(xValues, yValues)
    let angle = calculateAngle(slope);

    data.forEach((dataItem, index) => {
        // update data according to formula 'y = xa + b'
        dataItem[attr.monitorTrend.valueKey] = index * slope + intercept
    });

    // metadata
    return {
        name: attr.monitorTrend.valueKey,
        angle: angle,
        slope: slope,
        direction: (slope < 0) ? "DOWN" : "UP"
    }
}

const calculateTrendForMonitoredRange = (attr, range, data) => {
    let monitoredRangeDaysCount = RANGE_TYPE_SETTINGS[range.monitorTrend?.rangeType].length * range.monitorTrend?.rangeSize;
    let values = getValues(data, attr.valueKey);
    let yValues = values.slice(-monitoredRangeDaysCount);
    let xValues = getArrayRangeFrom(1, values.length).slice(-monitoredRangeDaysCount);
    let [slope, intercept] = calculateSlopeAndIntercept(xValues, yValues)
    let angle = calculateAngle(slope);

    let attrName = `${attr.monitorTrend.valueKey}_monitored_${range.monitorTrend.rangeSize}${range.monitorTrend.rangeType}`;

    data.forEach((dataItem, index) => {
        // update data according to formula 'y = xa + b'
        if (index >= data.length - monitoredRangeDaysCount) {
            dataItem[attrName] = index * slope + intercept
        }
    });

    return {
        name: attrName,
        angle: angle,
        slope: slope,
        direction: (slope < 0) ? "DOWN" : "UP"
    }
}

const getArrayRangeFrom = (from, length) => {
    return Array.from({length: length}, (value, index) => index + from);
}

const calculateSlopeAndIntercept = (xValues, yValues) => {
    let xSum = sum(xValues);
    let ySum = sum(yValues);
    let xxSum = sumPower(xValues);
    let xySum = sumXMultiplyY(xValues, yValues)
    let count = xValues.length;

    let slope = calculateSlope(count, xSum, ySum, xxSum, xySum);
    let intercept = calculateIntercept(count, xSum, ySum, slope);

    return [slope, intercept];
}

const sum = array => {
    return array.reduce((acc, value) => acc + value, 0)
}

const sumPower = array => {
    return array.reduce((acc, value) => acc + (value * value), 0);
}

const sumXMultiplyY = (arrayX, arrayY) => {
    return arrayX.reduce((acc, value, index) => acc + (value * arrayY[index]), 0);
}

const calculateSlope = (count, xSum, ySum, xxSum, xySum) => {
    return (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
}

const calculateIntercept = (count, xSum, ySum, slope) => {
    return (ySum / count) - (slope * xSum) / count;
}

const calculateAngle = (slope) => {
    let theta = Math.atan(slope);
    theta *= (180 / Math.PI);
    return (theta*100)/360;
}

module.exports = {
    calculateTrend
}