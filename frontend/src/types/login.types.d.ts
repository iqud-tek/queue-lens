// login.types.d.ts

// Define the structure of the User object
export interface User {
  email: string;
  password: string;
}

// Define the structure of the LoginState
export interface LoginState {
  isAuthenticated: boolean;
  user: User | null;
}

// Define the RootState that will include the login state
export interface LoginRootState {
  login: LoginState; // This assumes you will add more slices to RootState later
}
