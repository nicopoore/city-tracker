import React from 'react';

import { Box, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Category } from '../../';
import { CategoryRecord, CityRecord } from '../../types';

const styles = {
  countryNested: {
    paddingLeft: 20,
  },
  cityNested: {
    paddingLeft: 20,
    '& span': {
      fontSize: '.9rem',
    },
  },
};

interface CityListProps {
  cities: CityRecord[];
  categories: CategoryRecord[];
  classes: any;
  isOwnMap?: boolean;
}

const CityList: React.FC<CityListProps> = (props): JSX.Element => {
  const { classes } = props;

  return (
    <Box mb={props.isOwnMap ? 8 : 0} px={2} width="100%">
      <List className={classes.categoryNested}>
        {props.categories.map(category => (
          <Category
            key={category.name}
            category={category}
            cities={props.cities}
            classes={classes}
            isOwnMap={props.isOwnMap}
          />
        ))}
      </List>
    </Box>
  );
};

export default withStyles(styles)(CityList);
