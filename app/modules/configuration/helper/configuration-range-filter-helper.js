/**
 * filter out same filter keys from consecutive ranges to eliminate multiple download of same data
 * 
 * @param {*} configuration 
 * @returns 
 */
const cleanFilterKeysAcrossRanges = (configuration) => {
    configuration.visualizations.forEach(visualization => {
        visualization.ranges = visualization.ranges.reduce(cleanRanges, []);
    });
    return configuration;
}

const cleanRanges = (accummulator, range) => {
    let previousRangesFilterKeys = accummulator.flatMap(range => range.filterKeys);
    range.filterKeys = getUniqueKeys(range.filterKeys, previousRangesFilterKeys);
    accummulator.push(range);
    return accummulator;
}

const getUniqueKeys = (currentKeys, previousKeys) => {
    return currentKeys.filter(key => !previousKeys.includes(key));
}

module.exports = {
    cleanFilterKeysAcrossRanges
}