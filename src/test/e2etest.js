const mongoUnit = require('../routes/all')
const dbURI = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=GitHub+Training&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true"
const port = 8080
const host = '0.0.0.0'
const co = require('co')
const User = require('../models/user')

const ui = {
  user: '.user',
  addUser: '#addUser'
}

describe('User',() => {
  beforeEach(function() {
    return mongoUnit
      .initDb(dbURI)
      .then(() => this.browser.url(`http://${host}:${port}`))
  })

  afterEach(() => mongoUnit.dropDb(dbURI))

  it('should display list of users', function () {
    const browser = this.browser
    return co(function* () {
      const users = yield browser.elements(ui.user)
      expect(users.length, 1)
    })
  })

  it('should create users', function() {
    const browser = this.browser
    return co(function*() {
      yield browser.element(ui.addUser).click()
      const users = yield browser.elements(ui.user)
      expect(users.length, 2)
    })
  })

})