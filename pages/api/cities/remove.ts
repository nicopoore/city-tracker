import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import axios, { AxiosResponse } from "axios"
import { ObjectId } from 'mongodb'

import { connectToDatabase } from '../../../database/connect'
import { removeCityFromCategory } from '../../../database/actions'
import { City } from '../../../components/types'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {

  // Get session, userID and connect to DB
  const session = await getSession({ req })
  const reqId = new ObjectId(session.user.uid)
  const { db } = await connectToDatabase();

  switch(req.method) {
    case 'GET':
      
    case 'POST':

      const { place_id, category_id } = req.body
      const newCategory = new ObjectId(category_id)

      const dbCategory = await removeCityFromCategory(db, place_id, newCategory)

      if (dbCategory) return res.status(200).end()
      return res.status(405).end()

    default:
      res.status(405).end();
      break;
  }
}