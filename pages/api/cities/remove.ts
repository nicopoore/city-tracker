import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

import { connectToDatabase } from '../../../utils/database/connect'
import { removeCityFromCategory, getUserIdFromCategory } from '../../../utils/database/actions'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {

  // Get session, userID and connect to DB
  const session = await getSession({ req })
  const loggedUserId = new ObjectId(session.user.uid)
  const { db } = await connectToDatabase();

  switch(req.method) {
    case 'POST':

      const { place_id, category_id } = req.body
      if (place_id.length > 200 || category_id.length > 200 || place_id.constructor.name !== 'String' || category_id.constructor.name !== 'String') return res.status(422).end()
      const newCategory = new ObjectId(category_id)

      // Check if logged in user is map owner

      const userId = await getUserIdFromCategory(db, newCategory)
      if (userId.toString() !== loggedUserId.toString()) {
        return res.status(401).end()
      }

      const dbCategory = await removeCityFromCategory(db, place_id, newCategory)

      if (dbCategory) return res.status(200).end()
      return res.status(400).end()

    default:
      res.status(405).end();
      break;
  }
}