import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import axios, { AxiosResponse } from "axios"
import { ObjectId } from 'mongodb'

import { connectToDatabase } from '../../../database/connect'
import { handleNewUser, getCategories, createCity, addCityToCategory } from '../../../database/actions'
import { City } from '../../../components/types'

const formatRawGoogle = (rawData: AxiosResponse<any>, place_id: string): City => {
  const parts = rawData["data"].result.address_components
  const coor = rawData["data"].result.geometry.location

  return {
    name: parts[0].long_name,
    country: parts[parts.length - 1].long_name,
    coordinates: [coor.lat, coor.lng],
    place_id: place_id
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const reqId = new ObjectId(session.user.uid)
  const { db } = await connectToDatabase();

  switch(req.method) {
    case 'GET':
      // Get user's cities and categories
      const categories = await getCategories(db, reqId)

      if (categories.length === 0) {
        handleNewUser(db, reqId)
      }

      res.json(categories)
      res.end()
      break;

    case 'POST':
      // Create city and/or add it to a category
      
      const url = 'https://maps.googleapis.com/maps/api/place/details/json'
      const { place_id, category_id } = req.body
      const newCategory = new ObjectId(category_id)

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
        const dbCategory = await addCityToCategory(db, place_id, newCategory)

      } catch (err) {
        console.log('index.ts error: ', err)
        res.end()
      }
      break;

    default:
      res.send('No request method sent')
      res.end()
  }
}