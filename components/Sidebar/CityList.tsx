import React, { Component } from 'react';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, Room, Delete } from '@material-ui/icons';
import { City, NestedCities } from '../types';
import { Category, fullCitiesObject } from '../types';
import axios from 'axios';
import { ObjectId } from 'mongodb';

class CityList extends Component<{ cities: fullCitiesObject }, { [name: string]: any }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nestDatabase = (flat: City[]): NestedCities => {
    return flat.reduce(
      (nested: { [name: string]: { name: string; place_id: string }[] }, city: City) => {
        !nested[city['country']] && (nested[city['country']] = []); // Creates country array if it doesn't already exist

        nested[city['country']].push({ name: city['name'], place_id: city['place_id'] }); // Pushes city to country array
        return nested;
      },
      {}
    );
  };

  renderCategory = (category: Category): JSX.Element => {
    const filteredCities = this.props.cities.cities.filter(city =>
      category.cities.includes(city.place_id)
    );
    const nestedArr = this.nestDatabase(filteredCities);

    return (
      <Box>
        <ListItem key={category.name}>
          <ListItemIcon>
            <Room style={{ color: category.color }} />
          </ListItemIcon>
          <ListItemText primary={category.name} />
          <ListItemSecondaryAction onClick={this.handleItemClick.bind(this, category.name)}>
            <IconButton aria-label="expand/collapse" edge="end">
              {this.state[category.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse component="li" in={this.state[category.name]}>
          <List>{this.renderCountries(category._id, nestedArr)}</List>
        </Collapse>
      </Box>
    );
  };

  handleItemClick = (e: string | number): void => {
    this.setState({ [e]: !this.state[e] });
  };

  renderCountries = (category_id: ObjectId, countries: NestedCities): JSX.Element[] => {
    return Object.keys(countries).map(country => (
      <Box key={country}>
        <ListItem>
          <ListItemText primary={country} />
          <ListItemSecondaryAction onClick={this.handleItemClick.bind(this, country)}>
            <IconButton aria-label="expand/collapse" edge="end">
              {this.state[country] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse component="li" in={this.state[country]}>
          <List>{this.renderCities(category_id, countries[country])}</List>
        </Collapse>
      </Box>
    ));
  };

  renderCities = (
    category_id: ObjectId,
    cities: { name: string; place_id: string }[]
  ): JSX.Element[] => {
    return cities.map(city => (
      <ListItem key={city['name']}>
        <ListItemText primary={city['name']} />
        <ListItemSecondaryAction
          onClick={this.handleRemove.bind(this, { ...city, category_id: category_id })}
        >
          <IconButton aria-label="delete" edge="end">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  handleRemove = async (e: { place_id: string; category_id: string }): Promise<void> => {
    const postData = {
      place_id: e.place_id,
      category_id: e.category_id,
    };

    await axios.post('/api/cities/remove', postData);
  };

  render(): JSX.Element {
    const renderedCategories = this.props.cities.categories.map(category =>
      this.renderCategory(category)
    );
    return (
      <Box>
        <List>{renderedCategories}</List>
      </Box>
    );
  }
}

export default CityList;
