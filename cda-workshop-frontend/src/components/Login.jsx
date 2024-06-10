import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../context/useUser';

const Login = () => {
  const navigate = useNavigate();
  const { validToken, setValidToken } = useUser();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [validToken]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      lastname: user,
      password: password,
    };

    // FETCH API BACKEND
    fetch('http://localhost:5006/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);

        setValidToken(true);
      })
      .catch((err) => console.error('Fetch error:', err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='username'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor='username'></label>
        <input
          type='password'
          name=''
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='password'></label>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
