import React, { useState } from 'react';

import { Add } from '@material-ui/icons';
import { Box, Fab, Tooltip } from '@material-ui/core';

import AddCityDialog from '../Dialogs/AddCity';
import { CategoryRecord, CityRecord } from '../types';

const SidebarNav: React.FC<{ cities: CityRecord[]; categories: CategoryRecord[] }> = (
  props
): JSX.Element => {
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
      <AddCityDialog
        categories={props.categories}
        cities={props.cities}
        closeAddCity={closeDialog}
        open={dialogOpen}
      />
    </>
  );
};

export default SidebarNav;
