import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientContext';
import { personalDetailsQuestions } from '../forms/personalDetailsQuestions';
import { healthDetailsQuestions } from '../forms/healthDetailsQuestions';
import { backgroundDetailsQuestions } from '../forms/backgroundDetailsQuestions';
import { biochemicalEvaluationQuestions } from '../forms/biochemicalEvaluationQuestions';

function PatientDetails() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { patients, updatePatient } = usePatients();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredPatients = patients.filter(patient => {
        const fullName = `${patient.personalDetails?.firstName} ${patient.personalDetails?.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const handleViewPatient = (patient) => {
        setSelectedPatient(patient);
        setIsEditing(false);
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setEditData(patient);
        setIsEditing(true);
    };

    const handleInputChange = (section, field, value) => {
        setEditData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSaveEdit = () => {
        updatePatient(selectedPatient.id, editData);
        setSelectedPatient(editData);
        setIsEditing(false);
        alert('Patient information updated successfully!');
    };

    const renderDetailSection = (title, data, section) => {
        if (!data || Object.keys(data).length === 0) return null;

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
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} style={{
                            padding: '1rem',
                            background: '#ffffff',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #e2e8f0',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.25rem'
                            }}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="form-input"
                                    value={editData[section]?.[key] || ''}
                                    onChange={(e) => handleInputChange(section, key, e.target.value)}
                                    style={{ marginTop: '0.5rem', padding: '0.5rem' }}
                                />
                            ) : (
                                <div style={{
                                    color: 'var(--text-primary)',
                                    fontWeight: '500',
                                    fontSize: '1rem'
                                }}>
                                    {(() => {
                                        const allQuestions = [...personalDetailsQuestions, ...healthDetailsQuestions, ...backgroundDetailsQuestions, ...biochemicalEvaluationQuestions];
                                        const question = allQuestions.find(q => q.id === key);
                                        const unit = question?.unit ? ` ${question.unit}` : '';

                                        if (typeof value === 'object' && value !== null) {
                                            return `${value.years || 0}y ${value.months || 0}m ${value.days || 0}d`;
                                        }
                                        return `${value || 'N/A'}${value ? unit : ''}`;
                                    })()}
                                </div>
                            )}
                        </div>
                    ))}
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
                        {/* Search Bar */}
                        <div className="search-bar">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search patients by name..."
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
                                        <th>Name</th>
                                        <th>Cancer Type</th>
                                        <th>Stage</th>
                                        <th>Diagnosis Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.length > 0 ? (
                                        filteredPatients.map((patient) => (
                                            <tr key={patient.id}>
                                                <td>{patient.id}</td>
                                                <td>
                                                    {patient.personalDetails?.firstName} {patient.personalDetails?.lastName}
                                                </td>
                                                <td>{patient.healthDetails?.cancerType || 'N/A'}</td>
                                                <td>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: 'var(--radius-sm)',
                                                        background: 'rgba(139, 92, 246, 0.2)',
                                                        color: 'var(--accent-color)',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500'
                                                    }}>
                                                        {patient.healthDetails?.stage || 'N/A'}
                                                    </span>
                                                </td>
                                                <td>{patient.healthDetails?.diagnosisDate || 'N/A'}</td>
                                                <td>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => handleViewPatient(patient)}
                                                            className="btn btn-primary"
                                                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditPatient(patient)}
                                                            className="btn btn-secondary"
                                                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                                        >
                                                            Edit
                                                        </button>
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
                                {selectedPatient.personalDetails?.firstName} {selectedPatient.personalDetails?.lastName}
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>
                                Patient ID: {selectedPatient.id}
                            </div>
                        </div>

                        {renderDetailSection('Patients Identification', selectedPatient.personalDetails, 'personalDetails')}
                        {renderDetailSection('Health Details', selectedPatient.healthDetails, 'healthDetails')}
                        {renderDetailSection('Background Details', selectedPatient.backgroundDetails, 'backgroundDetails')}
                        {renderDetailSection('Biochemical Evaluation', selectedPatient.miscellaneous, 'miscellaneous')}

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
