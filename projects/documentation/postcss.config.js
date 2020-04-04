const { postCSSPlugins } = require('../../scripts/css-processing.js');

module.exports = {
    plugins: postCSSPlugins(),
};
