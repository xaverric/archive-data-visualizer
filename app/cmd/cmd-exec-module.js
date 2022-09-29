const util = require('util');
const child_process = require('child_process');

const exec = util.promisify(child_process.exec);

const callCliCommand = async (command) => {
    const {stdout} = await exec(command);
    return stdout; 
};

module.exports = {
    callCliCommand
}