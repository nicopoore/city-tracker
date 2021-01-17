import React from 'react'
import styles from '../styles/Sidebar.module.css'
import SidebarNav from './SidebarNav'
import CityList from './List'

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <SidebarNav />
      <CityList />
    </div>
  )
}
