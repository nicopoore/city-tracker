import mongoose from 'mongoose';
import City from './models/city'
import Category from './models/category'

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})

export const addNewCity = (name: string, country: string, coordinates: string) => {
  let city = new City({name: name, country: country, coordinates: coordinates})
  return city.save()
}

export const addNewCategory = (userId: mongoose.Types.ObjectId, name: string, color: string) => {
  let category = new Category({userId: userId, name: name, color: color, cities: []})
  return category.save()
}

export const handleNewUser = (userId: mongoose.Types.ObjectId) => {
  console.log('hello')

  try {
    addNewCategory(userId, 'Visited', '#f00')
    addNewCategory(userId, 'To visit', '#00f')
    addNewCategory(userId, 'Favorites', '#ff0')
  } catch (err) {
    console.log(err)
  }
}

export const showUserCategories = (userId: mongoose.Types.ObjectId) => Category.find({ userId: userId })