const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const records = await Record
    .find()
    .lean()
    .sort({ date: 'desc', _id: 'desc' })
  let totalAmount = 0
  for (let record of records) {
    totalAmount += record.amount
  }
  res.render('index', { totalAmount, records, categoryList })
})

router.get('/filter', async (req, res) => {
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const { categorySelector } = req.query
  const records = await Record.find({ category: categorySelector }).lean().sort({ _id: 'desc' })
  let totalAmount = 0
  for (let record of records) {
    totalAmount += record.amount
  }
  res.render('index', { totalAmount, records, categoryList, categorySelector })
})

module.exports = router