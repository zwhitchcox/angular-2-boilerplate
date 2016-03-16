'use strict'

const stormpath = require('stormpath')
const conf      = require('../../config/environment/'+(process.env.NODE_ENV|| 'development'))
if (conf.stormpath.key === 'API_KEY')
  throw new Error('Did you configure stormpath?\n'+
    './server/config/environment/...'
  )
const apiKey    = new stormpath.ApiKey(
  conf.stormpath.key,
  conf.stormpath.secret
)

const client          = new stormpath.Client({ apiKey: apiKey })
module.exports = client
