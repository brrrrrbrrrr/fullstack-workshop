import React from 'react';
import './Author.css';
const Author = ({ author }) => {
  console.log('el 2', author);
  return (
    <div className='author-container'>
      <span>Nom : {author.name} </span>
    </div>
  );
};

export default Author;
