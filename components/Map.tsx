import { Box } from '@material-ui/core';
import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { CategoryRecord, fullCitiesObject } from './types';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

class Map extends Component<{ cities: fullCitiesObject }, {}> {
  constructor(props: { cities: fullCitiesObject } | Readonly<{ cities: fullCitiesObject }>) {
    super(props);
  }

  renderMarkers = (category: CategoryRecord): JSX.Element[] => {
    const filteredCities = this.props.cities.cities.filter(city =>
      category.cities.includes(city.place_id)
    );

    return filteredCities.map(({ name, coordinates }) => (
      <Marker key={name} coordinates={[coordinates[1], coordinates[0]]}>
        <circle fill={category.color} r={1} stroke="#fff" strokeWidth={0.5} />
      </Marker>
    ));
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
            center={[0, 40]}
            translateExtent={[
              [100, 0],
              [500, 350],
            ]}
            zoom={1.5}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    fill="#EAEAEC"
                    geography={geo}
                    stroke="#D6D6DA"
                    strokeWidth={0.3}
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
