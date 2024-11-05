// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import { validateToken } from '@/lib/api';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const isValid = await validateToken(token);
//       setIsAuthenticated(isValid);
//     }
//     setIsLoading(false);
//   };

//   const login = (token: string) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
