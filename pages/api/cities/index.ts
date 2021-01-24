import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import axios, { AxiosResponse } from "axios"
import mongoose from 'mongoose'

import { connectToDatabase } from '../../../database/connect'
import { handleNewUser } from '../../../database/actions'
import { City } from '../../../components/types'

const formatRawGoogle = (rawData: AxiosResponse<any>): City => {
  const parts = rawData["data"].result.address_components
  const coor = rawData["data"].result.geometry.location

  return {
    uniqueID: 1,
    name: parts[0].long_name,
    country: parts[parts.length - 1].long_name,
    coordinates: [coor.lat, coor.lng]
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_API}&place_id=${e.value.place_id}`

  const session = await getSession({ req })
  const reqId = mongoose.Types.ObjectId(session.user.uid)
  const { db } = await connectToDatabase();

  switch(req.method) {
    case 'GET':
      // Get user's cities and categories
      const categories = await db
        .collection("categories")
        .find({ userId: reqId })
        .toArray()

      if (categories.length === 0) {
        handleNewUser(reqId)
      }

      res.json(categories)
      res.end()
      break;

    case 'POST':
      // Add a city to a category - not currently working, see handleSubmit() method in /components/Sidebar/AddCity.tsx
      const { query: { place_id }} = req
      const url = 'https://maps.googleapis.com/maps/api/place/details/json'

      try {
        const rawData = await axios.get(url, {
          params: {
            key: process.env.GOOGLE_SERVER_API,
            place_id: place_id
          }
        })
        const formattedData = formatRawGoogle(rawData)

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(formattedData))
      } catch (err) {
        res.statusCode = 405
        res.end()
      }
      break;

    default:
      res.send('No request method sent')
      res.end()
  }
}