const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then((categoriesList) => {
      res.render('new', { categoriesList })
    })
    .catch((error) => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  let categoriesList = []
  Category.find()
    .lean()
    .then(categories => categoriesList.push(...categories))
    .catch(error => console.log(error))
    .then(() => {
      Record.findOne({ _id, userId })
        .lean()
        .then((record) => res.render('edit', { categoriesList, record }))
        .catch(error => console.log(error))
    })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount, merchant } = req.body
  return Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { name, date, category, amount, merchant } = req.body
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