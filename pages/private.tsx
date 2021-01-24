import React from 'react';
import { signIn, useSession } from 'next-auth/client';

const Private: React.FC = (): JSX.Element => {
  const [session, loading] = useSession()
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
    {session ? (
      <p>Signed in</p>
    ) : (
      <p>
        <p>You are not permitted to see this page.</p>
        <button onClick={signIn}>Sign in</button>
      </p>
    )}
    </>
  )
}

export default Private