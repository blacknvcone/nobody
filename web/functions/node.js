const { Nuxt } = require('nuxt-start');

const nuxtConfig = require('../src/nuxt.config.js');

const config = {
  nuxtConfig,
  dev: false,
  debug: false
};

const nuxt = new Nuxt(config);

exports.ssrapp = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
}); 