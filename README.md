# Nuxt Facebook Pixel integration

## Install

Yarn: `yarn add @kippie-bv/nuxt-facebook-pixel`

Yarn: `npm install @kippie-bv/nuxt-facebook-pixel`

### options

```js
//nuxt.config.js
  modules: [
    "@kippie-bv/nuxt-facebook-pixel",
  ],

   facebookPixel: {
    pixelId: "<YOUR_PIXEL_ID>",
    track: 'PageView', // default: PageView
    autoPageView: false, // default: false
    disabled: false, // default: false
    version: "2.0", // default: 2.0
    disabled: false, // default: false
    manualMode: true, // default: false
  },
```
