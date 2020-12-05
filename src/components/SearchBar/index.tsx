import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

const SearchBookPage = (({ ...rest }) => {
  return (
    <>
      {/* <TextField
      id="filled-start-adornment"
      placeholder='Pesquise por título ou autor'

      {...rest}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
      }}
      fullWidth
      variant='outlined'
    /> */}
      {/* <div classNameName='root'>
      <div classNameName='inputbase-root'>
        <div classNameName='input-icon'> 
        <div classNameName='icon'></div>
        </div>
        <input
          classNameName="search-input"
          placeholder='Search for dragons name or type'
        />
        <fieldset classNameName='fieldset'></fieldset>
      </div>
    </div> */}

      <div className='search'>
      
        <FiSearch className='icon'/>
     
        <input name="search"
          type="text"
          id="search"
          aria-label="search"
          placeholder="Search for dragons name or type"
          ></input>
      </div>
    </>
  )
});

export default SearchBookPage;