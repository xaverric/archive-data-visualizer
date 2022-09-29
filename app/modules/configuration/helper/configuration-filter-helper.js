/**
 * 
 * @param {*} array 
 * @param {*} keys 
 * @param {*} keyName 
 * @returns 
 */
const filterArrayByArrayOfKeys = (array, keys, keyName) => {
    return array.filter(item => keys.includes(item[keyName]));
}

/**
 * 
 * @param {*} configuration 
 * @param {*} cmdArgs 
 * @returns 
 */
const filterConfigurationByCmdArguments = (configuration, cmdArgs) => {
    if (cmdArgs.visualizationFilter) {
        configuration.visualizations = filterArrayByArrayOfKeys(configuration.visualizations, cmdArgs.visualizationFilter, "id");
    }
    if (cmdArgs.rangeFilter) {
        configuration.visualizations.forEach(visualization => {
            visualization.ranges = filterArrayByArrayOfKeys(visualization.ranges, cmdArgs.rangeFilter, "id");
        });
    }
    return configuration;
}

module.exports = {
    filterArrayByArrayOfKeys,
    filterConfigurationByCmdArguments
}