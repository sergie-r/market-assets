import assetsActions from '../actions/assetsActions';
const initial = {
  assets: {},
  favorites: {},
  collectionFilter: 'All'
};

const assetsReducer = (state = initial, action) => {
  switch (action.type) {
    case assetsActions.GET_ASSETS:
      const assetsObj = Object.assign({}, state.assets);
      return Object.assign({}, state, {
        assets: Object.assign(assetsObj, action.assets),
      });

    case assetsActions.ADD_TO_FAVORITES:
      const favoritesObj = Object.assign({}, state.favorites);
      const assetsCopy = Object.assign({}, state.assets);
      delete assetsCopy[Object.keys(action.favorites)];

      return Object.assign({}, state, {
        favorites: Object.assign(favoritesObj, action.favorites),
        assets: assetsCopy,
      });

    case assetsActions.REMOVE_FROM_FAVORITES:
      const assetsAnotherCopy = Object.assign({}, state.assets);
      const favoritesCopy = Object.assign({}, state.favorites);
      delete favoritesCopy[Object.keys(action.favorites)];

      return Object.assign({}, state, {
        assets: Object.assign(assetsAnotherCopy, action.favorites),
        favorites: favoritesCopy,
      });

    case assetsActions.APPLY_FILTER:
      return Object.assign({}, state, {
        collectionFilter: action.filterType,
      });

    default:
      return state;
  }
};

export default assetsReducer;