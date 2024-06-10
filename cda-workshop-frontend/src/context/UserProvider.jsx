import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

// Définir le contexte utilisateur
const UserContext = createContext(null);

// Création du provider
function UserProvider({ children }) {
  const [token, setToken] = useState();
  const [validToken, setValidToken] = useState(true);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        validToken,
        setValidToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext };
export default UserProvider;
