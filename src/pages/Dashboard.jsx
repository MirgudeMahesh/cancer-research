import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <div className="container" style={{ paddingTop: '2rem' }}>
                <div className="glass-card" style={{
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    padding: '1.5rem 2.5rem',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  
                }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
                        Welcome, Doctor
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
                        Manage clinical research and patient documentation with ease and security.
                    </p>
                </div>

                <div className="card-grid" style={{ maxWidth: '960px', margin: '0 auto 3rem' }}>
                    <div
                        className="glass-card"
                        style={{ cursor: 'pointer', textAlign: 'center', padding: '3rem 2rem' }}
                        onClick={() => navigate('/add-patient')}
                    >
                        <div
                            className="flex-center mb-3"
                            style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto',
                                background: 'var(--gradient-primary)',
                                borderRadius: '50%',
                                fontSize: '2.5rem'
                            }}
                        >
                            👤
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                            Add Patient
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Register a new patient 
                        </p>
                        <button className="btn btn-primary">
                            Get Started
                        </button>
                    </div>

                    <div
                        className="glass-card"
                        style={{ cursor: 'pointer', textAlign: 'center', padding: '3rem 2rem' }}
                        onClick={() => navigate('/patients')}
                    >
                        <div
                            className="flex-center mb-3"
                            style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto',
                                background: 'var(--gradient-success)',
                                borderRadius: '50%',
                                fontSize: '2.5rem'
                            }}
                        >
                            📋
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                            Patient Details
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            View, search, and manage existing patient records
                        </p>
                        <button className="btn btn-success">
                            View Patients
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
