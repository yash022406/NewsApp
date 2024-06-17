// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import FavoritesPage from "./Components/Favourites/FavoritesPage";
import ArticlePage from "./Components/ArticlePage";
const App = () => {
  const [category, setCategory] = useState();
  const [search, setSearch] = useState('');

  let url = `https://newsapi.org/v2/everything?q=${search ? search : "keyword"}&apiKey=22c784106bf8497f91ad91b984f20d87`;
  const changeCategory = (event) => {
    setCategory(event.target.value);
  };
  if (category === "technology" || category === "business" || category === "entertainment") {
    url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=22c784106bf8497f91ad91b984f20d87`;
  }
  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Router>
      <div className="flex flex-col items-center">
        <div className="flex w-full text-2xl justify-center py-2 font-bold">NeighborGood</div>
        <div className="flex justify-between w-full md:px-[15%] px-[2.5%]">
          <select value={category} onChange={changeCategory} className="bg-white text-black p-2 rounded-md mt-4">
            <option value="allCategory">All category News</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="pl-2 mt-4 outline-none bg-[#cfcfcf] rounded-md text-black placeholder:text-[#2c2c2c]"
            value={search}
            onChange={changeSearch}
          />
          <Link to="/favorites">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Go to Favorites</button>
          </Link>
        </div>
        <Routes>
          <Route path="/" index element={<HomePage url={url} search={search} />}/>
            
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/article/:id" element={<ArticlePage url={url} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
