import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedDoctor = localStorage.getItem('doctor');
        if (savedDoctor) {
            try {
                const doctorData = JSON.parse(savedDoctor);
                setIsAuthenticated(true);
                setCurrentUser(doctorData);
            } catch (e) {
                localStorage.removeItem('doctor');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email, passwordHash) => {
        try {
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password_hash', passwordHash);

            const response = await fetch('https://cancer-research-backend-1flb.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const data = await response.json();

            if (data.success) {
                const doctorProfile = {
                    id: data.doctor.id,
                    name: data.doctor.name,
                    email: data.doctor.email
                };
                setIsAuthenticated(true);
                setCurrentUser(doctorProfile);
                localStorage.setItem('doctor', JSON.stringify(doctorProfile));
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Invalid credentials' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Server connection failed' };
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        localStorage.removeItem('doctor');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
