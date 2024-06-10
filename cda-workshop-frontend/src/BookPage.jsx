import { useState } from 'react';
import "./BookPage.css"
import Author from './components/Author.jsx';


const BookPage = (props) => {
  const [activeAuthor, setActiveAuthor] = useState(false);
  const [author, setAuthor] = useState();
  const handleAuthor = () => {
    console.log('test');
    setActiveAuthor(true);

    fetch('http://localhost:5006/api/author', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setAuthor(data))
      .catch((err) => console.error(err));
    console.log('author : ', author);
  };

  return (
    <div>
      Page Media
      <nav className='nav-media'>
        <li onClick={handleAuthor}>Auteur</li>
      </nav>
      <div className='authors-container'>
        {author &&
          author.map((el, index) => {
            console.log('el :', el);
            return (
              <div key={index}>
                <Author author={el} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookPage;
