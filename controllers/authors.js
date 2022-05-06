const router = require('express').Router()

const { Blog } = require("../models");
const sequelize = require("sequelize");

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('count', sequelize.col('id')), 'articles'],
            [sequelize.fn('sum', sequelize.col('likes')), 'likes'],
        ],
        group: ['author'],
        order: [[sequelize.fn('sum', sequelize.col('likes')), 'DESC']],
    })
    res.json(authors)
})

module.exports = router