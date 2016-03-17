'use strict'

const stormpath = require('stormpath')
const conf      = require('../../config/environment/'+(process.env.NODE_ENV|| 'development'))
const apiKey    = new stormpath.ApiKey(
  conf.stormpath.key,
  conf.stormpath.secret
)

const client          = new stormpath.Client({ apiKey: apiKey })
const applicationHref = conf.stormpath.href

module.exports = {
  app: new Promise((resolve,reject) => {
    client.getApplication(applicationHref, (err, application) => {
      if (err) reject(err)
      else resolve(application)
    })
  }),
  client: client
}
