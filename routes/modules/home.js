const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const { categorySelect, monthSelect, yearSelect } = req.query
  let categoriesList = []
  let categoryIcons = {}
  let totalAmount = 0
  let years = new Set()
  Category.find()
    .lean()
    .then(category => categoriesList.push(...category))
    .then(() => {
      Category.find()
        .sort({ _id: 'asc' })
        .lean()
        .then(categories => {
          categories.forEach((item) => {
            categoryIcons[item.name] = item.icon
          })
        })
        .then(() => {
          const userId = req.user._id
          Record.find({ userId })
            .lean()
            .sort({ date: 'desc' })
            .then((records) => {
              records.forEach(record => years.add(record.date.getFullYear()))
              records.forEach(record => record['icon'] = categoryIcons[record.category])
              if (monthSelect) {
                records = records.filter(record => {
                  const date = record.date
                  const monthOfDate = date.getMonth() + 1
                  return monthOfDate.toString() === monthSelect
                })
              }
              if (yearSelect) {
                records = records.filter(record => {
                  const date = record.date
                  const yearOfDate = date.getFullYear()
                  return yearOfDate.toString() === yearSelect
                })
              }
              if (categorySelect) {
                records = records.filter(record => record.category === categorySelect)
              }
              records.forEach(record => totalAmount += record.amount)
              res.render('index', { categoriesList, totalAmount, categorySelect, records, monthSelect, yearSelect, years })
            })
        })

    })
    .catch(error => console.log(error))
})
module.exports = router