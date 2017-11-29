import assetsActions from '../actions/assetsActions';

const initial = {
  assets: {},
  favorites: {},
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
      return Object.assign({}, state, {
        favorites: Object.assign(favoritesObj, action.favorites),
      });
    default:
      return state;
  }
};

export default assetsReducer;