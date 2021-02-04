import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/client';
import {
  Avatar,
  IconButton,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Tooltip,
  Box,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

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
        <Grid container alignItems="center" direction="row" justify="space-between" spacing={2}>
          <Grid container item alignItems="center" direction="row" spacing={2} xs={9}>
            <Grid item>
              <Avatar alt={user.name} src={user.image} />
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600 }}>{user.name}</Typography>
            </Grid>
          </Grid>
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
        </Grid>
      </Box>
      <Dialog open={signoutDialogIsOpen} onClose={handleCloseSignout}>
        <DialogTitle>Are you sure you want to sign out?</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={handleCloseSignout}>
            No
          </Button>
          <Button color="secondary" onClick={signOut}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
