'use strict'
let EC = protractor.ExpectedConditions
describe('User Test', () => {
  let userInfo = {
    email: 'test'+(Math.random()*100000|0)+'@test.com',
    username: 'test'+(Math.random()*100000|0)
  }
  beforeEach(() => {
    browser
      .executeScript('delete window.localStorage.token')
  })
  it('should register a new user', () => {
    browser.get('/register')
    let fname = element(by.model('register.credentials.givenName'))
    let lname = element(by.model('register.credentials.surname'))
    let company = element(by.model('register.credentials.customData.company'))
    let email = element(by.model('register.credentials.email'))
    let uname = element(by.model('register.credentials.username'))
    let pword = element(by.model('register.credentials.password'))
    let submit = element(by.buttonText('Register'))
    fname.sendKeys('Test')
    lname.sendKeys('Testington')
    company.sendKeys('Test, Inc.')
    email.sendKeys(userInfo.email)
    uname.sendKeys(userInfo.username)
    pword.sendKeys('Testes6969')
    submit.click()
    // site redirects after successful registration
    // wait until url resolves
    browser.wait(()=> {
      return new Promise((resolve, reject) => {
        browser
        .executeScript('return window.location.href')
        .then(val => {
          resolve(
            /http:\/\/[^\/]+\/?$/.test(val)
          )
        })
      })
    },3000)
    // make sure the json web token was set
    let jwt = expect(browser.executeScript('return window.localStorage.jwt'))
    jwt.not.toEqual(undefined)
    jwt.not.toEqual(null)
    jwt.not.toEqual('')
  })
  it('should log out the newly created user', () => {
    browser.get('/logout')
    // site redirects after successful logout
    // wait until url resolves
    browser.wait(()=> {
      return new Promise((resolve, reject) => {
        browser
        .executeScript('return window.location.href')
        .then(val => {
          resolve(
            /http:\/\/[^\/]+\/?$/.test(val)
          )
        })
      })
    },3000)
    // make sure the json web token was unset
    let jwt = expect(browser.executeScript('return window.localStorage.jwt'))
    jwt.toEqual(null)
  })
  it('should log in newly created user', () => {
    browser.get('/login')
    let uname = element(by.model('credentials.username'))
    let pword = element(by.model('credentials.password'))
    let submit = element(by.buttonText('Login'))
    uname.sendKeys(userInfo.username)
    pword.sendKeys('Testes6969')
    submit.click()
    // site redirects after successful login
    // wait until url resolves
    browser.wait(()=> {
      return new Promise((resolve, reject) => {
        browser
        .executeScript('return window.location.href')
        .then(val => {
          resolve(
            /http:\/\/[^\/]+\/?$/.test(val)
          )
        })
      })
    },3000)
    // make sure the json web token was set
    let jwt = expect(browser.executeScript('return window.localStorage.jwt'))
    jwt.not.toEqual(undefined)
    jwt.not.toEqual(null)
    jwt.not.toEqual('')
  })
})
