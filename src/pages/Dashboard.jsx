import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientContext';

function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const { resetForm } = usePatients();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddPatientClick = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        resetForm();
        navigate('/add-patient');
    };

    const handleViewPatientsClick = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        navigate('/patients');
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
                        style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', textAlign: 'center', padding: '3rem 2rem', opacity: isSubmitting ? 0.8 : 1 }}
                        onClick={handleAddPatientClick}
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
                        <button
                            onClick={(e) => { e.stopPropagation(); handleAddPatientClick(); }}
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                        >
                            {isSubmitting ? '⌛ Loading...' : 'Get Started'}
                        </button>
                    </div>

                    <div
                        className="glass-card"
                        style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', textAlign: 'center', padding: '3rem 2rem', opacity: isSubmitting ? 0.8 : 1 }}
                        onClick={handleViewPatientsClick}
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
                        <button
                            onClick={(e) => { e.stopPropagation(); handleViewPatientsClick(); }}
                            className="btn btn-success"
                            disabled={isSubmitting}
                            style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                        >
                            {isSubmitting ? '⌛ Loading...' : 'View Patients'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
