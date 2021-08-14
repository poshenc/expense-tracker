const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// router.get('/', (req, res) => {
//   Category.find().sort({ _id: 'asc' }).lean()
//   const { categorySelector, monthSelector } = req.query
//   let totalAmount = 0
//   const userId = req.user._id
//   Category
//     .find()
//     .sort({ _id: 'asc' })
//     .lean()
//     .then(() => {
//       Record.find({ userId })
//         .lean()
//         .sort({ date: 'desc', _id: 'desc' })
//         .then((records) => {
//           if (categorySelector) {
//             records = records.filter(record => record.category === categorySelector)
//           }
//           records.forEach(record => totalAmount += record.amount)
//           res.render('index', { totalAmount, records, categoryList, categorySelector })
//         })
//     })
//     .catch(error => console.log(error))
// })


// router.get('/', async (req, res) => {
//   const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
//   const userId = req.user._id
//   const records = await Record
//     .find({ userId })
//     .lean()
//     .sort({ date: 'desc', _id: 'desc' })
//   let totalAmount = 0
//   for (let record of records) {
//     totalAmount += record.amount
//   }
//   res.render('index', { totalAmount, records, categoryList })
// })

// router.get('/filter', async (req, res) => {
//   const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
//   const { categorySelector, monthSelector } = req.query
//   const userId = req.user._id
//   const records = await Record.find({ userId, category: categorySelector }).lean().sort({ _id: 'desc' })
//   let totalAmount = 0
//   for (let record of records) {
//     totalAmount += record.amount
//   }
//   res.render('index', { totalAmount, records, categoryList, categorySelector })
// })


//testing 
const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

router.get('/', (req, res) => {
  const categoryIcons = {}
  const { categorySelect, monthSelect } = req.query
  let totalAmount = 0
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
          records.forEach(record => record['icon'] = categoryIcons[record.category])
          if (monthSelect) {
            records = records.filter(record => {
              const date = record.date
              const monthOfDate = date.getMonth() + 1
              return monthOfDate.toString() === monthSelect
            })
          }
          if (categorySelect) {
            records = records.filter(record => record.category === categorySelect)
          }
          records.forEach(record => totalAmount += record.amount)
          res.render('index', { categories, totalAmount, categorySelect, records, monthSelect })
        })
    })
    .catch(error => console.log(error))
})
module.exports = router