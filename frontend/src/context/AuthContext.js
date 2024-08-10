import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthToken, setAuthToken } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            // Fetch user data from API with token
            fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` },
            })
                .then(response => response.json())
                .then(data => setUser(data.user))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
