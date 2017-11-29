import { createSelector } from 'reselect';

const getAssets = state => state.assets;
const getFilterType = state => state.collectionFilter;

export const filterAssets = createSelector(
  [getFilterType, getAssets],
  (collectionFilter, assets) => {
    const filteredCollection = {};

    if (collectionFilter === 'All') {
      return assets;
    }

    Object.keys(assets).map(item => {
      if (assets[item].type === collectionFilter) {
        filteredCollection[assets[item].id] = assets[item]
      }
    });

    return filteredCollection;
  },
);
