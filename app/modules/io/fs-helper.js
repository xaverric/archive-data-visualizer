const fs = require("fs-extra");
const { LOG } = require("../logger/logger");

const emptyDir = visualization => {
    LOG.info(`Emptying ${visualization.output}`)
    fs.emptyDirSync(visualization.output);
}

module.exports = {
    emptyDir
}