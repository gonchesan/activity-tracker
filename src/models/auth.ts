import { AuthError, Session, User, UserMetadata, WeakPassword } from '@supabase/supabase-js';

export type AuthContextProps = {
  signUpNewUser(params: SignInType): Promise<{
    data:
      | {
          user: User | null;
          session: Session | null;
        }
      | {
          user: null;
          session: null;
        };
    error: AuthError | null;
  }>;
  signInWithEmail(params: SignInType): Promise<{
    data:
      | {
          user: User;
          session: Session;
          weakPassword?: WeakPassword | undefined;
        }
      | {
          user: null;
          session: null;
          weakPassword?: null | undefined;
        };
    error: AuthError | null;
  }>;
  signInWithGoogle: () => Promise<
    | {
        provider: string;
        url: string;
      }
    | undefined
  >;
  signOut: () => Promise<void>;
  user: UserMetadata;
};

export type SignInType = { email: string; password: string };
