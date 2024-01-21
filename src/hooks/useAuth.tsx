import React from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function useAuth() {
    const authContext = React.useContext(AuthContext);
    if (!authContext) throw new Error('AuthContext need a Provider');

    return authContext;
}
