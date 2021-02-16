import React from 'react';

import { Box, List } from '@material-ui/core';

import { Category } from '../../';
import { CategoryRecord, CityRecord } from '../../types';

interface CityListProps {
  cities: CityRecord[];
  categories: CategoryRecord[];
  isOwnMap?: boolean;
}

const CityList: React.FC<CityListProps> = (props): JSX.Element => {
  return (
    <Box mb={props.isOwnMap ? 8 : 0} px={2} width="100%">
      <List>
        {props.categories.map(category => (
          <Category
            key={category.name}
            category={category}
            cities={props.cities}
            isOwnMap={props.isOwnMap}
          />
        ))}
      </List>
    </Box>
  );
};

export default CityList;
