import React, { Component } from 'react';
import { Box, Fab, Tooltip } from '@material-ui/core';
import AddCity from './AddCity';
import { fullCitiesObject } from '../types';
import { Add } from '@material-ui/icons';

interface SidebarNavState {
  addCityDialogOpen: boolean;
}

class SidebarNav extends Component<{ cities: fullCitiesObject }, SidebarNavState> {
  constructor(props: { cities: fullCitiesObject } | Readonly<{ cities: fullCitiesObject }>) {
    super(props);
    this.state = {
      addCityDialogOpen: false,
    };
  }

  openAddCity = (): void => {
    this.setState({
      addCityDialogOpen: true,
    });
  };

  closeAddCity = (): void => {
    this.setState({
      addCityDialogOpen: false,
    });
  };

  calculatePosition = (): { bottom: number; left: number; right: number } => {
    return { bottom: 1, left: 1, right: 1 };
  };

  render(): JSX.Element {
    return (
      <>
        <Box bottom="0" position="absolute" right="0">
          <Box alignSelf="flex-end" bgcolor="transparent" mb={2} mr={2}>
            <Tooltip aria-label="Add city" placement="top" title="Add city">
              <Fab color="primary" onClick={this.openAddCity}>
                <Add />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
        <AddCity
          cities={this.props.cities}
          closeAddCity={this.closeAddCity}
          open={this.state.addCityDialogOpen}
        />
      </>
    );
  }
}

export default SidebarNav;
