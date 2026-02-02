import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message || 'Invalid email or password');
        }
        setIsLoading(false);
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
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Password / Unique Code</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="Enter your practitioner code"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                        />
                    </div>

                    {error && (
                        <div className="form-error" style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid var(--danger-color)' }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-4" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        <strong>Direct Login (Dev Only):</strong>
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Email: <span
                            style={{ cursor: 'pointer', color: 'var(--primary-color)', textDecoration: 'underline' }}
                            onClick={() => setEmail('doctor@cancer-research.com')}
                        >
                            doctor@cancer-research.com
                        </span><br />
                        Code: <span
                            style={{ cursor: 'pointer', color: 'var(--primary-color)', textDecoration: 'underline' }}
                            onClick={() => setPassword('CR2024')}
                        >
                            CR2024
                        </span>
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        * Note: These must exist in your database to work.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
