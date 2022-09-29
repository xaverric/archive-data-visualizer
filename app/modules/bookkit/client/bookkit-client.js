const { callCommand } = require("../../client/calls");
const { LOG } = require("../../logger/logger");

/**
 * Updates given section on the given page with new uu5String content
 *
 * @param baseUri bookkit base uri
 * @param page page code in the given book
 * @param code section code within the page to be updated
 * @param content uu5String content to be replaced within the whole section
 * @param token authorization token
 */
const updateSection = async (baseUri, page, code, content, token) => {
    let lock = await callCommand(`${baseUri}/lockPageSection`, "POST", { code: code, page: page }, token);
    await callCommand(`${baseUri}/updatePageSection`, "POST", {
        code: code,
        page: page,
        content: content,
        sys: { rev: lock.sys.rev }
    }, token);
    await callCommand(`${baseUri}/unlockPageSection`, "POST", { code: code, page: page }, token);
}

/**
 * Update given page name and description accorsing to the provided visualization configuration object.
 * 
 * @param {*} baseUri bookkit base uri
 * @param {*} visualization configuration object for the given visualization
 * @param {*} token authorization token
 */
const updatePage = async (baseUri, visualization, token) => {
    LOG.info(`Updating page "${visualization.header}" name and description.`)
    let pageDtoOut = await callCommand(`${baseUri}/loadPage`, "GET", { code: visualization.pageCode }, token);
    await callCommand(`${baseUri}/updatePage`, "POST", {
        code: visualization.pageCode,
        desc: {
            content: visualization.description,
            sys: {
                rev: pageDtoOut.desc.sys.rev
            }
        },
        name: {
            en: visualization.header,
            cs: visualization.header
        },
        sys: { rev: pageDtoOut.sys.rev }
    }, token);
}

module.exports = {
    updateSection,
    updatePage
}