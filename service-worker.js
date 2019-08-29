/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "60654179602dadf8e4cec721eac919ca"
  },
  {
    "url": "assets/css/12.styles.f8b69645.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/2.styles.6fab6ec6.css",
    "revision": "0192e7fdb597d3d9d982755f7ce435fb"
  },
  {
    "url": "assets/css/3.styles.44aeb228.css",
    "revision": "d3bf9cadaa2e2f83084f3e140eb51d99"
  },
  {
    "url": "assets/css/4.styles.6912823f.css",
    "revision": "202f1a3c1aacf091364f0c1aed803bd1"
  },
  {
    "url": "assets/css/5.styles.d891a47e.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/styles.4b1f6194.css",
    "revision": "f51ca94ce656e647d958593b31b4da2c"
  },
  {
    "url": "assets/img/containers.87c74b32.svg",
    "revision": "87c74b32b6a8055918a9f6954a302f97"
  },
  {
    "url": "assets/img/placeholder.aa6f19b8.svg",
    "revision": "aa6f19b8165d81a94b0bb6ac14ea86e4"
  },
  {
    "url": "assets/img/responsive-typography.edb11b36.svg",
    "revision": "edb11b36d4ddfe7a04a4917ef95ce13f"
  },
  {
    "url": "assets/img/search.0781e11c.svg",
    "revision": "0781e11cc265635f26ea60cd1b8e0962"
  },
  {
    "url": "assets/js/0.a2fa7bae.js",
    "revision": "10a13e6cf22eaedea663107391f1d63f"
  },
  {
    "url": "assets/js/10.63026f23.js",
    "revision": "a2e7c2a06ca564cd6eef76b07b56071f"
  },
  {
    "url": "assets/js/11.99528021.js",
    "revision": "de012d9533e925f9025e0547bc45d56b"
  },
  {
    "url": "assets/js/12.f8b69645.js",
    "revision": "8f9ec7dd77296460d701310e1e187932"
  },
  {
    "url": "assets/js/13.bfa5ec43.js",
    "revision": "bb29389182868f6ad4d545754bfe3101"
  },
  {
    "url": "assets/js/14.2daa1d75.js",
    "revision": "4099e6e79aa41ea7da57575e492c0543"
  },
  {
    "url": "assets/js/15.9c3002fe.js",
    "revision": "a7412edfd792f9c4b51f6d88c27438a3"
  },
  {
    "url": "assets/js/16.56f079a0.js",
    "revision": "7bb2c433dd4d3600e32ea9deef69efce"
  },
  {
    "url": "assets/js/17.05c54649.js",
    "revision": "797dab617cc495472999b1444f4bda1e"
  },
  {
    "url": "assets/js/18.435a37c3.js",
    "revision": "8c74323cb029d34482fc8c871b696a70"
  },
  {
    "url": "assets/js/19.6d9a586f.js",
    "revision": "4e028da00e4347fb1e189f9dc4bcbab5"
  },
  {
    "url": "assets/js/2.6fab6ec6.js",
    "revision": "7ae1883eeecdd1b8c9ea083322fa4410"
  },
  {
    "url": "assets/js/20.a40e7bfc.js",
    "revision": "160173ac70297c0e87be0cbdbcee31d2"
  },
  {
    "url": "assets/js/21.27f9941f.js",
    "revision": "5b47dc507bf73b5d0766cf81710d6c9c"
  },
  {
    "url": "assets/js/22.ccd90b68.js",
    "revision": "afd479756f40f2991dc6ce1d6433c042"
  },
  {
    "url": "assets/js/23.5811f52a.js",
    "revision": "6193bc6b840f87840eea274ed9ff0599"
  },
  {
    "url": "assets/js/24.e4ab09ad.js",
    "revision": "594510e29580fe2d6d1011fb5044afa3"
  },
  {
    "url": "assets/js/3.44aeb228.js",
    "revision": "f92eb85cad64d2a845655fdf81f7e70a"
  },
  {
    "url": "assets/js/4.6912823f.js",
    "revision": "340aa518ec7d034eb04f906c7e226343"
  },
  {
    "url": "assets/js/5.d891a47e.js",
    "revision": "755f93a4c622582a0046a0c849e752f8"
  },
  {
    "url": "assets/js/6.00a33b4a.js",
    "revision": "3c3a3bf861219bf14abd92725ee53d64"
  },
  {
    "url": "assets/js/7.e0ce20d8.js",
    "revision": "5de1802b61e487106c8ff89e5608815a"
  },
  {
    "url": "assets/js/8.d89295ca.js",
    "revision": "71c8f7f1bc382c5d714bf55d7e062330"
  },
  {
    "url": "assets/js/9.120a76a8.js",
    "revision": "9b76fca8de8ba0dacd22368cb5792683"
  },
  {
    "url": "assets/js/app.4b1f6194.js",
    "revision": "24bfda37c2fb9fb4bc6396d731f08a58"
  },
  {
    "url": "guide/buttons.html",
    "revision": "0c049424661754a0d2f4e866d20b8eb4"
  },
  {
    "url": "guide/code.html",
    "revision": "e3484ad0aa8f94ebc968af9ed72bb860"
  },
  {
    "url": "guide/forms-inputs.html",
    "revision": "2ca788788e19508e931922bac88b5e04"
  },
  {
    "url": "guide/index.html",
    "revision": "f159e687f0bea0888fd38b272bb1871b"
  },
  {
    "url": "guide/layout.html",
    "revision": "282611bf8667f3bd69fd99efbc4360b4"
  },
  {
    "url": "guide/media.html",
    "revision": "66ac16fde3b67b65de37646040f4a94d"
  },
  {
    "url": "guide/meters-progress.html",
    "revision": "a65a7f40c2ce3e8f580deeae5933c9d7"
  },
  {
    "url": "guide/tables.html",
    "revision": "3003ef8043356fb15d69bda61c5a4e79"
  },
  {
    "url": "guide/theming.html",
    "revision": "94a33f94bf7791986e50be76685a049a"
  },
  {
    "url": "guide/typography.html",
    "revision": "39d7ca5b1439865859c3eb2c0f9182d9"
  },
  {
    "url": "hiq-app-logo.svg",
    "revision": "c0936bb362f0e11ba8bc5cce5d2915f0"
  },
  {
    "url": "hiq-logo.svg",
    "revision": "1197b44b98d1c1d4ce44a746d7fd864c"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "e4758bb2c9dfc5513c001e46e3747ddc"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "526930e5bea2f74970ed8041a2208d6d"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "61a88dd55ef923c68ecf4e5b89f41739"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "75aed6709fe831b509ebd270940f8b24"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "67296238f310d71d170374a4cfbd5939"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "0889ebd78e961dac4d56995128cf7f1a"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "9fc0b9568ca2f647061663b0e20face4"
  },
  {
    "url": "index.html",
    "revision": "6fb96bb25ead907c0fc80e6f82f318a9"
  },
  {
    "url": "logo.png",
    "revision": "526930e5bea2f74970ed8041a2208d6d"
  },
  {
    "url": "reference/browser-bugs.html",
    "revision": "ca8d40560360197b06e81795ff12a5cd"
  },
  {
    "url": "reference/index.html",
    "revision": "17769bb28ab3045da6500fccda258b0e"
  },
  {
    "url": "reference/utilities.html",
    "revision": "27b12f6b6c48ff1140ce7773f5e49d13"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
