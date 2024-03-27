import React from 'react';

import { UserMetadata } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';

import { AuthContextProps, SignInType } from '@/models/auth';

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
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

  async function signInWithEmail(params: SignInType) {
    const { email, password } = params;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }
  async function signUpNewUser(params: SignInType) {
    const { email, password } = params;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: '/',
      },
    });

    return { data, error };
  }

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session == undefined) {
      } else {
        setUser({ ...session?.user, ...session?.user.user_metadata, id: session?.user.id });
      }
    });
    return () => {
      authListener.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signUpNewUser, signInWithEmail, signInWithGoogle, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
