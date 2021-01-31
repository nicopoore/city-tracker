import Head from 'next/head';
import { Map, Sidebar } from '../components';
import { Box } from '@material-ui/core';
import { signIn, useSession } from 'next-auth/client';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  }).then(res => res.json());

const Home: React.FC = (): JSX.Element => {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading map...</p>;
  }

  const { data, error } = useSWR('/api/cities', fetcher);

  if (error) return <div>An error has occured.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box display="flex">
      <>
        {session ? (
          <>
            <Head>
              <title>Wander Tracker</title>
              <link href="/favicon.ico" rel="icon" />
            </Head>

            <Box alignItems="center" display="flex" height="100vh" width="100%">
              <Sidebar cities={data} />
              <Map cities={data} />
            </Box>
          </>
        ) : (
          <>
            <p>Please sign in to access your map.</p>
            <button onClick={signIn}>Sign in</button>
          </>
        )}
      </>
    </Box>
  );
};

export default Home;
