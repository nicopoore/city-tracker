import Head from 'next/head';
import { Map, Sidebar, Loading, SignIn } from '../components';
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
    return <Loading currentState="Fetching user data..." />;
  }

  if (!session)
    return (
      <>
        <Head>
          <title>Wander Tracker</title>
          <link href="/favicon.ico" rel="icon" />
        </Head>
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
    return <Loading currentState="Loading cities..." finishedStates={['Fetched user data...']} />;

  return (
    <>
      <Head>
        <title>Wander Tracker</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box display="flex">
        <Box alignItems="center" display="flex" height="100vh" width="100%">
          <Sidebar cities={data} />
          <Map cities={data} />
        </Box>
      </Box>
    </>
  );
};

export default Home;
