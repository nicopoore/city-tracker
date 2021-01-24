import React, { Component } from 'react'
import styles from '../../styles/SidebarNav.module.css'
import { Box, Button } from '@material-ui/core'
import AddCity from './AddCity'
import { signOut } from 'next-auth/client'
import { Category } from '../types'

interface SidebarNavState {
  addCityDialogOpen: boolean
}

class SidebarNav extends Component<{ categories: Category[] }, SidebarNavState> {
  constructor(props: { categories: Category[] } | Readonly<{ categories: Category[] }>) {
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
        <AddCity open={this.state.addCityDialogOpen} closeAddCity={this.closeAddCity} categories={this.props.categories} />
      </Box>
    )
  }
}

export default SidebarNav