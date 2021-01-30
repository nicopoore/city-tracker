import { signIn, signOut, useSession } from 'next-auth/client';
import { Link } from '@material-ui/core';

const Home: React.FC = (): JSX.Element => {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
      <div>
        <Link href="/private">
          <a>Private page</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
