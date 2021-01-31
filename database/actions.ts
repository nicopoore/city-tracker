import { CategoryRecord, fullCitiesObject } from '../components/types'
import { ObjectId, Db } from 'mongodb'

export const getUserCities = async (db: Db, userId: ObjectId): Promise<fullCitiesObject> => {
  /* Grab given user's categories and cities */

  // Grab user's categories
  const categories = await db
    .collection("categories")
    .find({ userId: userId })
    .toArray()

  // Merge cities arrays from user's categories
  const allCitiesArray = categories.reduce((acc: string[], category: CategoryRecord) => {
    acc = acc.concat(category.cities)
    return acc
  }, [])
  
  // Use merged array to query full cities database
  const cities = await db
  .collection("cities")
  .find({ place_id: { $in: allCitiesArray } }) // acá
  .toArray()

  return { categories: categories, cities: cities }
}

export const addNewCategory = async (db: Db, userId: ObjectId, name: string, color: string): Promise<{}> => {
  /* Create new empty category */

  const category = await db
    .collection("categories")
    .insertOne({
      name: name,
      userId: userId,
      color: color,
      cities: []
    })

  // Handle error while inserting
  if (category.insertedCount === 0) return Promise.reject({ statusText: "Failed to insert category", status: 404 })
  return category
}

export const handleNewUser = async (db: Db, userId: ObjectId): Promise<{}> => {
  /* Create default categories for given userId */

  const defaultCategories = [
    { userId: userId, name: 'Visited', color: '#f00', cities: [] },
    { userId: userId, name: 'To visit', color: '#00f', cities: [] },
    { userId: userId, name: 'Favorites', color: '#ff0', cities: [] },
  ]

  let newUserCategories = await db
    .collection("categories")
    .insertMany(defaultCategories)

  // Handle error while inserting
  if (newUserCategories.insertedCount === 0) return Promise.reject({ statusText: "Failed to insert categories", status: 404 })
  return newUserCategories
}

export const createCity = async (db: Db, place_id: string, name: string, country: string, coordinates: number[]): Promise<{}> => {
  /* Check database for existing city document by place_id, if it doesn't exist create it. */

  const city = await db
    .collection("cities")
    .updateOne(
      { place_id: place_id },
      {
        $setOnInsert: {
          name: name,
          country: country,
          coordinates: coordinates,
          place_id: place_id
        }
      },
      { upsert: true }
    )

  // Handle error while inserting
   if (city.upsertedCount === 0 && city.matchedCount === 0) return Promise.reject({ statusText: "Failed to insert categories", status: 404 })
  return city
}

export const addCityToCategory = async (db: Db, place_id: string, category_id: ObjectId): Promise<{}> => {
  /* Check category for city, if the city isn't in the category's cities array, add it */

  const category = await db
    .collection("categories")
    .updateOne({ _id: category_id }, { $addToSet: { cities: place_id }})

  return category
}

export const removeCityFromCategory = async (db: Db, place_id: string, category_id: ObjectId): Promise<{}> => {
  /* Remove city (place_id) from given category('s cities array) */

  const category = await db
    .collection("categories")
    .updateOne({ _id: category_id }, { $pull: { cities: place_id }})
  
  return category
}