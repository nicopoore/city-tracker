import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

import { Box, Tooltip } from '@material-ui/core';

import { CategoryRecord, fullCitiesObject, mapState, mapValuesObject } from '../types';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const Map: React.FC<{ cities: fullCitiesObject }> = (props): JSX.Element => {
  const [state, setState] = useState({
    coordinates: window.innerWidth > 768 ? [0, 40] : [0, 0],
    zoom: window.innerWidth > 768 ? 1.5 : 1.9,
  });

  const aspectRatio = window.innerHeight / window.innerWidth;
  const widescreenValues = {
    height: 349,
    width: 600,
    minZoom: 1,
    translateExtent: [
      [100, 0],
      [500, 350],
    ],
    boxMargin: 2,
    boxBorderRadius: '.5rem',
    boxHeight: '96%',
  };
  const mdValues = {
    height: 600,
    width: 600,
    minZoom: 1.4,
    translateExtent: [
      [100, 100],
      [500, 450],
    ],
    boxMargin: 2,
    boxBorderRadius: '.5rem',
    boxHeight: '96%',
  };
  const xsValues = {
    height: 750,
    width: 300,
    minZoom: 1.6,
    translateExtent: [
      [-39, 180],
      [340, -195.8 * aspectRatio + 982.93], // Fix map bounds for different screen resolutions
    ],
    boxMargin: false,
    boxBorderRadius: '0',
    boxHeight: '100%',
  };
  let mapValues: mapValuesObject;
  if (aspectRatio <= 0.65 && window.innerWidth > 768) {
    mapValues = widescreenValues;
  } else if (aspectRatio > 0.65 && window.innerWidth > 768) {
    mapValues = mdValues;
  } else {
    mapValues = xsValues;
  }

  const renderMarkers = (category: CategoryRecord): JSX.Element[] => {
    const filteredCities = props.cities.cities.filter(city =>
      category.cities.includes(city.place_id)
    );

    let size = (1.5 + state.zoom / 10) / state.zoom;

    return filteredCities.map(({ name, country, coordinates }) => (
      <Marker key={name} coordinates={[coordinates[1], coordinates[0]]}>
        <Tooltip arrow aria-label={name} title={`${name}, ${country}`}>
          <circle fill={category.color} r={size} stroke="#fff" strokeWidth={size / 2} />
        </Tooltip>
      </Marker>
    ));
  };

  const handleMoveEnd = (position: mapState): void => {
    setState({ coordinates: position.coordinates, zoom: position.zoom });
  };

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
        projectionConfig={{ scale: 60 }}
        width={mapValues.width}
      >
        <ZoomableGroup
          center={state.coordinates}
          maxZoom={16}
          minZoom={mapValues.minZoom}
          translateExtent={mapValues.translateExtent}
          zoom={state.zoom}
          onMoveEnd={handleMoveEnd}
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
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {props.cities.categories.map(category => renderMarkers(category))}
        </ZoomableGroup>
      </ComposableMap>
    </Box>
  );
};

export default Map;
