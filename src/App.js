import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Column, Table } from 'react-virtualized';
import Immutable from 'immutable';
import SortDirection from '../src/components/SortDirection';
import { mock } from '../mock';
import assetsActions from '../src/actions/assetsActions';
import FavoritesTable from '../src/components/FavoritesTable';
import Filter from '../src/components/Filter';
import { filterAssets } from '../src/selectors/assetsSelector';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this._sort = this._sort.bind(this);
  }
  state = {
    sortBy: '',
    sortDirection: SortDirection.ASC,
  };

  componentDidMount() {
    mock.subscribe((val) => {
      ReactDOM.unstable_deferredUpdates(() => {
        this.props.fetchAssets(val)
      });
    });
  }

  _sort({sortBy, sortDirection}) {
    const sortedList = this._sortList({sortBy, sortDirection});

    this.setState({sortBy, sortDirection, sortedList});
  }

  _getAssets() {
    const { assets } = this.props;
    const listArr = [];

    Object.keys(assets).map(item => (
      listArr.push(assets[item])
    ));
    return listArr;
  }

  _sortList({sortBy, sortDirection}) {
    const arr = this._getAssets();
    const list = Immutable.List(arr);

    return list
      .sortBy(item => item[sortBy])
      .update(
        list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
      );
  }

  _getDatum(list, index) {
    return list.get(index % list.size);
  }

  _onRowClick(e) {
    this.props.addToFavorites(e.rowData);
  }

  _removeFromFavorites(e) {
    this.props.removeFromFavorites(e.rowData);
  }


  render() {
    const { sortBy, sortDirection } = this.state;
    const sortedList = this._sortList({sortBy, sortDirection});
    const rowGetter = ({index}) => this._getDatum(sortedList, index);
    const list = this._getAssets();

    return (
      <div>
        <FavoritesTable
          favoritesData={this.props.favoritesData}
          addToFavorites={this.props.addToFavorites}
          removeFromFavorites={e => this._removeFromFavorites(e)}
        />
        <Filter
          onChange={this.props.applyFilter}
          type={this.props.filter}
        />
        <h2>Assets Table</h2>
        <Table
          width={600}
          height={600}
          headerHeight={20}
          rowHeight={50}
          rowCount={list.length}
          rowGetter={rowGetter}
          sort={this._sort}
          sortBy={sortBy}
          sortDirection={sortDirection}
        >
          <Column
            label='Id'
            dataKey='id'
            width={200}
          />
          <Column
            label='Name'
            dataKey='assetName'
            width={200}
          />
          <Column
            width={200}
            label='Price'
            dataKey='price'
          />
          <Column
            width={200}
            label='Type'
            dataKey='type'
          />
          <Column
            disableSort
            width={200}
            label=''
            dataKey='add'
            cellRenderer={(e) => (<div onClick={() => this._onRowClick(e)}>Add to favorites</div>)}
          />
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assetsData: state,
  assets: filterAssets(state),
  favoritesData: state,
  filter: state.assets.collectionFilter,
});

const mapDispatchToProps = dispatch => ({
  fetchAssets: val => dispatch(assetsActions.getAssets(val)),
  addToFavorites: val => dispatch(assetsActions.addToFavorites(val)),
  removeFromFavorites: val => dispatch(assetsActions.removeFromFavorites(val)),
  applyFilter: val => dispatch(assetsActions.applyFilter(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
