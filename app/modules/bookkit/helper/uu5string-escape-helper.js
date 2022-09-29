const escapeUu5StringArray = (uu5String) => {
    return JSON.stringify(uu5String).replaceAll('\"', '\\"');
}

module.exports = {
    escapeUu5StringArray
}