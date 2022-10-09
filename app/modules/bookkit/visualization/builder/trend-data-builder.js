const {calculateTrend} = require("../helper/trend-calculator-helper");

const COLUMNS = [
    {
        header: "Trend Line",
        sticky: "left",
        highlighted: true
    },
    {
        header: "Angle Incline (%)"
    },
    {
        header: "Slope",
    },
    {
        header: "Direction"
    }
]

const build = (visualization, range, data) => {
    let trendData = calculateTrend(visualization, range, data);
    return [
        COLUMNS,
        trendData.map(item => Object.values(item))
    ]
}

module.exports = build;