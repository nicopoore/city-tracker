import { CategoryRecord, fullCitiesObject } from '../../components/types'
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
  .find({ place_id: { $in: allCitiesArray } })
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
    { userId: userId, name: 'Favorites', color: '#FFDF00', cities: [] },
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

export const addCityToCategory = async (db: Db, place_id: string, category_name: string, category_id: ObjectId): Promise<{}> => {
  /* Check category for city, if the city isn't in the category's cities array, add it */
  /* Remove city from To visit if added to Visited and viceversa */

  if (category_name === 'Visited') {
    await db.collection("categories").updateOne({ name: "To visit"}, { $pull: { cities: place_id }} )
  } else if (category_name === 'To visit') {
    await db.collection("categories").updateOne({ name: "Visited"}, { $pull : { cities: place_id }})
  }

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

export const getUserData = async (db: Db, userId: ObjectId): Promise<any> => {
  /* Get user name and picture from userId */

  const user = await db
    .collection("users")
    .findOne({ _id: userId })

  return user
}

export const getUserIdFromCategory = async (db: Db, category_id: ObjectId): Promise<{}> => {
  /* Get a user's Id from a Category Id */

  const category = await db
    .collection("categories")
    .findOne({ _id: category_id })

  return category.userId
}