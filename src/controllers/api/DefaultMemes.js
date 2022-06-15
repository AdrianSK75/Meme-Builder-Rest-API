function getMemes(req, res, next) {
    const defaultMemes = require("../../../defaultMemes.json")
    res.status(200).json(defaultMemes);
}
module.exports = {
    getMemes
}