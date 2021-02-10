import { Grid, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

const Loading: React.FC<{ currentState: string; finishedStates?: string[] }> = (
  props
): JSX.Element => {
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
        <Typography align="center">{props.currentState}</Typography>
        {props.finishedStates &&
          props.finishedStates.map(state => (
            <Typography key={state} align="center" color="textSecondary">
              {state}
            </Typography>
          ))}
      </Grid>
    </Grid>
  );
};

export default Loading;
