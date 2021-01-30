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
import { Component } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Room } from '@material-ui/icons';
import { fullCitiesObject } from '../types';
import axios from 'axios';

interface AddCityProps {
  open: boolean;
  closeAddCity: () => void;
  cities: fullCitiesObject;
}

interface AddCityState {
  place_id: string;
  category_name: string;
  category_id: string;
}

class AddCity extends Component<AddCityProps, AddCityState> {
  constructor(props: AddCityProps) {
    super(props);
    this.state = {
      place_id: '',
      category_name: '',
      category_id: '',
    };
    this.handleCityAdded = this.handleCityAdded.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleDeselectCategory = this.handleDeselectCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = (): void => {
    this.setState({
      place_id: '',
      category_name: '',
      category_id: '',
    });
  };

  handleCityAdded = async (e: { value: { place_id: string } }): Promise<void> => {
    this.setState({
      place_id: e.value.place_id,
    });
  };

  handleSubmit = async (): Promise<void> => {
    const postData = {
      place_id: this.state.place_id,
      category_id: this.state.category_id,
    };

    await axios.post('/api/cities', postData);

    this.setState({
      place_id: '',
      category_name: '',
      category_id: '',
    });
    this.props.closeAddCity();
  };

  handleSelectCategory = (category_name: string, category_id: string): void => {
    this.setState({
      category_name: category_name,
      category_id: category_id,
    });
  };

  handleDeselectCategory = (): void => {
    this.setState({
      category_name: '',
      category_id: '',
    });
  };

  render(): JSX.Element {
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
        open={this.props.open}
        scroll={'body'}
        onClose={this.props.closeAddCity}
      >
        <DialogTitle id="add-city-title">
          {this.state.category_name === ''
            ? 'Add city'
            : `Add city to "${this.state.category_name}"`}
        </DialogTitle>
        {this.state.category_name === '' ? (
          <DialogContent style={{ overflowY: 'visible' }}>
            <DialogContentText>Select the city&apos;s category</DialogContentText>
            <List>
              {this.props.cities.categories.map(category => (
                <ListItem
                  key={category['name']}
                  button
                  onClick={() =>
                    this.handleSelectCategory(category['name'], category['_id'].toString())
                  }
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
              apiKey={process.env.GOOGLE_CLIENT_API}
              autocompletionRequest={{ types: ['(cities)'] }} // Limit results to cities
              selectProps={{
                placeholder: 'Search cities...',
                onChange: this.handleCityAdded,
                styles: autocompleteStyles,
              }}
              onLoadFailed={err => console.error('Could not inject Google script', err)}
            />
            <DialogActions>
              <Button color="secondary" onClick={this.handleDeselectCategory}>
                Back
              </Button>
              <Button
                autoFocus
                color="primary"
                disabled={this.state.place_id === ''}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
    );
  }
}

export default AddCity;
