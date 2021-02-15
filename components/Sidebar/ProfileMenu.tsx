import { IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Code, ExitToApp, Home, MoreHoriz, Share } from '@material-ui/icons';
import React, { useState } from 'react';

const ProfileMenu: React.FC<{ isOwnMap: boolean; handleOpenShare; handleOpenSignout }> = (
  props
): JSX.Element => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleOpenMenu = (e): void => {
    setMenuAnchor(e.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setMenuAnchor(null);
  };

  const handleOpenShare = (): void => {
    props.handleOpenShare();
    handleCloseMenu();
  };

  const handleOpenSignout = (): void => {
    props.handleOpenSignout();
    handleCloseMenu();
  };

  return (
    <>
      <Menu keepMounted anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu}>
        <MenuItem
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
        {props.isOwnMap && (
          <>
            <MenuItem aria-controls="share-map" aria-haspopup={true} onClick={handleOpenShare}>
              <ListItemIcon style={{ minWidth: '40px' }}>
                <Share />
              </ListItemIcon>
              Share your map
            </MenuItem>
            <MenuItem aria-controls="sign-out" aria-haspopup={true} onClick={handleOpenSignout}>
              <ListItemIcon style={{ minWidth: '40px' }}>
                <ExitToApp />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </>
        )}
        {!props.isOwnMap && (
          <MenuItem component="a" href="/">
            <ListItemIcon style={{ minWidth: '40px' }}>
              <Home />
            </ListItemIcon>
            Go to your map
          </MenuItem>
        )}
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
    </>
  );
};

export default ProfileMenu;
