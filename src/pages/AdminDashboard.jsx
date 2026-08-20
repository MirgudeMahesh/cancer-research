import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [practitioners, setPractitioners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [processingId, setProcessingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const adminUser = localStorage.getItem('adminUser');
        if (!adminUser) {
            navigate('/login');
            return;
        }
        fetchPractitioners();
    }, [navigate]);

    const fetchPractitioners = async () => {
        try {
            const response = await fetch('https://cancer-research-backend-1flb.onrender.com/api/admin/practitioners');
            const data = await response.json();
            if (data.success) {
                setPractitioners(data.practitioners);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch practitioners');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!window.confirm('Are you sure you want to approve this practitioner?')) return;
        setProcessingId(id);
        try {
            const response = await fetch(`https://cancer-research-backend-1flb.onrender.com/api/admin/practitioners/${id}/approve`, { method: 'POST' });
            const data = await response.json();
            if (data.success) {
                alert(data.message);
                fetchPractitioners();
            } else {
                alert(data.message);
                setProcessingId(null);
            }
        } catch (err) {
            alert('Approval failed');
            setProcessingId(null);
        }
    };

    const handleReject = async () => {
        if (!remarks) return alert('Please enter remarks for rejection');
        const id = showRejectModal;
        setProcessingId(id);
        try {
            const formData = new URLSearchParams();
            formData.append('remarks', remarks);

            const response = await fetch(`https://cancer-research-backend-1flb.onrender.com/api/admin/practitioners/${id}/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });
            const data = await response.json();
            if (data.success) {
                alert(data.message);
                setShowRejectModal(null);
                setRemarks('');
                fetchPractitioners();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Rejection failed');
        } finally {
            setProcessingId(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    if (loading) return <div className="flex-center" style={{ height: '100vh' }}><div className="loader"></div></div>;

    return (
        <div className="container" style={{ maxWidth: '1200px', padding: '2rem' }}>
            <div className="flex-between mb-4">
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Admin Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage Practitioner Registrations</p>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary">Logout Admin</button>
            </div>

            {error && <div className="form-error mb-4">{error}</div>}

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Hospital</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {practitioners.map((p) => (
                            <tr key={p.id}>
                                <td>{`${p.title} ${p.first_name} ${p.last_name}`}</td>
                                <td>{p.hospital_name}</td>
                                <td>{p.email}</td>
                                <td>{p.phone}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        background: p.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : p.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: p.status === 'approved' ? 'var(--secondary-color)' : p.status === 'rejected' ? 'var(--danger-color)' : 'var(--warning-color)'
                                    }}>
                                        {p.status}
                                    </span>
                                </td>
                                <td>
                                    {p.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleApprove(p.id)}
                                                className="btn btn-success"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', opacity: processingId === p.id ? 0.7 : 1 }}
                                                disabled={processingId !== null}
                                            >
                                                {processingId === p.id ? '...' : 'Approve'}
                                            </button>
                                            <button
                                                onClick={() => setShowRejectModal(p.id)}
                                                className="btn btn-danger"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', opacity: processingId === p.id ? 0.7 : 1 }}
                                                disabled={processingId !== null}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                    {p.status !== 'pending' && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.remarks || 'No remarks'}</span>}
                                </td>
                            </tr>
                        ))}
                        {practitioners.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center" style={{ padding: '3rem' }}>No practitioners found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Rejection Modal */}
            {showRejectModal && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '400px' }}>
                        <h3 className="mb-3">Reject Registration</h3>
                        <div className="form-group">
                            <label className="form-label">Reason for Rejection</label>
                            <textarea
                                className="form-input"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Enter remarks to send to the practitioner..."
                                style={{ minHeight: '120px' }}
                            ></textarea>
                        </div>
                        <div className="flex-center gap-2 mt-4">
                            <button onClick={() => { setShowRejectModal(null); setRemarks(''); }} className="btn btn-secondary" disabled={processingId !== null}>Cancel</button>
                            <button onClick={handleReject} className="btn btn-danger" disabled={processingId !== null}>
                                {processingId !== null ? 'Sending email...' : 'Confirm Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
