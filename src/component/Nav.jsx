import React from 'react'
import '../styles/Nav.css';

import SearchBar from './SearchBar.jsx';


function Nav({onSearch}) {
  return (
    <nav className="miNav">

      <div className='searchBar'>
          <SearchBar
            onSearch={onSearch}
          />

      </div>
    </nav>
  );
};

export default Nav;