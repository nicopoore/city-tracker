import React, { Component } from 'react'
import styles from '../styles/List.module.css'

const defaultState = {
  cities: [
    {
      uniqueID: 0, // ExampleID, would be provided by database
      name: "Buenos Aires",
      country: "Argentina",
      continent: "America",
      coordinates: [-34.6037, -58.3816]
    },
    {
      uniqueID: 1, // ExampleID, would be provided by database
      name: "Sao Paulo",
      country: "Brazil",
      continent: "America",
      coordinates: [-34.6037, -58.3816]
    },
    {
      uniqueID: 2, // ExampleID, would be provided by database
      name: "New York",
      country: "United States of America",
      continent: "America",
      coordinates: [34.6037, -58.3816]
    },
    {
      uniqueID: 3, // ExampleID, would be provided by database
      name: "Córdoba",
      country: "Argentina",
      continent: "America",
      coordinates: [34.6037, -58.3816]
    },
    {
      uniqueID: 4, // ExampleID, would be provided by database
      name: "Paris",
      country: "France",
      continent: "Europe",
      coordinates: [34.6037, -58.3816]
    }
  ],
  categories: {
    "Visited": {
      color: "#ff0000", cities: [0, 3, 2]
    },
    "To visit": {
      color: "#0000ff", cities: [1]
    },
    "Favourites": {
      color: "#ffff00", cities: [4]
    }
  }
}

export default class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState
  }

  nestDatabase = (flat) => {
    return flat.reduce((nested, city) => {
        let continent = nested[city["continent"]] ||= {}
        let country = continent[city["country"]] ||= []
        country.push(city["name"])
        return nested
      },
      []
    )
  }

  renderCategory = (categoryName, cityList) => {
    const filteredCities = this.state.cities.filter(city => this.state.categories[categoryName].cities.includes(city.uniqueID))
    const nestedArr = this.nestDatabase(filteredCities)

    return (
      <li key={categoryName}>
        <div className={styles.colorBullet} style={{backgroundColor: this.state.categories[categoryName].color}} />
        {categoryName}
        <ul className={styles.continents}>
          {this.renderContinents(nestedArr)}
        </ul>
      </li>
    )
  }

  renderContinents = (continents) => {
    return Object.keys(continents).map(continent => (
      <li>
        <p>{continent}</p>
        <ul className={styles.countries}>
          {this.renderCountries(continents[continent])}
        </ul>
      </li>
    ))
  }

  renderCountries = (countries) => {
    return Object.keys(countries).map(country => (
      <li>
        <p>{country}</p>
        <ul className={styles.cities}>
          {this.renderCities(countries[country])}
        </ul>
      </li>
    ))
  }
  
  renderCities = (cities) => {
    return cities.map(city => (
      <li>{city}</li>
    ))
  }

  render() {
    const renderedCategories = Object.keys(this.state.categories).map(categoryName => this.renderCategory(categoryName))
    return (
      <div className={styles.container}>
        <ul className={styles.categories}>
          {renderedCategories}
        </ul>
      </div>
    )
  }
}
