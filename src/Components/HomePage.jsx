// src/Components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { Pagination } from "@mui/material";
import { styled } from "@mui/system";
import usePagination from '../Components/Pagination/Pagination';

const HomePage = ({ url, search }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const responseJ = await response.json();
      setData(responseJ.articles);
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, url]);

  const handleAddFavorite = (article) => {
    const newFavorites = [...favorites, article];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleRemoveFavorite = (url) => {
    const newFavorites = favorites.filter(article => article.url !== url);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (url) => {
    return favorites.some(article => article.url === url);
  };

  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(entries);
  const totalData = data.length;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const count = Math.ceil(totalData / postPerPage);
  const dataShown = usePagination(data, totalData);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    dataShown.jump(value);
  };
  const currentData = data.slice(firstPostIndex, lastPostIndex);
  const handleEntries = (event) => {
    setEntries(event.target.value);
    setPostPerPage(event.target.value);
  };

  const CustomPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
    "& .MuiPaginationItem-root": {
      margin: theme.spacing(0.5),
      borderRadius: "0",
      color: "#fff",
      "&.Mui-selected": {
        color: "#000",
        backgroundColor: "#fff",
      },
      "&:hover": {
        color: "#ddd",
      }
    },
  }));
  console.log(data)
  return (
    <div className='flex flex-col w-full md:px-[15%] px-[2.5%] mt-4'>
      <div className="flex justify-between">
        <div className='pt-2 items-center flex'>
          <span> Show </span>
          <input
            className='bg-[#5b5b5b] px-2 py-1 rounded-md text-primary active:border-none outline-none  ml-2'
            placeholder='12'
            value={entries}
            type="number"
            min="1"
            max="100"
            step="4"
            inputMode="numeric"
            onChange={handleEntries}
          />
          <span className='pl-2'> news </span>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {currentData.map((item, id) => (
            <div key={id} className="flex flex-col pb-8 border-b-2 pt-4">
              <p className='text-xl font-bold pb-2'>{item.title}</p>
              <div className="flex gap-4 pb-6">
                <p className='px-2 border rounded-md'>Source: {item.source.name}</p>
                <p className='px-2 border rounded-md'>Author: {item.author}</p>
              </div>
              <img className='rounded-md w-[90%] mx-auto' src={item.urlToImage} alt="" />
              <p className='text-[#c2c2c2] pt-4'>{item.description}</p>
              <div className="flex justify-between pt-4">
                <Link
                  to={{
                    pathname: `/article/${id}`,
                    
                  }}
                  className="text-blue-500"
                >
                  Read more
                </Link>
                {isFavorite(item.url) ? (
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveFavorite(item.url)}
                  >
                    Remove from Favorites
                  </button>
                ) : (
                  <button
                    className="text-green-500"
                    onClick={() => handleAddFavorite(item)}
                  >
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          ))}
          <CustomPagination
            count={count}
            variant="outlined"
            page={currentPage}
            onChange={handleChange}
            color="secondary"
            className='my-4'
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
