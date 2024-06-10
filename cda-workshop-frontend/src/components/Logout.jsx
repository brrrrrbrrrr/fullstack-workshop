import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../context/useUser';

const Logout = () => {
  const { validToken, setValidToken } = useUser();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleDisconnect = () => {
    localStorage.clear();
    setToken('');
  };

  const navigate = useNavigate();
  const data = {
    token: token,
  };

  useEffect(() => {
    console.log('validToken :', validToken);

    fetch('http://localhost:5006/api/users/verifytoken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((datas) => {
        if (
          datas.message === 'You need a token' ||
          datas.message === 'Invalid token ....'
        ) {
          setValidToken(false);
        } else setValidToken(true);
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
      <button onClick={handleDisconnect}>LOGOUT</button>
    </div>
  );
};

export default Logout;
