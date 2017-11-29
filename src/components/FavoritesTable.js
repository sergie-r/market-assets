import React from 'react';
import { Column, Table } from 'react-virtualized';
import Immutable from 'immutable';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import SortDirection from './SortDirection';

class FavoritesTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this._sort = this._sort.bind(this);
  }
  state = {
    sortBy: '',
    sortDirection: SortDirection.ASC,
  };

  componentDidMount() {
    const storageAssets = JSON.parse(localStorage.getItem('asset')) || [];
    Object.keys(storageAssets).forEach(item => {
      this.props.addToFavorites(storageAssets[item]);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.favoritesData.favorites, nextProps.favoritesData.favorites)) {
      localStorage.setItem('asset', JSON.stringify(nextProps.favoritesData.favorites))
    }
  }

  _sort({sortBy, sortDirection}) {
    const sortedList = this._sortList({sortBy, sortDirection});

    this.setState({sortBy, sortDirection, sortedList});
  }

  _getAssets() {
    const { favorites } = this.props.favoritesData;
    const listArr = [];

    Object.keys(favorites).map(item => (
      listArr.push(favorites[item])
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

  render() {
    const { sortBy, sortDirection } = this.state;
    const sortedList = this._sortList({sortBy, sortDirection});
    const rowGetter = ({index}) => this._getDatum(sortedList, index);
    const list = this._getAssets();
    const { favorites } = this.props.favoritesData;

    if (_isEmpty(favorites)) return null;

    return (
      <div>
        <h2>Favorites Table</h2>
        <Table
          width={600}
          height={300}
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
            width={80}
            label=''
            dataKey='delete'
            cellRenderer={(e) => (<div onClick={() => this.props.removeFromFavorites(e)}>Delete</div>)}
          />
        </Table>
      </div>
    );
  }
}

export default FavoritesTable;
