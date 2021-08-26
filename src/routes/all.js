const User = require('../models/user')

const log4js = require("log4js")
const logger = log4js.getLogger()
// const configure = log4js.configure()

log4js.configure({
  appenders: {
    app: {type: "file", filename: "app.log"}
  },
  categories: {
    default: {
      appenders: ["app"],
      level: 'all'
    }
  }
})





module.exports.setup = (app) => {  

  /**
   * @swagger
   * /user:
   *   get:
   *     description: Get all Users
   *     tags: [User] 
   *     responses:
   *       200:
   *         description: Will connect to mongoDB
   *       500:
   *         description: Internal Server Error
   */


   app.get('/user', async (_req, res) => {
    try {
      const user = await User.find()
      if (!user) throw new Error('User not found')
      return res.status(200).json(user)
      logger.info(`${new Date().toJSON()}  successful request`)
    }catch (err) {
      console.log(err)
      return res.status(404).json({ message: err.message })
      logger.error(err)
    }
  })

    /**
   * @swagger
   * /user/:id:
   *   get:
   *     description: Get each User
   *     tags: [User] 
   *     responses:
   *       200:
   *         description: Will connect to mongoDB
   *       500:
   *         description: Internal Server Error
   */


     app.get('/user/:id', async (req, res) => {
      try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) throw new Error('User does not exist with that id')
        return res.status(200).json(user)
        logger.info(`${new Date().toJSON()}  successful request`)
      }catch (err) {
        console.log(err)
        return res.status(404).json({ message: err.message })
        logger.error(err)
      }
    })
  /**
   * @swagger
   * /user:
   *   post:
   *     description: Add a User
   *     tags: [User] 
   *     responses:
   *       200:
   *         description: Will connect to mongoDB
   *       500:
   *         description: Internal Server Error
   */
   app.post('/user', async (req, res) => {
    try {
      const newUser = { ...req.body }
      logger.warn('both fields are required')
      console.log(newUser)
      const userToAdd = await User.create(newUser)
      return res.status(201).json(userToAdd)
      logger.info(`${new Date().toJSON()}  successful request`)
    }catch (err) {
      console.log(err)
      return res.status(404).json({ message: err.message })
      logger.error(err)
    }
  })
}  
