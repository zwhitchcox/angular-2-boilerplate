'use strict'
const config = require('../../config/environment/'+process.env.NODE_ENV || 'development')
const jwt = require('jsonwebtoken')
const client = require('../../api/stormpath/client')
function checkAuth (req, res, next) {
  let authHeader, token, elements, scheme;
  authHeader = req.get('Authorization')
  if (authHeader) {
    elements = authHeader.split(' ')
    if (elements.length === 2) {
      scheme = elements[0]
      if (scheme === 'Bearer') {
        token = elements[1]
        let acctJwt;
        try {
           acctJwt = jwt.verify(token, config.secret)
        } catch (err) {
          next()
        }
        client.getAccount(acctJwt.href, (err, account) => {
          req.user = account
          account.getCustomData((err,customData) => {
            req.customData = customData
            next()
          })
        })
      } else next()
    } else next()
  } else next()
}

module.exports = checkAuth
