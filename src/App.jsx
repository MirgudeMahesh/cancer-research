import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import RegistrationForm from './pages/RegistrationForm';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';
import GlobalHeader from './components/GlobalHeader';

function PrivateRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-primary)' }}>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div className="loader mb-3"></div>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Validating session...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <PatientProvider>
                <Router>
                    <div className="app-background"></div>
                    <GlobalHeader />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/registration-form" element={<RegistrationForm />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/add-patient"
                            element={
                                <PrivateRoute>
                                    <AddPatient />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/patients"
                            element={
                                <PrivateRoute>
                                    <PatientDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
            </PatientProvider>
        </AuthProvider>
    );
}

export default App;
