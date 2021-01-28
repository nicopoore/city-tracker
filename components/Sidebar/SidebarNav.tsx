import React, { Component } from 'react'
import styles from '../../styles/SidebarNav.module.css'
import { Box, Button } from '@material-ui/core'
import AddCity from './AddCity'
import { signOut } from 'next-auth/client'
import { Category, fullCitiesObject } from '../types'

interface SidebarNavState {
  addCityDialogOpen: boolean
}

class SidebarNav extends Component<{ cities: fullCitiesObject }, SidebarNavState> {
  constructor(props: { cities: fullCitiesObject } | Readonly<{ cities: fullCitiesObject }>) {
    super(props)
    this.state = {
      addCityDialogOpen: false
    }
  }

  openAddCity = (): void => {
    this.setState({
      addCityDialogOpen: true
    })
  }

  closeAddCity = (): void => {
    this.setState({
      addCityDialogOpen: false
    })
  }

  render() {

    return (
      <Box className={styles.container}>
        <Box className={styles.buttonDiv}>
          <Button onClick={this.openAddCity}>Add city</Button>
          <Button onClick={signOut}>Sign out</Button>
        </Box>
        <AddCity open={this.state.addCityDialogOpen} closeAddCity={this.closeAddCity} cities={this.props.cities} />
      </Box>
    )
  }
}

export default SidebarNav