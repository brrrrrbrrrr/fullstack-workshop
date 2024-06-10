import { useContext } from 'react';
import { UserContext } from './UserProvider';

// Création de mon hook personnalisé
const useUser = () => useContext(UserContext);

export default useUser;
