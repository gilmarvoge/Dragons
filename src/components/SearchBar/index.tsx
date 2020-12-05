import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

const SearchPage = (props: any) => {
  const { onChange } = props;

  return (
    <div className='search'>
      <FiSearch className='icon' />
      <input name="search"
        type="text"
        id="search"
        aria-label="search"
        placeholder="Search for dragons name or type"
        onChange={onChange}
      ></input>
    </div>
  )
};

export default SearchPage;