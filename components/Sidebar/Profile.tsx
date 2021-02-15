import React, { useState } from 'react';
import { Avatar, Typography, Grid, Box } from '@material-ui/core';
import { SignOut, Share } from '../';
import { userObject } from '../types';
import { ProfileMenu } from '../';

const Profile: React.FC<{ user: userObject; isOwnMap?: boolean }> = (props): JSX.Element => {
  const [signoutDialogIsOpen, setSignoutDialogIsOpen] = useState(false);
  const [shareDialogIsOpen, setShareDialogIsOpen] = useState(false);

  const handleOpenSignout = (): void => {
    setSignoutDialogIsOpen(true);
  };

  const handleCloseSignout = (): void => {
    setSignoutDialogIsOpen(false);
  };

  const handleOpenShare = (): void => {
    setShareDialogIsOpen(true);
  };

  const handleCloseShare = (): void => {
    setShareDialogIsOpen(false);
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
              <Avatar alt={props.user.name} src={props.user.image} />
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600 }}>
                {props.user.name}
                {props.isOwnMap ? '' : "'s map"}
              </Typography>
            </Grid>
          </Grid>
          <ProfileMenu
            handleOpenShare={handleOpenShare}
            handleOpenSignout={handleOpenSignout}
            isOwnMap={props.isOwnMap}
          />
        </Grid>
      </Box>
      <Share handleClose={handleCloseShare} open={shareDialogIsOpen} user={props.user} />
      <SignOut handleClose={handleCloseSignout} open={signoutDialogIsOpen} />
    </>
  );
};

export default Profile;
