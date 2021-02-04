import { Box, Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { CategoryRecord, fullCitiesObject, mapState } from './types';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

class Map extends Component<{ cities: fullCitiesObject }, mapState> {
  constructor(props: { cities: fullCitiesObject } | Readonly<{ cities: fullCitiesObject }>) {
    super(props);
    this.state = {
      coordinates: [0, 40],
      zoom: 1.5,
    };
  }

  renderMarkers = (category: CategoryRecord): JSX.Element[] => {
    const filteredCities = this.props.cities.cities.filter(city =>
      category.cities.includes(city.place_id)
    );

    let size = (1.5 + this.state.zoom / 10) / this.state.zoom;

    return filteredCities.map(({ name, country, coordinates }) => (
      <Marker key={name} coordinates={[coordinates[1], coordinates[0]]}>
        <Tooltip arrow aria-label={name} title={`${name}, ${country}`}>
          <circle fill={category.color} r={size} stroke="#fff" strokeWidth={size / 2} />
        </Tooltip>
      </Marker>
    ));
  };

  handleMoveEnd = (position: mapState): void => {
    this.setState({ coordinates: position.coordinates, zoom: position.zoom });
  };

  render(): JSX.Element {
    return (
      <Box
        bgcolor="#A2C6D1"
        borderRadius=".5rem"
        flex="5 1"
        height="96%"
        m={1}
        mr="1rem"
        overflow="hidden"
      >
        <ComposableMap
          height={349}
          projection="geoMercator"
          projectionConfig={{ scale: 60 }}
          width={600}
        >
          <ZoomableGroup
            center={this.state.coordinates}
            maxZoom={16}
            translateExtent={[
              [100, 0],
              [500, 350],
            ]}
            zoom={this.state.zoom}
            onMoveEnd={this.handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    fill="#EAEAEC"
                    geography={geo}
                    stroke="#D6D6DA"
                    strokeWidth={0.1}
                  />
                ))
              }
            </Geographies>
            {this.props.cities.categories.map(category => this.renderMarkers(category))}
          </ZoomableGroup>
        </ComposableMap>
      </Box>
    );
  }
}

export default Map;
