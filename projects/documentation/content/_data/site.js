module.exports = {
    name: 'Spectrum Web Components',
    shortDesc:
        'Spectrum Web Components provide interface components as custom elements to help teams work more efficiently and to make applications more consistent.',
    url:
        process.env.ELEVENTY_ENV === 'production'
            ? 'https://opensource.adobe.com/spectrum-web-components/'
            : '/',
    environment: process.env.ELEVENTY_ENV || 'development',
};
