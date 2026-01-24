import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';
import GlobalHeader from './components/GlobalHeader';

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
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
