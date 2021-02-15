import React, { useState } from 'react';

import { Avatar, Typography, Grid, Box } from '@material-ui/core';

import { SignOutDialog, ShareDialog, UserMenu } from '..';
import { userObject } from '../types';

interface UserProps {
  user: userObject;
  isOwnMap?: boolean;
}

const Profile: React.FC<UserProps> = (props): JSX.Element => {
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
          <UserMenu
            handleOpenShare={handleOpenShare}
            handleOpenSignout={handleOpenSignout}
            isOwnMap={props.isOwnMap}
          />
        </Grid>
      </Box>
      <ShareDialog handleClose={handleCloseShare} open={shareDialogIsOpen} user={props.user} />
      <SignOutDialog handleClose={handleCloseSignout} open={signoutDialogIsOpen} />
    </>
  );
};

export default Profile;
