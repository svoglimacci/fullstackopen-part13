const jwt = require('jsonwebtoken')
const router = require('express').Router();
const { userFinder } = require("../util/middleware");
const { SECRET } = require('../util/config')
const { User, Session } = require('../models/user')

router.post('/login', async (req, res) => {
 const body = req.body

 const user = await User.findOne({
     where: {
         username: body.username,
     },
 })

 const passwordCorrect = body.password === 'secret'

 if (!(user && passwordCorrect)) {
     return res.status(401).json({ error: 'invalid username or password'})
 }

 if (user.disabled) {
     return res.status(401).json({ error: 'account disabled, please contact admin'})
 }
 const userToken = {
     username: user.username,
     id: user.id,
 }
 const token = jwt.sign(userToken, SECRET)

 await Session.create({ token, userId: user.id });

 res.status(200).send({ token, username: user.username, name: user.name})
})

router.delete('/logout', userFinder, async (req, res) => {
    await Session.destroy({
        where: {
            userId: req.user.id,
        },
    })

    res.status(200).send()
})
module.exports = router
