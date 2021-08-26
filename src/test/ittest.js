const mongoUnit = require('../routes/all')
const expect = require('chai').expect
const dbURI = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=GitHub+Training&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true"
const User = require('../models/user')


module.exports = {
  getUser: () => User.find(),
  addUser: data => new User(data).save(),
}

let service
mongoUnit.start({ dbName: 'GitHub-Training' }).then(() => {
  run() // this line start mocha tests
})

describe('service', () => {
  before(() => {
    // create it after DB is started
    service = require('../../index')
  })
  beforeEach(() => mongoUnit.initDb(dbURI))
  afterEach(() => mongoUnit.drop())
  
  
  it('should find all users', () => {
    return service.getUser().then(users => {
      expect(users.length).to.equal(1)
    })
  })

  it('should create new user', () => {
    return service
      .addUser({ firstName: string, lastName: string })
      .then(user => {
        expect(user.firstName).to.equal(string)
        expect(user.lastName).to.equal(string)
      })
      .then(() => service.getUser())
      .then(user => {
        expect(user.length).to.equal(2)
      })
  })

})