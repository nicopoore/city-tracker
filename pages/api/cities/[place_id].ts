import axios, { AxiosResponse } from "axios"
import { NextApiRequest, NextApiResponse } from 'next'
import { City } from '../../../components/types'

const formatRawGoogle = (rawData: AxiosResponse<any>): City => {
  const parts = rawData["data"].result.address_components
  const coor = rawData["data"].result.geometry.location

  return {
    uniqueID: 1,
    name: parts[0].long_name,
    country: parts[parts.length -1].long_name,
    coordinates: [coor.lat, coor.lng]
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
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
}