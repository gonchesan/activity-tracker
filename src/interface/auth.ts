import { UserMetadata } from "@supabase/supabase-js";

export interface AuthProviderProps {
  signInWithGoogle: () => Promise<
    | {
        provider: string;
        url: string;
      }
    | undefined
  >;
  signOut: () => Promise<void>;
  user: UserMetadata;
}
