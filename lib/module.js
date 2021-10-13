const { resolve } = require('path')

function facebookPixel(moduleOptions) {
    const defaults = {
        pixelId: null,
        track: 'PageView',
        autoPageView: true,
        version: '2.0',
        disabled: false,
    }
    const options = Object.assign(
        {},
        defaults,
        this.options['facebookPixel'],
        this.options.facebookPixel,
        moduleOptions
    )

    if (!options.pixelId) {
        console.warn(
            '[@kippie-bv/nuxt-facebook-pixel] The option `pixelId` is required. See https://github.com/kippie-bv/nuxt-facebook-pixel#options'
        )
        return
    }

    this.addPlugin({
        ssr: false,
        src: resolve(__dirname, 'plugin.js'),
        options,
    })
}

module.exports = facebookPixel
module.exports.meta = require('../package.json')
