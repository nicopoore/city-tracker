import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import axios, { AxiosResponse } from "axios"
import { ObjectId } from 'mongodb'

import { connectToDatabase } from '../../../database/connect'
import { handleNewUser, getUserCities, createCity, addCityToCategory, getUserIdFromCategory } from '../../../database/actions'
import { City } from '../../../components/types'

const formatRawGoogle = (rawData: AxiosResponse<any>, place_id: string): City => {
  const parts = rawData["data"].result.address_components
  const coor = rawData["data"].result.geometry.location

  let country = parts.find((part: { long_name: string, short_name: string, types: string[] }[]) => part["types"].indexOf("country") >= 0) // Get country object from response
  country = !country ? parts[0].long_name : country.long_name // Use city name as country if no country is present

  return {
    name: parts[0].long_name,
    country: country,
    coordinates: [coor.lat, coor.lng],
    place_id: place_id
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  // Get session, userID and connect to DB
  const session = await getSession({ req })
  const loggedUserId = new ObjectId(session.user.uid)
  const { db } = await connectToDatabase();

  switch(req.method) {
    case 'GET':
      // Get user's cities and categories
      let citiesObject = await getUserCities(db, loggedUserId)

      if (citiesObject.categories.length === 0) {
        await handleNewUser(db, loggedUserId)
        citiesObject = await getUserCities(db, loggedUserId)
      }

      res.json(citiesObject)
      return res.end()

    case 'POST':
      // Create city and/or add it to a category
      
      const url = 'https://maps.googleapis.com/maps/api/place/details/json'
      const { place_id, category_name, category_id } = req.body
      if (place_id.length > 200 || category_name.length > 22 || category_id.length > 200 || place_id.constructor.name !== 'String' || category_name.constructor.name !== 'String' || category_id.constructor.name !== 'String') return res.status(400).end()
      const newCategory = new ObjectId(category_id)

      // Check if logged in user is map owner

      const userId = await getUserIdFromCategory(db, newCategory)
      if (userId.toString() !== loggedUserId.toString()) {
        return res.status(401).end()
      }

      // Get city info from Google
      try {
        const rawData = await axios.get(url, {
          params: {
            key: process.env.GOOGLE_SERVER_API,
            place_id: place_id
          }
        })
        const { name, country, coordinates } = formatRawGoogle(rawData, place_id)

        // Create city, find category and add city to it
        const dbCity = await createCity(db, place_id, name, country, coordinates)
        const dbCategory = await addCityToCategory(db, place_id, category_name, newCategory)

        if (dbCity && dbCategory) {
          return res.status(200).end()
        }
        return res.send('Error adding city')

      } catch (err) {
        console.log('index.ts error: ', err)
        return res.status(400).end()
      }

    default:
      return res.status(405).end();
  }
}