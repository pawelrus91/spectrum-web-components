// Turn on to pre-process code samples...
// this needs deeper integration with the <code-example> element
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addPassthroughCopy('content/404.html');
    eleventyConfig.addPassthroughCopy('content/serviceWorker.js');
    eleventyConfig.addPassthroughCopy('content/images/**/*');
    eleventyConfig.addPassthroughCopy('content/manifest.webmanifest');
    let markdownIt = require('markdown-it');
    let options = {
        html: true,
    };

    eleventyConfig.setLibrary('md', markdownIt(options));

    eleventyConfig.addCollection('components', (collection) => {
        return [
            ...collection.getFilteredByGlob('./content/components/!(*-api).md'),
        ];
    });

    eleventyConfig.addCollection('componentsApi', (collection) => {
        return [
            ...collection.getFilteredByGlob('./content/components/*-api.md'),
        ];
    });

    eleventyConfig.addCollection('guides', (collection) => {
        return [...collection.getFilteredByGlob('./content/guides/*.md')];
    });

    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: { input: 'content', output: '_site' },
        passthroughFileCopy: true,
        templateFormats: ['njk', 'md', 'css', 'yml'],
        htmlTemplateEngine: 'njk',
    };
};
