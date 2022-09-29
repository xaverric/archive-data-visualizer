const path = require("path");

const mapPaths = (configuration) => {
    configuration.visualizations.forEach(visualization => {
        if(visualization.tempFolder && _isWindows()) {
            let tempFolderPathResolved = path.resolve(visualization.tempFolder);
            let root = path.parse(tempFolderPathResolved).root;
            tempFolderPathResolved = tempFolderPathResolved.replace(root, "\\\\.\\");
            visualization.tempFolderK8s = tempFolderPathResolved;
        } else {
            visualization.tempFolderK8s = visualization.tempFolder;
        }

        visualization.output = path.resolve(visualization.tempFolder, visualization.statsFolder);
    });
    return configuration;
}

const _isWindows = () => process.platform === "win32";

module.exports = {
    mapPaths
}