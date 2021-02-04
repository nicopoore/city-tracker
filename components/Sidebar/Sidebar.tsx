import React from 'react';
import { Box, Hidden } from '@material-ui/core';
import { fullCitiesObject } from '../types';
import { SidebarNav, CityList, Profile } from '../';

const Sidebar: React.FC<{ cities: fullCitiesObject }> = (props): JSX.Element => {
  return (
    <Hidden mdDown>
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
        m={1}
        margin="0 1rem"
        style={{ overflowY: 'scroll' }}
        width={200}
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          flexWrap="nowrap"
          overflow="scroll"
        >
          <SidebarNav cities={props.cities} />
          <CityList cities={props.cities} />
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          maxWidth="400px"
          width="100%"
        >
          <Profile />
        </Box>
      </Box>
    </Hidden>
  );
};

export default Sidebar;
