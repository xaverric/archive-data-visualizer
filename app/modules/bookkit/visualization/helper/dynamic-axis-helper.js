const { getMax } = require("./math-helper")

const dynamicAxisHelper = (series, data) => {
    const min = 0
    let max = 0

    series.forEach(item => {
        let dataMax = getMax(data, item.valueKey)
        if (dataMax > max){
            max = dataMax
        }
    })

    return [min, max]
}

module.exports = {
    dynamicAxisHelper
}