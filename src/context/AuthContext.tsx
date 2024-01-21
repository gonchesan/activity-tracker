import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UserMetadata } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';

import { AuthProviderProps } from '@/interface/auth';

export const AuthContext = React.createContext<AuthProviderProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState<UserMetadata>([]);

    async function signInWithGoogle() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw new Error('A ocurrido un error durante la autenticación');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error('A ocurrido un error durante el cierre de sesión');
    }

    React.useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(event);
            if (session == undefined) {
                navigate('/login', { replace: true });
            } else {
                setUser({ ...session?.user.user_metadata, id: session?.user.id });
                navigate('/', { replace: true });
            }
        });
        return () => {
            authListener.subscription;
        };
    }, []);

    return <AuthContext.Provider value={{ signInWithGoogle, signOut, user }}>{children}</AuthContext.Provider>;
};
