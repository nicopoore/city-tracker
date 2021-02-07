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

  render(): JSX.Element {
    return (
      <>
        <Box
          bottom={window.innerWidth >= 992 ? 110 : 20}
          left={window.innerWidth >= 992 ? 250 : false}
          position="absolute"
          right={window.innerWidth >= 992 ? false : 20}
          zIndex="1000"
        >
          <Tooltip aria-label="Add city" placement="top" title="Add city">
            <Fab color="primary" onClick={this.openAddCity}>
              <Add />
            </Fab>
          </Tooltip>
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
