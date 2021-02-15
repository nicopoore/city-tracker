import React from 'react';
import { signIn } from 'next-auth/client';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';

const SignIn: React.FC = (): JSX.Element => {
  return (
    <>
      <Box position="absolute" width="100%" zIndex={-1000}>
        <Box bgcolor="rgba(0,0,0,0.7)" height="99.5%" position="absolute" width="100%" />
        <Hidden smDown>
          <img src="/gifSignIn.gif" width="100%" />
        </Hidden>
        <Hidden mdUp>
          <img src="/gifSignInXs.gif" width="100%" />
        </Hidden>
      </Box>
      <Grid
        container
        alignItems="center"
        direction="column"
        justify="center"
        style={{ minHeight: '90vh' }}
      >
        <Grid item>
          <Card style={{ padding: '1em' }} variant="outlined">
            <CardContent>
              <Typography align="center" variant="h4">
                Wander Tracker
              </Typography>
              <Typography align="center" variant="subtitle1">
                Sign in and start your own world map!
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button color="primary" variant="contained" onClick={signIn}>
                Sign in
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
