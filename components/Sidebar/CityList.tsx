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
  Typography,
  Tooltip,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, Room, Delete } from '@material-ui/icons';
import { City, NestedCities } from '../types';
import { Category, fullCitiesObject } from '../types';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { withStyles } from '@material-ui/core/styles';
import { mutate } from 'swr';

const styles = {
  categoryNested: {},
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
  { cities: fullCitiesObject; classes: any; isOwnMap?: boolean },
  { [name: string]: any }
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nestDatabase = (flat: City[]): NestedCities => {
    /* Takes flat array from database and returns a nested (country -> city) and sorted array of objects */

    // Nests array
    const nested = flat.reduce(
      (nested: { [name: string]: { name: string; place_id: string }[] }, city: City) => {
        !nested[city['country']] && (nested[city['country']] = []); // Creates country array if it doesn't already exist

        nested[city['country']].push({ name: city['name'], place_id: city['place_id'] }); // Pushes city to country array
        return nested;
      },
      {}
    );

    // Sorts and returns array
    return Object.keys(nested)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = nested[key];
        return sorted;
      }, {});
  };

  renderCategory = (category: Category, classes): JSX.Element => {
    const filteredCities = this.props.cities.cities.filter(city =>
      category.cities.includes(city.place_id)
    );
    const nestedArr = this.nestDatabase(filteredCities);

    const count = `${category['cities'].length} ${
      category['cities'].length === 1 ? 'city' : 'cities'
    }, ${Object.keys(nestedArr).length} ${
      Object.keys(nestedArr).length === 1 ? 'country' : 'countries'
    }`;

    return (
      <>
        <ListItem key={category.name}>
          <ListItemIcon>
            <Room className={classes.categoryIcon} style={{ color: category.color }} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography style={{ fontWeight: 600 }}>{category.name}</Typography>}
            secondary={count}
          />
          <ListItemSecondaryAction onClick={this.handleExpandCollapse.bind(this, category.name)}>
            <IconButton aria-label="expand/collapse" edge="end">
              {this.state[category.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse key={`${category.name} li`} component="li" in={this.state[category.name]}>
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

        <Collapse key={`${country} li`} component="li" in={this.state[country]}>
          <List className={classes.cityNested}>
            {this.renderCities(
              category_id,
              countries[country].sort((a, b) => (a.name > b.name ? 1 : -1))
            )}
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
        {this.props.isOwnMap && (
          <ListItemSecondaryAction
            onClick={this.handleRemoveCity.bind(this, { ...city, category_id: category_id })}
          >
            <Tooltip aria-label="Delete city" title="Delete city">
              <IconButton aria-label="delete" edge="end">
                <Delete />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        )}
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
    mutate('/api/cities');
  };

  render(): JSX.Element {
    const { classes } = this.props;
    const renderedCategories = this.props.cities.categories.map(category =>
      this.renderCategory(category, classes)
    );
    return (
      <Box mb={8} px={2} width="100%">
        <List className={classes.categoryNested}>{renderedCategories}</List>
      </Box>
    );
  }
}

export default withStyles(styles)(CityList);
