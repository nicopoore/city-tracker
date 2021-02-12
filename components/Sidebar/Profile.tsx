import React, { useState } from 'react';
import { Avatar, IconButton, Typography, Grid, Tooltip, Box } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { SignOut } from '../';
import { userObject } from '../types';

const Profile: React.FC<{ user: userObject; isOwnMap?: boolean }> = (props): JSX.Element => {
  const [signoutDialogIsOpen, setSignoutDialogIsOpen] = useState(false);

  const handleOpenSignout = (): void => {
    setSignoutDialogIsOpen(true);
  };

  const handleCloseSignout = (): void => {
    setSignoutDialogIsOpen(false);
  };

  return (
    <>
      <Box bgcolor="#dadada" justifySelf="center" p={1.5} width="100%">
        <Grid container alignItems="center" direction="row" justify="space-between" spacing={2}>
          <Grid
            container
            item
            alignItems="center"
            direction="row"
            spacing={2}
            xs={props.isOwnMap ? 9 : 12}
          >
            <Grid item>
              <Avatar alt={props.user.name} src={props.user.image} />
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600 }}>
                {props.user.name}
                {props.isOwnMap ? '' : "'s map"}
              </Typography>
            </Grid>
          </Grid>
          {props.isOwnMap && (
            <Grid item xs={3}>
              <Tooltip aria-label="Sign out" placement="bottom" title="Sign out">
                <IconButton
                  aria-controls="sign-out"
                  aria-haspopup={true}
                  justify-self="flex-end"
                  onClick={handleOpenSignout}
                >
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Box>
      <SignOut handleClose={handleCloseSignout} open={signoutDialogIsOpen} />
    </>
  );
};

export default Profile;
