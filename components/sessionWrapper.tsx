import React from 'react'
import { useSession } from "next-auth/client"

const withSession = (ClassComponent) => props => {
  const session = useSession()

  if (ClassComponent.prototype.render) {
    return <ClassComponent session={session} {...props}/>
  }

  throw new Error([
   "You passed a function component, `withSession` is probably not needed.",
   "You can use `useSession` directly in your component."
  ].join("\n"))
}

export default withSession