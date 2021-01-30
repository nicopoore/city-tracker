import React from 'react';
import { Box } from '@material-ui/core';

import { fullCitiesObject } from '../types';
import { SidebarNav, CityList } from '../';
import withSession from '../sessionWrapper';

const CityListWithSession = withSession(CityList);

const Sidebar: React.FC<{ cities: fullCitiesObject }> = (props): JSX.Element => (
  <Box
    alignItems="center"
    bgcolor="#ececec"
    borderRadius=".5rem"
    display="flex"
    flex="1 0"
    flexDirection="column"
    flexWrap="nowrap"
    height="96%"
    m={1}
    margin="0 1rem"
    width={200}
  >
    <SidebarNav cities={props.cities} />
    <CityListWithSession cities={props.cities} />
  </Box>
);

export default Sidebar;
