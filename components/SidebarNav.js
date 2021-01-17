import React from 'react'
import styles from '../styles/SidebarNav.module.css'
import { TextField, Button } from '@material-ui/core'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

export default function SidebarNav() {
  return (
    <div className={styles.container}>
      <TextField 
        variant="outlined"
        placeholder="Add city..."
        size="small"
      />
      {/*<GooglePlacesAutocomplete 
        apiKey={process.env.GOOGLE_API}
      />*/}
      <div className={styles.buttonDiv}>
        <Button>+</Button>
        <Button>Q</Button>
      </div>
    </div>
  )
}
