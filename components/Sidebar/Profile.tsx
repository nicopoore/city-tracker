import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { Avatar, IconButton, Typography, Grid, Tooltip, Box } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { SignOut } from '../';

const Profile: React.FC = (): JSX.Element => {
  const [signoutDialogIsOpen, setSignoutDialogIsOpen] = useState(false);

  const session = useSession();
  const user = session[0].user;

  const handleOpenSignout = (): void => {
    setSignoutDialogIsOpen(true);
  };

  const handleCloseSignout = (): void => {
    setSignoutDialogIsOpen(false);
  };

  return (
    <>
      <Box bgcolor="#dadada" justifySelf="center" p={1.5} width="100%">
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="space-between"
          spacing={2}
          wrap="nowrap"
        >
          <Grid
            container
            item
            alignItems="center"
            direction="row"
            spacing={2}
            style={{ flexGrow: 1 }}
          >
            <Grid item>
              <Avatar alt={user.name} src={user.image} />
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600 }}>{user.name}</Typography>
            </Grid>
          </Grid>
          <Grid item>
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
        </Grid>
      </Box>
      <SignOut handleClose={handleCloseSignout} open={signoutDialogIsOpen} />
    </>
  );
};

export default Profile;
