import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
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

        if (isAdmin) {
            try {
                const response = await fetch('https://cancer-research-backend-1.onrender.com/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password })
                });
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem('adminUser', JSON.stringify(data.admin));
                    navigate('/admin-dashboard');
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Admin login failed. Check backend connection.');
            }
        } else {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Invalid email or password');
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="flex-center" style={{ minHeight: 'calc(100vh - 220px)', padding: '2rem' }}>
            <div className="glass-card" style={{ maxWidth: '500px', width: '100%' }}>
                <div style={{ display: 'flex', borderRadius: 'var(--radius-md)', background: '#f1f5f9', padding: '4px', marginBottom: '2rem' }}>
                    <button
                        onClick={() => { setIsAdmin(false); setError(''); }}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            background: !isAdmin ? 'white' : 'transparent',
                            color: !isAdmin ? 'var(--primary-color)' : 'var(--text-muted)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: !isAdmin ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.3s'
                        }}
                    >
                        Practitioner
                    </button>
                    <button
                        onClick={() => { setIsAdmin(true); setError(''); }}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            background: isAdmin ? 'white' : 'transparent',
                            color: isAdmin ? 'var(--primary-color)' : 'var(--text-muted)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: isAdmin ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.3s'
                        }}
                    >
                        Admin
                    </button>
                </div>

                <div className="text-center mb-4">
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
                        {isAdmin ? 'Admin Portal' : 'Cancer Research Portal'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                        {isAdmin ? 'Pulse NHS Admin Login' : 'Medical Practitioner Login'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">{isAdmin ? 'Username' : 'Email Address'}</label>
                        <input
                            type="text"
                            id="email"
                            className="form-input"
                            placeholder={isAdmin ? "Enter admin username" : "doctor@cancer-research.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
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

                {!isAdmin && (
                    <>
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
                        </div>
                        <div className="text-center mt-3">
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                New practitioner? <span
                                    onClick={() => navigate('/registration-form')}
                                    style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '600' }}
                                >
                                    Register here
                                </span>
                            </p>
                        </div>
                    </>
                )}

                {isAdmin && (
                    <div className="mt-4" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            <strong>Admin Credentials:</strong>
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            User: <span style={{ cursor: 'pointer', color: 'var(--primary-color)', textDecoration: 'underline' }} onClick={() => setEmail('pulse_testing_for_nhs')}>pulse_testing_for_nhs</span><br />
                            Pass: <span style={{ cursor: 'pointer', color: 'var(--primary-color)', textDecoration: 'underline' }} onClick={() => setPassword('pulse@testing@nhs')}>pulse@testing@nhs</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
