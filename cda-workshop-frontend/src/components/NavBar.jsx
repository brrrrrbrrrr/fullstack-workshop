import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import useUser from '../context/useUser';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const { validToken, setValidToken } = useUser();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleDisconnect = () => {
    localStorage.clear();
    setToken('');
    setValidToken(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5006/api/users/verifytoken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((datas) => {
        if (
          datas.message === 'You need a token' ||
          datas.message === 'Invalid token ....'
        ) {
          localStorage.clear();
          setValidToken(false);
        } else {
          setValidToken(true);
        }
      })
      .catch(
        (err) => {
          console.log(err);
        },
        [token, validToken]
      );
    if (!validToken) {
      navigate('/');
    }
  }, [token, validToken]);

  return (
    <div>
      <nav>
        <Link to='/home'>
          <li className='nav-li'>Accueil</li>
        </Link>
        <Link to='/book'>
          <li className='nav-li'>Livres</li>
        </Link>
        {validToken && (
          <div className='nav-acount_menu'>
            <li>Mon compte</li>
            <button onClick={handleDisconnect}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
