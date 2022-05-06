const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor, blogFinder } = require('../util/middleware')



router.get('/', async (req, res) => {
    const where = {}

    if (req.query.search) {
        where.title,
        (where.author = {
            [Op.substring]: req.query.search,
        })
    }
    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where,
        order: [['likes', 'DESC']],
    })
    res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

router.post('/', tokenExtractor, async (req, res) => {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id })
        res.json(blog)

})
router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.destroy({
        where: {
            id: req.params.id,
            id_user: user.id,
        },
    })
    res.json(JSON.stringify(blog))
})

router.put('/:id', blogFinder, tokenExtractor, async (req, res) => {
   if (req.blog) {
       const user = await User.findByPk(req.decodedToken.id)
       if (req.blog.userId != user.id) {
           res.status(400).json({ error: 'Unauthorized blog'}).end()
       }
       req.blog.likes = req.body.likes
       await req.note.save()
       res.json({ likes: blog.likes })
   } else {
       res.status(404).end()
   }
})
module.exports = router