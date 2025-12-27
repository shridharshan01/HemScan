import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('hemscan_current_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signup = (email, password, name) => {
        const users = JSON.parse(localStorage.getItem('hemscan_users') || '[]');

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { email, password, name };
        users.push(newUser);
        localStorage.setItem('hemscan_users', JSON.stringify(users));

        // Auto login after signup
        login(email, password);
        return { success: true };
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('hemscan_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...userWithoutPass } = foundUser; // Don't keep password in state
            setUser(userWithoutPass);
            localStorage.setItem('hemscan_current_user', JSON.stringify(userWithoutPass));
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hemscan_current_user');
    };

    const value = {
        user,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
