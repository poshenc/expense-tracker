const mongoose = require('mongoose')
const db = require('../../config/mongoose')

const Category = require('../category')
const categories = [
  {
    name: '家居物業',
    icon: '<i class="fas fa-home fa-3x"></i>'
  },
  {
    name: '交通出行',
    icon: '<i class="fas fa-shuttle-van fa-3x"></i>'
  },
  {
    name: '休閒娛樂',
    icon: '<i class="fas fa-grin-beam fa-3x"></i>'
  },
  {
    name: '餐飲食品',
    icon: '<i class="fas fa-utensils fa-3x"></i>'
  },
  {
    name: '其他',
    icon: '<i class="fas fa-pen fa-3x"></i>'
  }
]

db.once('open', () => {
  Category.create(categories)
    .then(() => {
      console.log('categorySeeder done!')
      db.close()
      console.log('database connection closed!')
    })
})




