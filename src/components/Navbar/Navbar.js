import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppBar, Box, InputAdornment, IconButton, Toolbar, Typography, styled, TextField } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import SearchList from './SearchList';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import './navbar.css';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [searchLists, setSearchLists] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const userName = localStorage.getItem("userName");
  const [prodres,setProdRes] = useState([]);
  const carts = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/Prod/searchList?query=${query}`);
        setSearchResults(res.data); 
        console.log(res.data);
        if(searchLists === false)
          {
            const results = await axios.get(`http://localhost:7000/api/prod/search/${query}`);
            setProdRes(results.data);
            console.log(results.data)

          }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any additional logic for handling form submission
  };

  return (
    <div className='header'>
      <h4 className='title'>
        AmaFlip
      </h4>
      <div className='header_search'>
        <input
          className='search_input'
          type='text'
          placeholder='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => setSearchLists(true)}
        />
        <Search className='search_icon' />
      </div>
      <div className='header_nav'>
        <div className='header_offers'>
          <h3>Today Offers</h3>
          <LocalOfferRoundedIcon />
        </div>
        <div className='header_returns'>
          <span className='header_option_lineOne'>
            Returns
          </span>
          <span className='header_option_lineTwo'>
            & Order
          </span>
        </div>
        <h3 className='header_username'>
          {userName}
        </h3>
        <div className='header_cart'>
          <Link to={'/cart'}>
            <ShoppingCartRoundedIcon className='cart' />
          </Link>
          {/* <span className='cart_collections'>
                { carts &&   carts[0].length  }
          </span> */}
        </div>
      </div>
      {
        query && searchLists && <SearchList
          TitleArray={searchResults} 
          SetQuery={setQuery}
          SetSearchLists={setSearchLists}
        />
      }
    </div>
  );
};

export default Navbar;
