import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { getFromLocalStorage, getFromSessionStorage } from '../utils/utils';
import { auth } from '../utils/init-firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

type Props = {
  children: React.ReactNode;
};

type defaultValues = {
  authState: {
    token: string;
  };
  setAuthState: (userAuthInfo: any) => void;
  isUserAuthenticated: () => true | undefined;
  // register: () => Promise<void>;
};

const values: defaultValues = {
  authState: {
    token: '',
  },
  setAuthState: (userAuthInfo) => {},
  isUserAuthenticated: () => true || {},
};

export const AuthContext = React.createContext<any>({});

//const { Provider } = AuthContext;

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = React.useState({
    token: '',
  });

  const setUserAuthInfo = (data: string) => {
    const token = localStorage.setItem('token', data);

    setAuthState({
      token: data,
    });
  };

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // checks if the user is authenticated or not
  //  const isUserAuthenticated = () => {
  //   if (authState.token) {
  //     return true;
  //   }
  //   else{
  //     false
  //   }
  //  };

  //in nextjs app the localStorage and sessionStorage is not available on server side that's why we use the custom hook
  const isUserAuthenticated = () => {
    if (
      getFromLocalStorage('isAuthenticated') &&
      getFromSessionStorage('accessToken')
    ) {
      // console.log(localStorage.getItem("isAuthenticated"),sessionStorage.getItem("sitJWT") );
      return true;
    } else {
      false;
    }
  };

  //const isUserAuthenticated = () => !!authState.token;

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (userAuthInfo: any) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export { AuthContext, AuthProvider };
