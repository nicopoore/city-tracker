import React, { useState } from 'react';
import {
  AppBar,
  Box,
  SwipeableDrawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { fullCitiesObject, userObject } from '../types';
import { SidebarNav, CityList, Profile } from '../';
import MenuIcon from '@material-ui/icons/Menu';

const Sidebar: React.FC<{ cities: fullCitiesObject; user: userObject; isOwnMap?: boolean }> = (
  props
): JSX.Element => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const handleDrawerOpen = (): void => {
    setDrawerIsOpen(true);
  };
  const handleDrawerClose = (): void => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      <Hidden smDown>
        <Box
          alignItems="center"
          bgcolor="#ececec"
          borderRadius=".5rem"
          display="flex"
          flex="1 0"
          flexDirection="column"
          flexWrap="nowrap"
          height="96%"
          id="sidebarBox"
          justifyContent="space-between"
          minWidth={250}
          ml={2}
          mr={1}
          style={{ overflowY: 'scroll' }}
          width={220}
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            flexGrow={1}
            flexWrap="nowrap"
            justifyContent="space-between"
            overflow="scroll"
            width="100%"
          >
            <CityList cities={props.cities} isOwnMap={props.isOwnMap} />
          </Box>
          <Box alignItems="center" display="flex" flexDirection="column" width="100%">
            {props.isOwnMap && (
              <Box position="relative" width="100%">
                <SidebarNav cities={props.cities} />
              </Box>
            )}
            <Profile isOwnMap={props.isOwnMap} user={props.user} />
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <AppBar>
          <Toolbar>
            <IconButton aria-label="sidebar" color="inherit" style={{ marginRight: '1rem' }}>
              <MenuIcon onClick={handleDrawerOpen} />
            </IconButton>
            <Typography variant="h6">Wander Tracker</Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={drawerIsOpen}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
        >
          <Box
            bgcolor="#fafafa"
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
            style={{ overflowY: 'scroll' }}
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              flexWrap="nowrap"
              overflow="scroll"
            >
              <CityList cities={props.cities} isOwnMap={props.isOwnMap} />
            </Box>
            <Box alignItems="center" display="flex" width="100%">
              <Profile isOwnMap={props.isOwnMap} user={props.user} />
            </Box>
          </Box>
        </SwipeableDrawer>
        {props.isOwnMap && <SidebarNav cities={props.cities} />}
      </Hidden>
    </>
  );
};

export default Sidebar;
