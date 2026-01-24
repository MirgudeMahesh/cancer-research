import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Sample doctor credentials
const SAMPLE_DOCTORS = [
    { email: 'doctor@cancer-research.com', code: 'CR2024' },
    { email: 'admin@cancer-research.com', code: 'ADMIN123' },
];

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const login = (email, code) => {
        const doctor = SAMPLE_DOCTORS.find(
            (d) => d.email === email && d.code === code
        );

        if (doctor) {
            setIsAuthenticated(true);
            setCurrentUser({ email: doctor.email });
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
