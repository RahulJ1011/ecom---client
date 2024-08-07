import { Search } from '@mui/icons-material';
import React from 'react';
import './searchList.css';

const SearchList = ({ TitleArray, SetQuery, SetSearchLists }) => {
  return (
    <>
      <div className='container_searchList'>
        {TitleArray.map((m) => (
          <p
            key={m}
            className='titleItem'
            onClick={(e) => {
              SetQuery(m);
              SetSearchLists(false); 
            }}
          >
            <Search sx={{ marginTop: '5px' }} />
            {m}
          </p>
        ))}
      </div>
    </>
  );
};

export default SearchList;
