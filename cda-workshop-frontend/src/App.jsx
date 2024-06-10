import './App.css';

import { Outlet } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
