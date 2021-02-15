import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../database/connect';
import { ObjectId } from 'mongodb'
import { getUserCities, getUserData } from '../../../database/actions'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Get session, userID and connect to DB
  const  { userId } = req.query
  const reqId = new ObjectId(userId)
  const { db } = await connectToDatabase();

  switch(req.method) {
    case 'GET':
      // Get user's cities and categories
      const userObject = await getUserData(db, reqId)
      let citiesObject = await getUserCities(db, reqId)

      const result = { user: userObject, cities: citiesObject}

      res.json(result)
      return res.end()
    default: 
      return res.status(405).end()
  }
}