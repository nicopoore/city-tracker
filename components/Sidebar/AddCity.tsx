import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core'
import { Component } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Room } from '@material-ui/icons'
import { Category } from '../types'

interface AddCityProps {
  open: boolean,
  closeAddCity: () => void,
  categories: Category[]
}

interface AddCityState {
  place_id: string,
  category: string 
}

class AddCity extends Component<AddCityProps, AddCityState> {
  constructor(props: AddCityProps) {
    super(props)
    this.state = {
      place_id: '',
      category: ''
    }
    this.handleCityAdded = this.handleCityAdded.bind(this)
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
    this.handleDeselectCategory = this.handleDeselectCategory.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount = (): void => {
    this.setState({
      place_id: '',
      category: ''
    })
  }

  handleCityAdded = async (e: { value: { place_id: string } }): Promise<void> => {    
    this.setState({
      place_id: e.value.place_id
    })
  }

  handleSubmit = async (): Promise<void> => {
    // Not currently working - works with GET request to /api/cities/[place_id]
    const postData = {
      place_id: this.state.place_id,
      category: this.state.category
    }
    try {
      const resp = await fetch('/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(postData),

      })
      console.log(resp)
    } catch (err) {
      console.error(err)
    }
    this.setState({
      place_id: '',
      category: ''
    })
    this.props.closeAddCity()
  }

  handleSelectCategory = (category: string): void => {
    this.setState({
      category: category
    })
  }

  handleDeselectCategory = (): void => {
    this.setState({
      category: ''
    })
  }

  render() {
    const autocompleteStyles = {
      container: (provided: {}): {} => ({
        ...provided,
        margin: "2rem 0 1rem",
      })
    } 
    return (
      <Dialog 
        open={this.props.open} 
        onClose={this.props.closeAddCity} 
        aria-labelledby="add-city-title" 
        fullWidth 
        scroll={"body"} 
        PaperProps={{ style: { overflowY: "visible" }}}
      >
        <DialogTitle id="add-city-title">{this.state.category === '' ? 'Add city' : `Add city to "${this.state.category}"`}</DialogTitle>
        {this.state.category === '' ? (
          <DialogContent style={{ overflowY: "visible" }}>
            <DialogContentText>Select the city's category</DialogContentText>
            <List>
              {this.props.categories.map(category => (
                <ListItem button onClick={() => this.handleSelectCategory(category["name"])}>
                  <Room style={{color: category["color"], marginRight: "1rem"}} />
                  <ListItemText 
                    primary={category["name"]} 
                    secondary={`${category["cities"].length} ${category["cities"].length === 1 ? 'city' : 'cities'}`} 
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          ) : (
          <DialogContent style={{ overflowY: "visible" }}>
            <DialogContentText>Search and select the city</DialogContentText>
            <GooglePlacesAutocomplete 
              apiKey={process.env.GOOGLE_CLIENT_API}
              selectProps={{
                placeholder: "Search cities...",
                onChange: this.handleCityAdded,
                styles: autocompleteStyles
              }}
              autocompletionRequest={{ types: ["(cities)"] }} // Limit results to cities
              onLoadFailed={(err) => (console.error("Could not inject Google script", err))}
            />
            <DialogActions>
              <Button onClick={this.handleDeselectCategory} color="secondary">Back</Button>
              <Button onClick={this.handleSubmit} color="primary" autoFocus disabled={this.state.place_id === ''}>Submit</Button>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
    )
  }
}

export default AddCity