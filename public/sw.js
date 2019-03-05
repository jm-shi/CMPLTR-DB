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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "audio/fullComplete.mp3",
    "revision": "6ee3a375e52dedf44627e44a42be65e3"
  },
  {
    "url": "audio/halfComplete.mp3",
    "revision": "24e4ae98ff06fec12eeeea897dba25a5"
  },
  {
    "url": "css/style.css",
    "revision": "f17022f8ba8ff9502653660287488020"
  },
  {
    "url": "images/createRoutine.png",
    "revision": "4c2fdd06c8ff913ad427fe9e0733a096"
  },
  {
    "url": "images/currentRoutine.png",
    "revision": "9c84c92083b036c810374691ed481590"
  },
  {
    "url": "images/currentRoutines.png",
    "revision": "70072ad8678786aa12e4b5dd1c9583c2"
  },
  {
    "url": "images/home.png",
    "revision": "da2e242f396a0f2d5ee1aaa276a18a39"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "168a77bb53438af233840fe4fb02a8bf"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "79c41af288c0b0de17fd0b56b9ef7022"
  },
  {
    "url": "images/icons/icon-150x150.png",
    "revision": "211f6545b028a06c47b076a191fe0217"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "56bdd4bb4defcdae89d6583d71593d1f"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "bedb777de1e5afddabad95a4e7dcd2b1"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "0809f6fabf9e47cf0687186e4909b6f5"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "f1556366e5f444e87ac35568c011df05"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "32e6c26d3283bbe32219213060d5db4d"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "c0623d42610aa5ad0ae373ed5a5541e8"
  },
  {
    "url": "images/icons/splash/ipad_splash.png",
    "revision": "8aee4607bcc02014e4e05fd4e37c6078"
  },
  {
    "url": "images/icons/splash/ipadpro1_splash.png",
    "revision": "28a3d873161f8c7a076346cd775adfaf"
  },
  {
    "url": "images/icons/splash/ipadpro2_splash.png",
    "revision": "a181221533396d44892d380cd5aca93d"
  },
  {
    "url": "images/icons/splash/ipadpro3_splash.png",
    "revision": "ed03fb2120d0b8010def8b124ef50d26"
  },
  {
    "url": "images/icons/splash/iphone5_splash.png",
    "revision": "0c99dbb8dff3ddbd1fca9e9acac0d26d"
  },
  {
    "url": "images/icons/splash/iphone6_splash.png",
    "revision": "5cd336c90d6f33cc628c5fd50d17ade1"
  },
  {
    "url": "images/icons/splash/iphoneplus_splash.png",
    "revision": "eae000ec05725d47b74ebd32c22aac12"
  },
  {
    "url": "images/icons/splash/iphonex_splash.png",
    "revision": "e7cf9db94cf48fe76f26fd4c6c7a990d"
  },
  {
    "url": "images/icons/splash/iphonexr_splash.png",
    "revision": "0b4629bec19949cae58618af9a5922a4"
  },
  {
    "url": "images/icons/splash/iphonexsmax_splash.png",
    "revision": "d0512b2da766da2934c9e10e2356f0cd"
  },
  {
    "url": "js/calendar.js",
    "revision": "2f057b4044f6ea873ae4585bea088468"
  },
  {
    "url": "js/chart.min.js",
    "revision": "97fc24605ac8278c6097b48ae533bf8a"
  },
  {
    "url": "js/facebook.js",
    "revision": "a5d0a2147629b4ecb8cfe478269e221f"
  },
  {
    "url": "js/forms.js",
    "revision": "fbd56220aefe33c2273f0150cd7034ab"
  },
  {
    "url": "js/repeatButtons.js",
    "revision": "ef5da77d93f625caaecc71e62074d6fb"
  },
  {
    "url": "js/routines.js",
    "revision": "5df2e56a5c10615e29e3fed6d236a853"
  },
  {
    "url": "manifest.json",
    "revision": "e0c14de2f1348449edcbe69508442736"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
