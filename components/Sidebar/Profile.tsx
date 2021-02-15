import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  Typography,
  Grid,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import { Code, MoreHoriz, Share as ShareIcon, ExitToApp } from '@material-ui/icons';
import { SignOut, Share } from '../';
import { userObject } from '../types';

const Profile: React.FC<{ user: userObject; isOwnMap?: boolean }> = (props): JSX.Element => {
  const [signoutDialogIsOpen, setSignoutDialogIsOpen] = useState(false);
  const [shareDialogIsOpen, setShareDialogIsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleOpenSignout = (): void => {
    setSignoutDialogIsOpen(true);
    handleCloseMenu();
  };

  const handleCloseSignout = (): void => {
    setSignoutDialogIsOpen(false);
  };

  const handleOpenShare = (): void => {
    setShareDialogIsOpen(true);
    handleCloseMenu();
  };

  const handleCloseShare = (): void => {
    setShareDialogIsOpen(false);
  };

  const handleOpenMenu = (e): void => {
    setMenuAnchor(e.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setMenuAnchor(null);
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
          {props.isOwnMap && (
            <Grid>
              <Menu
                keepMounted
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  aria-controls="see-code"
                  component="a"
                  href="https://github.com/nicopoore/city-tracker"
                  rel="noreferrer"
                  target="_blank"
                  onClick={handleCloseMenu}
                >
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <Code />
                  </ListItemIcon>
                  Source code
                </MenuItem>
                <MenuItem aria-controls="share-map" aria-haspopup={true} onClick={handleOpenShare}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <ShareIcon />
                  </ListItemIcon>
                  Share map
                </MenuItem>
                <MenuItem aria-controls="sign-out" aria-haspopup={true} onClick={handleOpenSignout}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <ExitToApp />
                  </ListItemIcon>
                  Sign out
                </MenuItem>
              </Menu>
              <Tooltip aria-label="Open menu" placement="bottom" title="Open menu">
                <IconButton
                  aria-controls="open-menu"
                  aria-haspopup={true}
                  justify-self="flex-end"
                  onClick={handleOpenMenu}
                >
                  <MoreHoriz />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Box>
      <Share handleClose={handleCloseShare} open={shareDialogIsOpen} user={props.user} />
      <SignOut handleClose={handleCloseSignout} open={signoutDialogIsOpen} />
    </>
  );
};

export default Profile;
