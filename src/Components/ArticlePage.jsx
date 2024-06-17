// src/Components/ArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = ({url}) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setArticle(data.articles[id]);
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div className="flex items-center justify-center w-full h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full md:px-[15%] px-[2.5%] mt-4">
      <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
      <div className="flex gap-4 pb-6">
        <p className='px-2 border rounded-md'>Source: {article.source.name}</p>
        <p className='px-2 border rounded-md'>Author: {article.author}</p>
      </div>
      <img className='rounded-md w-[90%] mx-auto' src={article.urlToImage} alt="" />
      <p className='text-[#c2c2c2] pt-4'>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
