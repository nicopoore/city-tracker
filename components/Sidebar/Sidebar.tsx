import React from 'react'
import { Box } from '@material-ui/core'

import { fullCitiesObject } from '../types'
import { SidebarNav, CityList } from '../'
import withSession from '../sessionWrapper'
import styles from '../../styles/Sidebar.module.css'

const CityListWithSession = withSession(CityList)

const Sidebar: React.FC<{ cities: fullCitiesObject }> = (props): JSX.Element => (
  <Box className={styles.container}>
    <SidebarNav cities={props.cities} />
    {/* <CityList cities={props.cities} /> */}
    <CityListWithSession cities={props.cities} />
    {/* {console.log(typeof CityList)} */}
  </Box>
)

export default Sidebar