const login = require("./modules/client/authorize-module");
const { readConfiguration } = require("./modules/configuration/configuration-reader-module");
const { processVisualizations } = require("./modules/service/visualize-service");

const visualize = async (cmdArgs) => {
    let configuration = await readConfiguration(cmdArgs);
    let token = await login(configuration.bookkit.oidcHost, configuration.bookkit.accessCode1, configuration.bookkit.accessCode2);
    await processVisualizations(cmdArgs, configuration, token);
}

const help = usage => {
    console.log(usage);
}

module.exports = {
    visualize,
    help
};