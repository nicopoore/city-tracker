import React from 'react'
import { Box } from '@material-ui/core'

import { Category } from '../types'
import { SidebarNav, CityList } from '../'
import withSession from '../sessionWrapper'
import styles from '../../styles/Sidebar.module.css'

const CityListWithSession = withSession(CityList)

const Sidebar: React.FC<{categories: Category[]}> = (props): JSX.Element => (
  <Box className={styles.container}>
    <SidebarNav categories={props.categories} />
    {/* <CityList categories={props.categories} /> */}
    <CityListWithSession categories={props.categories} />
    {/* {console.log(typeof CityList)} */}
  </Box>
)

export default Sidebar