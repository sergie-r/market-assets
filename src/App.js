import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Table } from 'react-virtualized';
import Immutable from 'immutable';
import SortDirection from '../src/components/SortDirection';
import { mock } from '../mock';
import assetsActions from '../src/actions/assetsActions';

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
    mock.subscribe(val => this.props.fetchAssets(val));
  }

  _sort({sortBy, sortDirection}) {
    const sortedList = this._sortList({sortBy, sortDirection});

    this.setState({sortBy, sortDirection, sortedList});
  }

  _getAssets() {
    const { assets } = this.props.assetsData;
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

  render() {
    const { sortBy, sortDirection } = this.state;
    const sortedList = this._sortList({sortBy, sortDirection});
    const rowGetter = ({index}) => this._getDatum(sortedList, index);
    const list = this._getAssets();
    const { favorites } = this.props.favoritesData;

    return (
      <div>
        {Object.keys(favorites).map(item => (
          <div key={favorites[item].id}>
            <div>{favorites[item].assetName}</div>
            <div>{favorites[item].price}</div>
            <div>{favorites[item].type}</div>
          </div>
        ))}
        <Table
          width={600}
          height={600}
          headerHeight={20}
          onRowClick={e => this._onRowClick(e)}
          overscanRowCount={10}
          rowHeight={50}
          rowCount={list.length}
          rowGetter={rowGetter}
          sort={this._sort}
          sortBy={sortBy}
          sortDirection={sortDirection}
        >
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
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assetsData: state,
  favoritesData: state,
});

const mapDispatchToProps = dispatch => ({
  fetchAssets: val => dispatch(assetsActions.getAssets(val)),
  addToFavorites: val => dispatch(assetsActions.addToFavorites(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
