const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
})

router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = await Category.find().lean()
  const record = await Record.findOne({ _id, userId }).lean()
  return res.render('edit', { categories, record })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  return Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router