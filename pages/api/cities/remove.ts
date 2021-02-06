import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

import { connectToDatabase } from '../../../utils/database/connect'
import { removeCityFromCategory } from '../../../utils/database/actions'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {

  // Get session, userID and connect to DB
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