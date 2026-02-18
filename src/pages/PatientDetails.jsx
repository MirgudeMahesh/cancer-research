import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientContext';
import { personalDetailsQuestions } from '../forms/personalDetailsQuestions';
import { healthDetailsQuestions } from '../forms/healthDetailsQuestions';
import { backgroundDetailsQuestions } from '../forms/backgroundDetailsQuestions';
import { nutritionInterventionQuestions } from '../forms/nutritionInterventionQuestions';
import { biochemicalEvaluationQuestions } from '../forms/biochemicalEvaluationQuestions';
import { anthropometricQuestions } from '../forms/anthropometricQuestions';
import { nutritionMonitoringQuestions } from '../forms/nutritionMonitoringQuestions';

function PatientDetails() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { patients, editPatient } = usePatients();

    const [activeTab, setActiveTab] = useState('completed');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [submittingAction, setSubmittingAction] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredPatients = patients.filter(patient => {
        const identifier = (patient.patientId || '').toLowerCase();
        const idString = (patient.id || '').toString();
        const matchesSearch = identifier.includes(searchTerm.toLowerCase()) || idString.includes(searchTerm);

        const patientStatus = (patient.status || 'completed').toLowerCase();
        return matchesSearch && (patientStatus === activeTab);
    });

    const handleResumePatient = (patient) => {
        if (submittingAction) return;
        setSubmittingAction('resume');
        editPatient(patient);
        navigate('/add-patient');
    };


    const handleViewPatient = (patient) => {
        if (submittingAction) return;
        setSubmittingAction('view');
        setSelectedPatient(patient);
        setIsEditing(false);
        setSubmittingAction(null);
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setEditData(patient);
        setIsEditing(true);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveEdit = () => {
        // updatePatient(selectedPatient.id, editData);
        // setSelectedPatient(editData);
        // setIsEditing(false);
        // alert('Patient information updated successfully!');
        alert('Edit functionality not yet connected to backend. Only viewing is supported via API for now.');
    };

    const renderDetailSection = (title, dataFields, section) => {
        if (!selectedPatient) return null;

        return (
            <div className="mb-4">
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--primary-light)',
                    borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
                    paddingBottom: '0.5rem'
                }}>
                    {title}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {dataFields
                        .filter(q => {
                            if (q.type === 'heading') return false;
                            if (q.showIf) return q.showIf(selectedPatient);
                            return true;
                        })
                        .map((q) => {
                            const value = selectedPatient[q.id];
                            const unit = q.unit ? ` ${q.unit}` : '';

                            return (
                                <div key={q.id} style={{
                                    padding: '1rem',
                                    background: '#ffffff',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: 'var(--shadow-sm)',
                                    gridColumn: q.type === 'dynamic-days' ? '1 / -1' : 'auto'
                                }}>
                                    <div style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '0.25rem'
                                    }}>
                                        {q.label}
                                    </div>
                                    <div style={{
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem'
                                    }}>
                                        {(() => {
                                            if (q.type === 'dynamic-days' && Array.isArray(value)) {
                                                return (
                                                    <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                        {value.map((day, i) => (
                                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                                                                <span style={{ fontSize: '0.85rem' }}>Day {i + 1}</span>
                                                                <span style={{ fontWeight: '500', fontSize: '0.85rem' }}>Energy: {day.energy} | Protein: {day.protein}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            }

                                            // Handle special types or missing values
                                            if (value === null || value === undefined || value === '') return 'N/A';
                                            return `${value}${unit}`;
                                        })()}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700' }}>
                    Patient Records
                </h1>

                {!selectedPatient ? (
                    <>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                            <button
                                onClick={() => setActiveTab('completed')}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    fontWeight: activeTab === 'completed' ? '700' : '400',
                                    color: activeTab === 'completed' ? 'var(--primary-color)' : 'var(--text-secondary)',
                                    borderBottom: activeTab === 'completed' ? '3px solid var(--primary-color)' : 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Completed
                            </button>
                            <button
                                onClick={() => setActiveTab('pending')}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    fontWeight: activeTab === 'pending' ? '700' : '400',
                                    color: activeTab === 'pending' ? 'var(--primary-color)' : 'var(--text-secondary)',
                                    borderBottom: activeTab === 'pending' ? '3px solid var(--primary-color)' : 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Drafts ({patients.filter(p => (p.status || 'completed') === 'pending').length})
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="search-bar">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder={`Search ${activeTab} patients...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>


                        {/* Patient Table */}
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Identifier</th>
                                        <th>Created At</th>
                                        <th>Gender</th>
                                        {activeTab === 'completed' && <th>Condition</th>}
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.length > 0 ? (
                                        filteredPatients.map((patient) => (
                                            <tr key={patient.id}>
                                                <td style={{ fontSize: '0.8rem' }}>{patient.id}</td>
                                                <td>{patient.patientId || 'N/A'}</td>
                                                <td>{patient.created_at ? new Date(patient.created_at).toLocaleDateString() : 'N/A'}</td>
                                                <td>{patient.gender || 'N/A'}</td>
                                                {activeTab === 'completed' && (
                                                    <td>
                                                        <span style={{
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: 'var(--radius-sm)',
                                                            background: 'rgba(139, 92, 246, 0.2)',
                                                            color: 'var(--accent-color)',
                                                            fontSize: '0.875rem',
                                                            fontWeight: '500'
                                                        }}>
                                                            {patient.condition_specific || 'N/A'}
                                                        </span>
                                                    </td>
                                                )}
                                                <td>
                                                    <div className="flex gap-1">
                                                        {activeTab === 'completed' ? (
                                                            <button
                                                                onClick={() => handleViewPatient(patient)}
                                                                className="btn btn-primary"
                                                                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', opacity: submittingAction ? 0.7 : 1 }}
                                                                disabled={submittingAction !== null}
                                                            >
                                                                {submittingAction === 'view' ? '...' : 'View'}
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleResumePatient(patient)}
                                                                className="btn btn-warning"
                                                                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', opacity: submittingAction ? 0.7 : 1 }}
                                                                disabled={submittingAction !== null}
                                                            >
                                                                {submittingAction === 'resume' ? '...' : '✏️ Resume Filling'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                                No patients found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="glass-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="flex-between mb-4">
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                                {isEditing ? 'Edit Patient' : 'Patient Details'}
                            </h2>
                            <button
                                onClick={() => {
                                    setSelectedPatient(null);
                                    setIsEditing(false);
                                }}
                                className="btn btn-secondary"
                            >
                                ← Back to List
                            </button>
                        </div>

                        <div style={{
                            padding: '1.5rem',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '2rem',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                {selectedPatient.patientId || 'No Identifier'}
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>
                                Internal ID: {selectedPatient.id}
                            </div>
                        </div>

                        {renderDetailSection('Personal Details', personalDetailsQuestions, 'personalDetails')}
                        {renderDetailSection('Medical History', healthDetailsQuestions, 'healthDetails')}
                        {renderDetailSection('Anthropometric and Strength Evaluation', backgroundDetailsQuestions, 'backgroundDetails')}
                        {renderDetailSection('Nutrition Interventional Plans', nutritionInterventionQuestions, 'nutritionIntervention')}
                        {renderDetailSection('Biochemical Evaluation', biochemicalEvaluationQuestions, 'miscellaneous')}
                        {renderDetailSection('Nutrition Monitoring', nutritionMonitoringQuestions, 'nutritionMonitoring')}

                        {isEditing && (
                            <div className="flex gap-2 mt-4">
                                <button onClick={handleSaveEdit} className="btn btn-success">
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditData(selectedPatient);
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PatientDetails;
