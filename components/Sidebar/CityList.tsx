import React, { useState } from 'react';
import { ObjectId } from 'mongodb';
import { mutate } from 'swr';
import axios from 'axios';

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
import { withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore, Room, Delete } from '@material-ui/icons';

import { City, NestedCities, Category, fullCitiesObject } from '../types';

const styles = {
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

interface CityListProps {
  cities: fullCitiesObject;
  classes: any;
  isOwnMap?: boolean;
}

const CityList: React.FC<CityListProps> = (props): JSX.Element => {
  const [state, setState] = useState({});

  const { classes } = props;

  const nestDatabase = (flat: City[]): NestedCities => {
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

  const renderCategory = (category: Category, classes): JSX.Element => {
    const filteredCities = props.cities.cities.filter(city =>
      category.cities.includes(city.place_id)
    );
    const nestedArr = nestDatabase(filteredCities);

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
          <ListItemSecondaryAction onClick={() => handleExpandCollapse(category.name)}>
            <IconButton aria-label="expand/collapse" edge="end">
              {state[category.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse key={`${category.name} li`} component="li" in={state[category.name]}>
          <List className={classes.countryNested}>
            {renderCountries(category._id, nestedArr, classes)}
          </List>
        </Collapse>
      </>
    );
  };

  const renderCountries = (
    category_id: ObjectId,
    countries: NestedCities,
    classes
  ): JSX.Element[] => {
    return Object.keys(countries).map(country => (
      <>
        <ListItem key={country}>
          <ListItemText primary={country} />
          <ListItemSecondaryAction onClick={() => handleExpandCollapse(country)}>
            <IconButton aria-label="expand/collapse" edge="end">
              {state[country] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse key={`${country} li`} component="li" in={state[country]}>
          <List className={classes.cityNested}>
            {renderCities(
              category_id,
              countries[country].sort((a, b) => (a.name > b.name ? 1 : -1))
            )}
          </List>
        </Collapse>
      </>
    ));
  };

  const renderCities = (
    category_id: ObjectId,
    cities: { name: string; place_id: string }[]
  ): JSX.Element[] => {
    return cities.map(city => (
      <ListItem key={city['name']}>
        <ListItemText primary={city['name']} />
        {props.isOwnMap && (
          <ListItemSecondaryAction
            onClick={() => handleRemoveCity({ ...city, category_id: category_id })}
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

  const handleExpandCollapse = (e: string | number): void => {
    setState({ ...state, [e]: !state[e] });
  };

  const handleRemoveCity = async (e: { place_id: string; category_id: string }): Promise<void> => {
    const postData = {
      place_id: e.place_id,
      category_id: e.category_id,
    };

    await axios.post('/api/cities/remove', postData);
    mutate('/api/cities');
  };

  const renderedCategories = props.cities.categories.map(category =>
    renderCategory(category, classes)
  );

  return (
    <Box mb={props.isOwnMap ? 8 : 0} px={2} width="100%">
      <List className={classes.categoryNested}>{renderedCategories}</List>
    </Box>
  );
};

export default withStyles(styles)(CityList);
