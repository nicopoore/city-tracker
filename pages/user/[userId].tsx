import { Box, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { Loading, Meta, Sidebar, Map } from '../../components';

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  }).then(res => res.json());

const UserCities: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, error } = useSWR(`/api/user/${userId}`, fetcher);

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
        <Meta userName={data.user.name} />
        <Loading currentState="Loading cities..." finishedStates={['Fetched user data...']} />
      </>
    );

  return (
    <>
      <Meta userName={data.user.name} />
      <Box display="flex">
        <Box alignItems="center" display="flex" height="100vh" width="100%">
          <Sidebar cities={data.cities} user={data.user} />
          <Map cities={data.cities} />
        </Box>
      </Box>
    </>
  );
};

export default UserCities;
