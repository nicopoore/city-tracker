import Head from 'next/head';
import { Map, Sidebar, Loading } from '../components';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import { signIn, useSession } from 'next-auth/client';
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
  const signInScreen = (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Typography>Please sign in to access your map.</Typography>
      </Grid>
      <Grid item>
        <Button color="primary" onClick={signIn}>
          Sign in
        </Button>
      </Grid>
    </Grid>
  );

  if (loading) {
    return <Loading currentState="Fetching user data..." />;
  }

  if (!session) return signInScreen;
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
  if (!data) return <Loading currentState="Loading cities..." />;

  return (
    <Box display="flex">
      <Head>
        <title>Wander Tracker</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {session ? (
        <Box alignItems="center" display="flex" height="100vh" width="100%">
          <Sidebar cities={data} />
          <Map cities={data} />
        </Box>
      ) : (
        signInScreen
      )}
    </Box>
  );
};

export default Home;
