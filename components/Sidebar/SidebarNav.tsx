import React, { useState } from 'react';
import { Box, Fab, Tooltip } from '@material-ui/core';
import AddCity from './AddCity';
import { fullCitiesObject } from '../types';
import { Add } from '@material-ui/icons';

const SidebarNav: React.FC<{ cities: fullCitiesObject }> = (props): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = (): void => {
    setDialogOpen(true);
  };

  const closeDialog = (): void => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box bottom="0" position="absolute" right="0">
        <Box alignSelf="flex-end" mb={2} mr={2}>
          <Tooltip aria-label="Add city" placement="top" title="Add city">
            <Fab color="primary" onClick={openDialog}>
              <Add />
            </Fab>
          </Tooltip>
        </Box>
      </Box>
      <AddCity cities={props.cities} closeAddCity={closeDialog} open={dialogOpen} />
    </>
  );
};

export default SidebarNav;
