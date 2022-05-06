const router = require('express').Router()

const { readingList } = require("../models")
const { blogFinder , userFinder, tokenExtractor } = require('../util/middleware')



router.post("/", userFinder, blogFinder, async (req, res) => {
    const reading = await readingList.create({
      userId: req.user.id,
      blogId: req.blog.id,
    });
    res.json(reading);
});

router.put('/:id', tokenExtractor, async (req, res) => {
    const reading = await Readinglist.findByPk(req.params.id);
    reading.read = req.body.read
    await reading.save()
    res.json(reading)
})
module.exports = router
