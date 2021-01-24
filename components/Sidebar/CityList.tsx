import React, { Component } from 'react'
import styles from '../../styles/List.module.css'
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore, Room } from '@material-ui/icons'
import { City, NestedCities } from '../types'
import { Category } from '../types'

// const defaultState: { [name: string]: any } = {
//   cities: [
//     {
//       uniqueID: 0, // ExampleID, would be provided by database
//       name: "Buenos Aires",
//       country: "Argentina",
//       coordinates: [-34.6037, -58.3816]
//     },
//     {
//       uniqueID: 1, // ExampleID, would be provided by database
//       name: "Sao Paulo",
//       country: "Brazil",
//       coordinates: [-34.6037, -58.3816]
//     },
//     {
//       uniqueID: 2, // ExampleID, would be provided by database
//       name: "New York",
//       country: "United States of America",
//       coordinates: [34.6037, -58.3816]
//     },
//     {
//       uniqueID: 3, // ExampleID, would be provided by database
//       name: "Córdoba",
//       country: "Argentina",
//       coordinates: [34.6037, -58.3816]
//     },
//     {
//       uniqueID: 4, // ExampleID, would be provided by database
//       name: "Paris",
//       country: "France",
//       coordinates: [34.6037, -58.3816]
//     }
//   ],
//   categories: {
//     "Visited": {
//       color: "#ff0000", cities: [0, 3, 2]
//     },
//     "To visit": {
//       color: "#0000ff", cities: [1]
//     },
//     "Favourites": {
//       color: "#ffff00", cities: [4]
//     }
//   }
// }

class CityList extends Component<{ categories: Category[] }, { [name: string]: any }> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  nestDatabase = (flat: City[]): NestedCities => {
    return flat.reduce((nested: { [name: string]: string[] }, city: City) => {
        let country = nested[city["country"]] ||= []
        country.push(city["name"])
        return nested
      },
      {}
    )
  }

  renderCategory = (category: Category) => {
    const filteredCities = [].filter(city => category.cities.includes(city.uniqueID))
    const nestedArr = this.nestDatabase(filteredCities)

    return (
      <Box>
        <ListItem key={category.name} onClick={this.handleItemClick.bind(this, category.name)} button>
          <ListItemIcon>
            <Room style={{color: category.color}} />
          </ListItemIcon>
          <ListItemText primary={category.name} />
          {this.state[category.name] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={this.state[category.name]}>
          <List className={styles.countries}>
            {this.renderCountries(nestedArr)}
          </List>
        </Collapse>
      </Box>
    )
  }

  handleItemClick = (e: string | number): void => {
    this.setState({ [e]: !this.state[e] })
  }

  renderCountries = (countries: NestedCities) => {
    return Object.keys(countries).map(country => (
      <Box>
        <ListItem key={country} onClick={this.handleItemClick.bind(this, country)} button>
          <ListItemText primary={country} />
          {this.state[country] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={this.state[country]}>
          <List className={styles.cities}>
            {this.renderCities(countries[country])}
          </List>
        </Collapse>
      </Box>
    ))
  }
  
  renderCities = (cities: string[]) => {
    return cities.map(city => (
      <ListItem key={city}>{city}</ListItem>
    ))
  }

  logSession = (): void => {
    // Testing purposes only
    console.log(this.props['session'])
  }

  render() {
    const renderedCategories = this.props.categories.map(category => this.renderCategory(category))
    return (
      <Box className={styles.container}>
        <List className={styles.categories}>
          {renderedCategories}
        </List>
        {(1 / 1 === 0) && <button onClick={this.logSession}>Log</button>} 
        {this.props['session'][0].user.name}
      </Box>
    )
  }
}

export default CityList