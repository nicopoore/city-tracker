import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next'

interface Session {
  expires: string,
  user: User
  foo?: string
}

interface User {
  name: string,
  email: string,
  image: string,
  uid?: string,
}

interface DummyObject {
  [name: string]: any
}

const options = {
  callbacks: {
    jwt: async (token: DummyObject, user: DummyObject): Promise<DummyObject> => {
      if (user) {
        token.uid = user.id;
      }
      return Promise.resolve(token)
    },
    session: async (session: Session, user: User): Promise<Session> => {
      session.user.uid = user.uid
      return Promise.resolve(session)
    }
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
    maxAge: 30*24*60*60
  },
  debug: true,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)