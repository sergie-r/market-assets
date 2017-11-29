import React from 'react';

const Filter = ({ onChange, type }) => (
  <div>
    <h4>Filter</h4>
    <select
      name="filter"
      onChange={e => onChange(e.target.value)}
      value={type}
    >
      <option value="All">All</option>
      <option value="Stock">Stock</option>
      <option value="Currency">Currency</option>
    </select>
  </div>
);

export default Filter;
