function getMemes(req, res) {
    const defaultMemes = require("../../../defaultMemes.json")
    res.status(200).json(defaultMemes);
}
module.exports = {
    getMemes
}