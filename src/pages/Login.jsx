import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !code) {
            setError('Please fill in all fields');
            return;
        }

        const success = login(email, code);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Invalid email or unique code');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: 'calc(100vh - 220px)', padding: '2rem' }}>
            <div className="glass-card" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
                        Cancer Research Portal
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Medical Practitioner Login</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="doctor@cancer-research.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="code" className="form-label">Unique Code</label>
                        <input
                            type="text"
                            id="code"
                            className="form-input"
                            placeholder="Enter your unique code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="form-error" style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid var(--danger-color)' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Sign In
                    </button>
                </form>

                <div className="mt-4" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        <strong>Sample Credentials:</strong>
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Email: doctor@cancer-research.com<br />
                        Code: CR2024
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
