
const assetsActions = {
  GET_ASSETS: 'GET_ASSETS',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',

  getAssets: assets => ({
    type: assetsActions.GET_ASSETS,
    assets,
  }),

  addToFavorites: favorites => ({
    type: assetsActions.ADD_TO_FAVORITES,
    favorites,
  }),
};

export default assetsActions;