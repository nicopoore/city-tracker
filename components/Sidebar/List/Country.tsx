import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { City } from '../..';
import { NestedCities } from '../../types';

interface CountryProps {
  category_id: string;
  country: string;
  isOwnMap: boolean;
  nestedCities: NestedCities;
}

const Country: React.FC<CountryProps> = (props): JSX.Element => {
  const [state, setState] = useState({});

  const handleExpandCollapse = (e: string | number): void => {
    setState({ ...state, [e]: !state[e] });
  };

  const sortedCities = props.nestedCities[props.country].sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <>
      <ListItem key={props.country}>
        <ListItemText primary={props.country} />
        <ListItemSecondaryAction onClick={() => handleExpandCollapse(props.country)}>
          <IconButton aria-label="expand/collapse" edge="end">
            {state[props.country] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Collapse key={`${props.country} li`} component="li" in={state[props.country]}>
        <List style={{ paddingLeft: 20 }}>
          {sortedCities.map(city => (
            <City
              key={city.name}
              category_id={props.category_id}
              city={city}
              isOwnMap={props.isOwnMap}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default Country;
