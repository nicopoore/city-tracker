import React, { Component } from 'react'
import styles from '../../styles/List.module.css'
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore, Room } from '@material-ui/icons'
import { City, NestedCities } from '../types'
import { Category, fullCitiesObject } from '../types'
import axios from 'axios'
import { ObjectId } from 'mongodb'

class CityList extends Component<{ cities: fullCitiesObject }, { [name: string]: any }> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  nestDatabase = (flat: City[]): NestedCities => {
    return flat.reduce((nested: { [name: string]: { name: string, place_id: string }[] }, city: City) => {
        let country = nested[city["country"]] ||= []
        country.push({ name: city["name"], place_id: city["place_id"] })
        return nested
      },
      {}
    )
  }

  renderCategory = (category: Category) => {
    const filteredCities = this.props.cities.cities.filter(city => category.cities.includes(city.place_id))
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
            {this.renderCountries(category._id, nestedArr)}
          </List>
        </Collapse>
      </Box>
    )
  }

  handleItemClick = (e: string | number): void => {
    this.setState({ [e]: !this.state[e] })
  }

  renderCountries = (category_id: ObjectId, countries: NestedCities) => {
    return Object.keys(countries).map(country => (
      <Box>
        <ListItem key={country} onClick={this.handleItemClick.bind(this, country)} button>
          <ListItemText primary={country} />
          {this.state[country] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={this.state[country]}>
          <List className={styles.cities}>
            {this.renderCities(category_id, countries[country])}
          </List>
        </Collapse>
      </Box>
    ))
  }
  
  renderCities = (category_id: ObjectId, cities: { name: string, place_id: string }[]) => {
    return cities.map(city => (
      <ListItem key={city["name"]} onClick={this.handleRemove.bind(this, {...city, category_id: category_id})}>{city["name"]}</ListItem>
    ))
  }

  handleRemove = async (e) => {
    const postData = {
      place_id: e.place_id,
      category_id: e.category_id
    }

    const resp = await axios.post('/api/cities/remove', postData)
  }

  render() {
    const renderedCategories = this.props.cities.categories.map(category => this.renderCategory(category))
    return (
      <Box className={styles.container}>
        <List className={styles.categories}>
          {renderedCategories}
        </List>
      </Box>
    )
  }
}

export default CityList