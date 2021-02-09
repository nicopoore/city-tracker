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
import { mutate } from 'swr';

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
    this.handleCitySelected = this.handleCitySelected.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleDeselectCategory = this.handleDeselectCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount = (): void => {
    this.setState({
      place_id: '',
      category_name: '',
      category_id: '',
    });
  };

  handleCitySelected = async (e: { value: { place_id: string } }): Promise<void> => {
    this.setState({
      place_id: e.value.place_id,
    });
  };

  handleSubmit = async (option?: boolean): Promise<void> => {
    const postData = {
      place_id: this.state.place_id,
      category_name: this.state.category_name,
      category_id: this.state.category_id,
    };

    await axios.post('/api/cities', postData);

    if (!option) {
      this.setState({
        place_id: '',
        category_name: '',
        category_id: '',
      });
      this.props.closeAddCity();
    } else if (option) {
      const currentCat = this.state.category_name;
      this.setState({
        place_id: '',
        category_name: '',
      });
      this.setState({
        category_name: currentCat,
      });
    }
    mutate('/api/cities');
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

  handleClose = (): void => {
    this.props.closeAddCity();
    setTimeout(() => {
      this.setState({
        place_id: '',
        category_name: '',
        category_id: '',
      });
    }, 500);
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
        onClose={this.handleClose}
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
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_API}
              autocompletionRequest={{ types: ['(cities)'] }} // Limit results to cities
              selectProps={{
                placeholder: 'Search cities...',
                onChange: this.handleCitySelected,
                styles: autocompleteStyles,
                autoFocus: true,
              }}
              onLoadFailed={err => console.error(err)}
            />
            <DialogActions>
              <Button color="secondary" onClick={this.handleDeselectCategory}>
                Back
              </Button>
              <Button
                color="primary"
                disabled={this.state.place_id === ''}
                onClick={() => this.handleSubmit(true)}
              >
                Submit & add another
              </Button>
              <Button
                autoFocus
                color="primary"
                disabled={this.state.place_id === ''}
                onClick={() => this.handleSubmit(false)}
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
