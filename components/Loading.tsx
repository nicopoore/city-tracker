import { Grid, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

const Loading: React.FC<{ currentState: string }> = (props): JSX.Element => {
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
      spacing={2}
      style={{ height: '100vh' }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
      <Grid item>
        <Typography>{props.currentState}</Typography>
      </Grid>
    </Grid>
  );
};

export default Loading;
