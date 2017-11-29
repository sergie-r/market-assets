
const assetsActions = {
  GET_ASSETS: 'GET_ASSETS',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  APPLY_FILTER: 'APPLY_FILTER',

  getAssets: assets => ({
    type: assetsActions.GET_ASSETS,
    assets,
  }),

  addToFavorites: favorites => ({
    type: assetsActions.ADD_TO_FAVORITES,
    favorites,
  }),

  removeFromFavorites: favorites => ({
    type: assetsActions.REMOVE_FROM_FAVORITES,
    favorites,
  }),

  applyFilter: filterType => ({
    type: assetsActions.APPLY_FILTER,
    filterType,
  }),
};

export default assetsActions;