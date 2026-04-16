import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GlobalHeader = () => {
    const { isAuthenticated, currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (location.pathname === '/registration-form' ||
        location.pathname === '/admin-dashboard') return null;

    const showNav = isAuthenticated &&
        location.pathname !== '/login' &&
        location.pathname !== '/registration-form';

    return (
        <div style={{
            width: '100%',
            height: isMobile ? '160px' : '160px',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            overflow: 'hidden',
        }}>
            {/* Background Banner Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}>
                <img
                    src="/cancer-research-thumbnail.jpg"
                    alt="Cancer Research Portal"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        display: 'block'
                    }}
                />
                {/* Overlay for better readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.25) 100%)',

                }} />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: isMobile ? '1rem' : '0 2rem',
                width: '100%',
                height: '100%',
                position: 'relative',
                gap: isMobile ? '0.5rem' : '0'
            }}>
                {/* Left/Top: Title */}
                {/* <div style={{ flex: isMobile ? 'none' : 1, textAlign: isMobile ? 'center' : 'left' }}>
                    <h1
                        onClick={() => navigate('/dashboard')}
                        style={{
                            fontSize: isMobile ? '1.25rem' : '1.15rem',
                            fontWeight: '800',
                            cursor: 'pointer',
                            margin: 0,
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block',
                            letterSpacing: '-0.025em',
                            // textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                        }}
                    >
                        Cancer Research Portal
                    </h1>
                </div> */}

                {/* Right/Bottom: User & Logout */}
                <div style={{
                    flex: isMobile ? 'none' : 1,
                    display: 'flex',
                    justifyContent: isMobile ? 'center' : 'flex-end',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {showNav ? (
                        <div className="flex gap-2">
                            {location.pathname !== '/dashboard' && (
                                <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
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
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <span style={{
                            color: '#1e293b',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            background: 'rgba(255,255,255,0.7)',
                            padding: '4px 12px',
                            borderRadius: '12px'
                        }}>
                            Please Sign In
                        </span>
                    )}
                </div>
            </div>
        </div >
    );
};

export default GlobalHeader;
