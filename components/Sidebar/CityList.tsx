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
import { withStyles } from '@material-ui/core/styles';

const styles = {
  categoryNested: {
    '& span': {
      fontWeight: '700',
    },
  },
  countryNested: {
    paddingLeft: 20,
  },
  cityNested: {
    paddingLeft: 20,
    '& span': {
      fontSize: '.9rem',
    },
  },
};

class CityList extends Component<
  { cities: fullCitiesObject; classes: any },
  { [name: string]: any }
> {
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

  renderCategory = (category: Category, classes): JSX.Element => {
    const filteredCities = this.props.cities.cities.filter(city =>
      category.cities.includes(city.place_id)
    );
    const nestedArr = this.nestDatabase(filteredCities);

    return (
      <>
        <ListItem key={category.name}>
          <ListItemIcon>
            <Room className={classes.categoryIcon} style={{ color: category.color }} />
          </ListItemIcon>
          <ListItemText primary={category.name} />
          <ListItemSecondaryAction onClick={this.handleExpandCollapse.bind(this, category.name)}>
            <IconButton aria-label="expand/collapse" edge="end">
              {this.state[category.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse component="li" in={this.state[category.name]}>
          <List className={classes.countryNested}>
            {this.renderCountries(category._id, nestedArr, classes)}
          </List>
        </Collapse>
      </>
    );
  };

  renderCountries = (category_id: ObjectId, countries: NestedCities, classes): JSX.Element[] => {
    return Object.keys(countries).map(country => (
      <>
        <ListItem key={country}>
          <ListItemText primary={country} />
          <ListItemSecondaryAction onClick={this.handleExpandCollapse.bind(this, country)}>
            <IconButton aria-label="expand/collapse" edge="end">
              {this.state[country] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse component="li" in={this.state[country]}>
          <List className={classes.cityNested}>
            {this.renderCities(category_id, countries[country])}
          </List>
        </Collapse>
      </>
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
          onClick={this.handleRemoveCity.bind(this, { ...city, category_id: category_id })}
        >
          <IconButton aria-label="delete" edge="end">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  handleExpandCollapse = (e: string | number): void => {
    this.setState({ [e]: !this.state[e] });
  };

  handleRemoveCity = async (e: { place_id: string; category_id: string }): Promise<void> => {
    const postData = {
      place_id: e.place_id,
      category_id: e.category_id,
    };

    await axios.post('/api/cities/remove', postData);
  };

  render(): JSX.Element {
    const { classes } = this.props;
    const renderedCategories = this.props.cities.categories.map(category =>
      this.renderCategory(category, classes)
    );
    return (
      <Box width="90%">
        <List className={classes.categoryNested}>{renderedCategories}</List>
      </Box>
    );
  }
}

export default withStyles(styles)(CityList);
