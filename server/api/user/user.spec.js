'use strict'
const chai      = require('chai')
const assert    = chai.assert
const stormpath = require('stormpath')
const conf      = require('../../config/environment/test')
const apiKey = new stormpath.ApiKey(
  conf.stormpath.key,
  conf.stormpath.secret
)
const client = new stormpath.Client({ apiKey: apiKey })
const applicationHref = conf.stormpath.href
let acct, application, createdAcct;
let acctData = {
  givenName: 'Joe',
  surname: 'Stormtrooper',
  username: 'tk422'+ (Math.random()*1000 | 0),
  email: 'tk422'+ (Math.random()*1000 | 0)+'@stormpath.com',
  password: 'Changeme1',
  customData: {
    favoriteColor: 'white'
  }
}
describe('Stormcloak testing', () => {
  it ('should retrieve our application', (done) => {
    client.getApplication(applicationHref, (err, result) => {
      application = result
      done()
    })
  })
  it ('should create an account', (done) => {
    application.createAccount(acctData, (err, result) => {
      if (err) {
        throw new Error(err)
      }
      createdAcct = result
      done()
    })
  })
  it ('should store properties passed when instantiated', () => {
    assert.equal(createdAcct.surname,'Stormtrooper')
  })
  it ('should retrieve our saved account', (done) => {
    application
      .getAccounts({ username: acctData.username }, (err, accounts) => {
        if (err) throw new Error(err)
        assert.equal(accounts.items[0].givenName, 'Joe')
        done()
      })
  })
  it ('should retrieve authenticate our account', (done) => {
    let authRequest = {
      username: acctData.username,
      password: 'Changeme1'
    }
    application.authenticateAccount(authRequest, (err, result) => {
      if (err) throw new Error(err)
      result.getAccount((err, account) => {
      if (err) throw new Error(err)
        done()
      })
    })
  })
})


