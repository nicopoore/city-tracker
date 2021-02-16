import { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Room } from '@material-ui/icons';

import { CategoryRecord, CityRecord } from '../types';

interface AddCityProps {
  open: boolean;
  closeAddCity: () => void;
  cities: CityRecord[];
  categories: CategoryRecord[];
}

const AddCity: React.FC<AddCityProps> = (props): JSX.Element => {
  const [placeId, setPlaceId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleCitySelected = async (e: { value: { place_id: string } }): Promise<void> => {
    setPlaceId(e.value.place_id); // REMOVE ASYNC
  };

  const handleSubmit = async (option?: boolean): Promise<void> => {
    const postData = {
      place_id: placeId,
      category_name: categoryName,
      category_id: categoryId,
    };

    await axios.post('/api/cities', postData);

    if (!option) {
      setPlaceId('');
      setCategoryName('');
      setCategoryId('');
      props.closeAddCity();
    } else if (option) {
      const currentCat = categoryName;
      setPlaceId('');
      setCategoryName('');
      setCategoryName(currentCat);
    }
    mutate('/api/cities');
  };

  const handleSelectCategory = (newCategoryName: string, newCategoryId: string): void => {
    setCategoryName(newCategoryName);
    setCategoryId(newCategoryId);
  };

  const handleDeselectCategory = (): void => {
    setCategoryName('');
    setCategoryId('');
  };

  const handleClose = (): void => {
    props.closeAddCity();
    setTimeout(() => {
      setPlaceId('');
      setCategoryName('');
      setCategoryId('');
    }, 500);
  };

  const autocompleteStyles = {
    container: (provided: {}): {} => ({
      ...provided,
      margin: '2rem 0 1rem',
    }),
  };

  return (
    <Dialog
      fullWidth
      PaperProps={{ style: { overflowY: 'visible' } }}
      aria-labelledby="add-city-title"
      open={props.open}
      scroll={'body'}
      onClose={handleClose}
    >
      <DialogTitle id="add-city-title">
        {categoryName === '' ? 'Add city' : `Add city to "${categoryName}"`}
      </DialogTitle>
      {categoryName === '' ? (
        <DialogContent style={{ overflowY: 'visible' }}>
          <DialogContentText>Select the city&apos;s category</DialogContentText>
          <List>
            {props.categories.map(category => (
              <ListItem
                key={category['name']}
                button
                onClick={() => handleSelectCategory(category['name'], category['_id'].toString())}
              >
                <Room style={{ color: category['color'], marginRight: '1rem' }} />
                <ListItemText
                  primary={category['name']}
                  secondary={`${category['cities'].length} ${
                    category['cities'].length === 1 ? 'city' : 'cities'
                  }`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      ) : (
        <DialogContent style={{ overflowY: 'visible' }}>
          <DialogContentText>Search and select the city</DialogContentText>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_API}
            autocompletionRequest={{ types: ['(cities)'] }} // Limit results to cities
            selectProps={{
              placeholder: 'Search cities...',
              onChange: handleCitySelected,
              styles: autocompleteStyles,
              autoFocus: true,
            }}
            onLoadFailed={err => console.error(err)}
          />
          <DialogActions>
            <Button color="secondary" onClick={handleDeselectCategory}>
              Back
            </Button>
            <Button color="primary" disabled={placeId === ''} onClick={() => handleSubmit(true)}>
              Submit & add another
            </Button>
            <Button
              autoFocus
              color="primary"
              disabled={placeId === ''}
              onClick={() => handleSubmit(false)}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddCity;
