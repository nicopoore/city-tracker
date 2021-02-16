import React from 'react';

import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@material-ui/core';

import { Delete } from '@material-ui/icons';
import axios from 'axios';
import { mutate } from 'swr';

interface CityProps {
  city: { name: string; place_id: string };
  category_id: string;
  isOwnMap: boolean;
}

const City: React.FC<CityProps> = (props): JSX.Element => {
  const handleRemoveCity = async (e: { place_id: string; category_id: string }): Promise<void> => {
    const postData = {
      place_id: e.place_id,
      category_id: e.category_id,
    };

    await axios.post('/api/cities/remove', postData);
    mutate('/api/cities');
  };

  return (
    <ListItem>
      <ListItemText
        primary={props.city.name}
        primaryTypographyProps={{ style: { fontSize: '.9em' } }}
      />
      {props.isOwnMap && (
        <ListItemSecondaryAction
          onClick={() => handleRemoveCity({ ...props.city, category_id: props.category_id })}
        >
          <Tooltip aria-label="Delete city" title="Delete city">
            <IconButton aria-label="delete" edge="end">
              <Delete />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default City;
