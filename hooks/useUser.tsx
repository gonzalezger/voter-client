import { useContext } from 'react';
import { UserContext } from '../contexts/User';

export default function useAuth() {
  return useContext(UserContext);
}