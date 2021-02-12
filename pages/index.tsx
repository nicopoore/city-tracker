import { Map, Sidebar, Loading, SignIn, Meta } from '../components';
import { Box, Grid } from '@material-ui/core';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import React from 'react';

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
    return (
      <>
        <Meta />
        <Loading currentState="Fetching user data..." />
      </>
    );
  }

  if (!session)
    return (
      <>
        <Meta />
        <SignIn />
      </>
    );
  const { data, error } = useSWR('/api/cities', fetcher);

  if (error)
    return (
      <Grid
        container
        alignItems="center"
        direction="column"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>Error fetching your cities.</Grid>
      </Grid>
    );
  if (!data)
    return (
      <>
        <Meta />
        <Loading currentState="Loading cities..." finishedStates={['Fetched user data...']} />
      </>
    );

  return (
    <>
      <Meta />
      <Box display="flex">
        <Box alignItems="center" display="flex" height="100vh" width="100%">
          <Sidebar isOwnMap cities={data} user={session.user} />
          <Map cities={data} />
        </Box>
      </Box>
    </>
  );
};

export default Home;
