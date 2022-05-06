const jwt = require('jsonwebtoken')
const { User, Session, Blog } = require("../models");
const { SECRET } = require('./config.js')

const checkSession = async (token) => {
    return await Session.findOne({
        where: {
            token,
        },
        include: {
            model: User,
        },
    })
}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const userFinder = async (req, res, next) => {

    req.user = await User.findOne({
    where: {
      id: req.params.id,
    },
  })
  next()
};

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch{
        res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      res.status(401).json({ error: 'token missing' })
    }

    const session = await checkSession(authorization.substring(7))

    if (!session) {
        return res.status(401)
    }

    if (session.user.disabled) {
        return res.status(401)
    }

    req.user = session. user

    next()
  }

  module.exports = { tokenExtractor, blogFinder, userFinder }