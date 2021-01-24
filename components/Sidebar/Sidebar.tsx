import React from 'react'
import { Box } from '@material-ui/core'

import { Category } from '../types'
import { SidebarNav, CityList, withSession } from '../'
import styles from '../../styles/Sidebar.module.css'

const CityListWithSession = withSession(CityList)

const Sidebar: React.FC<{categories: Category[]}> = (props): JSX.Element => (
  <Box className={styles.container}>
    <SidebarNav categories={props.categories} />
    <CityListWithSession categories={props.categories} />
  </Box>
)

export default Sidebar