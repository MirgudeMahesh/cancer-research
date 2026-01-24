import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GlobalHeader = () => {
    const { isAuthenticated, currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const showNav = isAuthenticated && location.pathname !== '/login';

    return (
        <div style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.95)',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            padding: '4px 0'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                width: '100%'
            }}>
                {/* Left: Title */}
                <div style={{ flex: 1 }}>
                    <h1
                        onClick={() => navigate('/dashboard')}
                        style={{
                            fontSize: '1.15rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            margin: 0,
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block',
                            letterSpacing: '-0.025em'
                        }}
                    >
                        Cancer Research Portal
                    </h1>
                </div>

                {/* Middle: Centered Image */}
                <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        background: '#ffffff',
                        padding: '6px',
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: "1px solid #f1f5f9"
                    }}>
                        <img
                            src="/cancer-research-thumbnail.jpg"
                            alt="Cancer Research Portal"
                            style={{
                                height: '130px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                display: 'block',
                                borderRadius: '12px'
                            }}
                        />
                    </div>
                </div>

                {/* Right: User & Logout */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
                    {showNav ? (
                        <div className="flex gap-2">
                            {location.pathname !== '/dashboard' && (
                                <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    Dashboard
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.875rem',
                                    borderRadius: '20px',
                                    background: '#f1f5f9',
                                    color: '#475569',
                                    fontWeight: '600'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Please Sign In</span>
                    )}
                </div>
            </div>
        </div >
    );
};

export default GlobalHeader;
