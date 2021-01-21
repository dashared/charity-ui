import { createContext } from "react";

import { Role } from "./rbac-rules";

type User = {
  name?: string;
  role: Role;
  surname?: string;
};

export type Credentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  authenticated: boolean;
  user: User;
  accessToken: string;
  initiateLogin: (credentials: Credentials) => void;
  handleAuthentication: () => void;
  logout: () => void;
};

const authContext = createContext<AuthContextType>({
  authenticated: false, // to check if authenticated or not
  user: { role: Role.admin, name: "Hello World" }, // store all the user details
  accessToken: "", // accessToken of user for Auth0
  initiateLogin: () => {
    console.log("initiate login");
  }, // to start the login process
  handleAuthentication: () => {
    console.log("handle auth");
  }, // handle Auth0 login process
  logout: () => {
    console.log("logout");
  }, // logout the user
});

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;
