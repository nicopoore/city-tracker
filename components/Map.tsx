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
      coordinates: window.innerWidth >= 1000 ? [0, 40] : [0, 0],
      zoom: window.innerWidth >= 1000 ? 1.5 : 1.9,
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
    const fullscreenValues = {
      height: 349,
      scale: 60,
      width: 600,
      minZoom: 1,
      maxZoom: 16,
      translateExtent: [
        [100, 0],
        [500, 350],
      ],
      boxMargin: 2,
      boxBorderRadius: '.5rem',
      boxHeight: '96%',
    };
    const xsValues = {
      height: 750,
      scale: 60,
      width: 300,
      minZoom: 1.6,
      maxZoom: 16,
      translateExtent: [
        [-39, 180],
        [340, -195.8 * (window.innerHeight / window.innerWidth) + 982.93], // Fix map bounds for different screen resolutions
      ],
      boxMargin: false,
      boxBorderRadius: '0',
      boxHeight: '100%',
    };
    const mapValues = window.innerWidth >= 992 ? fullscreenValues : xsValues;
    return (
      <Box
        bgcolor="#A2C6D1"
        borderRadius={mapValues.boxBorderRadius}
        flex="5 1"
        height={mapValues.boxHeight}
        mx={mapValues.boxMargin}
        overflow="hidden"
      >
        <ComposableMap
          height={mapValues.height}
          projection="geoMercator"
          projectionConfig={{ scale: mapValues.scale }}
          width={mapValues.width}
        >
          <ZoomableGroup
            center={this.state.coordinates}
            maxZoom={mapValues.maxZoom}
            minZoom={mapValues.minZoom}
            translateExtent={mapValues.translateExtent}
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
