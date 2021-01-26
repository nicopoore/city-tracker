import mongoose from 'mongoose';
import { Category, CategoryRecord } from '../components/types'
import { ObjectId } from 'mongodb'

export const getCategories = async (db, userId: ObjectId): Promise<CategoryRecord[]> => {
  /* Grab given user's categories */

  const categories = await db
    .collection("categories")
    .find({ userId: userId })
    .toArray()

  return categories
}

export const addNewCategory = async (db, userId: ObjectId, name: string, color: string) => {
  const category = await db
    .collection("categories")
    .insertOne({
      name: name,
      userId: userId,
      color: color,
      cities: []
    })

  if (category.insertedCount === 0) return Promise.reject({ statusText: "Failed to insert category", status: 404 })
  return category
}

export const handleNewUser = async (db, userId: ObjectId) => {
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

export const createCity = async (db, place_id: string, name: string, country: string, coordinates: number[]) => {
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

export const addCityToCategory = async (db, place_id: string, category_id: ObjectId): Promise<any> => {
  /* Check category for city, if the city isn't in the category's cities array, add it */

  const category = await db
    .collection("categories")
    .updateOne({ _id: category_id }, { $addToSet: { cities: place_id }})

  return category
}