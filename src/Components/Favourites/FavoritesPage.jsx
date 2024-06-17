// src/Components/FavoritesPage.jsx
import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="flex flex-col w-full md:px-[15%] px-[2.5%] mt-4">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((item, id) => (
          <a href={item.url} key={id} className="flex flex-col pb-8 border-b-2 pt-4">
            <p className='text-xl font-bold pb-2'>{item.title}</p>
            <div className="flex gap-4 pb-6">
              <p className='px-2 border rounded-md'>Source: {item.source.name}</p>
              <p className='px-2 border rounded-md'>Author: {item.author}</p>
            </div>
            <img className='rounded-md w-[90%] mx-auto' src={item.urlToImage} alt="" />
            <p className='text-[#c2c2c2] pt-4'>{item.description}</p>
          </a>
        ))
      ) : (
        <p>No favorite articles yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
