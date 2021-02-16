import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, Room } from '@material-ui/icons';
import React, { useState } from 'react';
import { Country } from '../..';
import { CategoryType, CityRecord, CityType, NestedCities } from '../../types';

interface CategoryProps {
  category: CategoryType;
  classes: any;
  cities: CityRecord[];
  isOwnMap: boolean;
}

const Category: React.FC<CategoryProps> = (props): JSX.Element => {
  const [state, setState] = useState({});

  const filterData = (cities: CityRecord[]): CityRecord[] =>
    cities.filter(city => props.category.cities.includes(city.place_id));

  const nestData = (flat: CityType[]): NestedCities => {
    /* Takes flat array from database and returns a nested (country -> city) and sorted array of objects */

    return flat.reduce(
      (nested: { [name: string]: { name: string; place_id: string }[] }, city: CityType) => {
        !nested[city['country']] && (nested[city['country']] = []); // Creates country array if it doesn't already exist

        nested[city['country']].push({ name: city['name'], place_id: city['place_id'] }); // Pushes city to country array
        return nested;
      },
      {}
    );
  };

  const sortData = (nestedData: NestedCities): NestedCities => {
    return Object.keys(nestedData)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = nestedData[key];
        return sorted;
      }, {});
  };

  const filteredCities = filterData(props.cities);
  const filteredCountries = nestData(filteredCities);
  const sortedCountries = sortData(filteredCountries);

  const count = `${props.category.cities.length} ${
    props.category.cities.length === 1 ? 'city' : 'cities'
  }, ${Object.keys(sortedCountries).length} ${
    Object.keys(sortedCountries).length === 1 ? 'country' : 'countries'
  }`;

  const handleExpandCollapse = (e: string | number): void => {
    setState({ ...state, [e]: !state[e] });
  };

  return (
    <>
      <ListItem key={props.category.name}>
        <ListItemIcon>
          <Room className={props.classes.categoryIcon} style={{ color: props.category.color }} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography style={{ fontWeight: 600 }}>{props.category.name}</Typography>}
          secondary={count}
        />
        <ListItemSecondaryAction onClick={() => handleExpandCollapse(props.category.name)}>
          <IconButton aria-label="expand/collapse" edge="end">
            {state[props.category.name] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Collapse key={`${props.category.name} li`} component="li" in={state[props.category.name]}>
        <List style={{ paddingLeft: 20 }}>
          {Object.keys(sortedCountries).map(country => (
            <>
              <Country
                key={country}
                category_id={props.category._id}
                country={country}
                isOwnMap={props.isOwnMap}
                nestedCities={sortedCountries}
              />
            </>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default Category;
