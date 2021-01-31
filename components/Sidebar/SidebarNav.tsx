import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import AddCity from './AddCity';
import { signOut } from 'next-auth/client';
import { fullCitiesObject } from '../types';

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
        <Box display="flex" justifyContent="space-evenly" width="100%">
          <Button color="primary" variant="contained" onClick={this.openAddCity}>
            Add city
          </Button>
          <Button color="primary" variant="contained" onClick={signOut}>
            Sign out
          </Button>
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
