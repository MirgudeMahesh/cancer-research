import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientContext';
import { personalDetailsQuestions } from '../forms/personalDetailsQuestions';
import { healthDetailsQuestions } from '../forms/healthDetailsQuestions';
import { backgroundDetailsQuestions } from '../forms/backgroundDetailsQuestions';
import { biochemicalEvaluationQuestions } from '../forms/biochemicalEvaluationQuestions';

const STEPS = [
    { id: 1, name: 'Identification', section: 'personalDetails', questions: personalDetailsQuestions },
    { id: 2, name: 'Health', section: 'healthDetails', questions: healthDetailsQuestions },
    { id: 3, name: 'Background', section: 'backgroundDetails', questions: backgroundDetailsQuestions },
    { id: 4, name: 'Evaluation', section: 'miscellaneous', questions: biochemicalEvaluationQuestions }
];

function AddPatient() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { currentPatientForm, saveFormProgress, addPatient, resetForm } = usePatients();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(currentPatientForm[STEPS[0].section] || {});
    const [showReview, setShowReview] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const currentStepData = STEPS.find(s => s.id === currentStep);

    const handleInputChange = (questionId, value) => {
        setFormData(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSave = () => {
        saveFormProgress(currentStepData.section, formData);
        setSaveMessage('Progress saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handleNext = () => {
        saveFormProgress(currentStepData.section, formData);
        if (currentStep < STEPS.length) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setFormData(currentPatientForm[STEPS[nextStep - 1].section] || {});
        }
    };

    const handlePrevious = () => {
        saveFormProgress(currentStepData.section, formData);
        if (currentStep > 1) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            setFormData(currentPatientForm[STEPS[prevStep - 1].section] || {});
        }
    };

    const handleStepClick = (stepId) => {
        saveFormProgress(currentStepData.section, formData);
        setCurrentStep(stepId);
        setFormData(currentPatientForm[STEPS[stepId - 1].section] || {});
    };

    const handleReview = () => {
        saveFormProgress(currentStepData.section, formData);
        setShowReview(true);
    };

    const handleAddPatient = () => {
        addPatient(currentPatientForm);
        alert('Patient added successfully!');
        navigate('/patients');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderQuestion = (question) => {
        const value = formData[question.id] || '';

        if (question.type === 'info') {
            return (
                <div style={{
                    padding: '1rem',
                    background: 'rgba(56, 189, 248, 0.1)',
                    borderLeft: '4px solid var(--primary-color)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    marginBottom: '1rem'
                }}>
                    {question.text}
                </div>
            );
        }

        if (question.type === 'age') {
            const ageValue = value || { years: '', months: '', days: '' };
            const handleAgeChange = (field, val) => {
                handleInputChange(question.id, { ...ageValue, [field]: val });
            };

            return (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Years</label>
                        <input
                            type="number"
                            className="form-input"
                            value={ageValue.years}
                            onChange={(e) => handleAgeChange('years', e.target.value)}
                            placeholder="0"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Months</label>
                        <input
                            type="number"
                            className="form-input"
                            value={ageValue.months}
                            onChange={(e) => handleAgeChange('months', e.target.value)}
                            placeholder="0"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Days</label>
                        <input
                            type="number"
                            className="form-input"
                            value={ageValue.days}
                            onChange={(e) => handleAgeChange('days', e.target.value)}
                            placeholder="0"
                        />
                    </div>
                </div>
            );
        }

        if (question.type === 'select') {
            return (
                <select
                    id={question.id}
                    className="form-select"
                    value={value}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    required={question.required}
                >
                    <option value="">Select {question.label}</option>
                    {question.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        }

        if (question.type === 'textarea') {
            return (
                <textarea
                    id={question.id}
                    className="form-textarea"
                    placeholder={question.placeholder}
                    value={value}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    required={question.required}
                />
            );
        }

        return (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type={question.type}
                    id={question.id}
                    className="form-input"
                    placeholder={question.placeholder}
                    value={value}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    required={question.required}
                    style={{ flex: 1 }}
                />
                {question.unit && (
                    <span style={{
                        marginLeft: '0.75rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        minWidth: '50px'
                    }}>
                        {question.unit}
                    </span>
                )}
                {question.info && (
                    <small style={{ position: 'absolute', bottom: '-1.25rem', left: 0, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        {question.info}
                    </small>
                )}
            </div>
        );
    };

    const renderReviewSection = (section, title) => {
        const data = currentPatientForm[section];
        if (!data || Object.keys(data).length === 0) return null;

        return (
            <div className="mb-4">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary-light)' }}>
                    {title}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {Object.entries(data)
                        .filter(([key]) => {
                            if (section === 'miscellaneous' && key !== 'evaluationDone') {
                                return data.evaluationDone === 'Yes';
                            }
                            return true;
                        })
                        .map(([key, value]) => {
                            const allQuestions = [...personalDetailsQuestions, ...healthDetailsQuestions, ...backgroundDetailsQuestions, ...biochemicalEvaluationQuestions];
                            const question = allQuestions.find(q => q.id === key);
                            const unit = question?.unit ? ` ${question.unit}` : '';

                            return (
                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                    <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                                        {question?.label || key.replace(/([A-Z])/g, ' $1').trim()}:
                                    </span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                        {typeof value === 'object' && value !== null
                                            ? `${value.years || 0}y ${value.months || 0}m ${value.days || 0}d`
                                            : `${value || 'N/A'}${value ? unit : ''}`}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    };

    if (showReview) {
        return (
            <div>
                <div className="container" style={{ paddingTop: '2rem', maxWidth: '900px' }}>
                    <div className="glass-card">
                        <div className="flex-between mb-4">
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Review Patient Information</h2>
                            <button onClick={() => setShowReview(false)} className="btn btn-secondary">
                                Back to Form
                            </button>
                        </div>

                        {renderReviewSection('personalDetails', 'Patients Identification')}
                        {renderReviewSection('healthDetails', 'Health Details')}
                        {renderReviewSection('backgroundDetails', 'Background Details')}
                        {renderReviewSection('miscellaneous', 'Biochemical Evaluation')}

                        <div className="flex gap-2 mt-4">
                            <button onClick={handleAddPatient} className="btn btn-success" style={{ flex: 1 }}>
                                Add Patient
                            </button>
                            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="container" style={{ paddingTop: '2rem', maxWidth: '900px' }}>
                <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700' }}>
                    Add New Patient
                </h1>

                {/* Progress Stepper */}
                <div className="progress-stepper">
                    {STEPS.map((step) => (
                        <div
                            key={step.id}
                            className={`step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                            onClick={() => handleStepClick(step.id)}
                        >
                            <div className="step-circle">{step.id}</div>
                            <div className="step-label">{step.name}</div>
                        </div>
                    ))}
                </div>

                {/* Save Message */}
                {saveMessage && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid var(--secondary-color)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        color: 'var(--secondary-color)'
                    }}>
                        {saveMessage}
                    </div>
                )}

                {/* Form */}
                <div className="glass-card">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                        {currentStep === 1 ? 'Patients Identification' : currentStep === 4 ? 'Biochemical Evaluation' : `${currentStepData.name} Details`}
                    </h2>

                    <form>
                        {currentStepData.questions
                            .filter(q => {
                                if (currentStep === 4 && q.id !== 'evaluationDone') {
                                    return formData.evaluationDone === 'Yes';
                                }
                                return true;
                            })
                            .map((question) => (
                                <div key={question.id} className="form-group">
                                    <label htmlFor={question.id} className="form-label">
                                        {question.label} {question.required && <span style={{ color: 'var(--danger-color)' }}>*</span>}
                                    </label>
                                    {renderQuestion(question)}
                                </div>
                            ))}
                    </form>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4" style={{ flexWrap: 'wrap' }}>
                        <button onClick={handleSave} className="btn btn-secondary">
                            💾 Save Progress
                        </button>
                        <button onClick={handleReview} className="btn btn-secondary">
                            👁️ Review All
                        </button>
                        <div style={{ flex: 1 }}></div>
                        {currentStep > 1 && (
                            <button onClick={handlePrevious} className="btn btn-secondary">
                                ← Previous
                            </button>
                        )}
                        {currentStep < STEPS.length ? (
                            <button onClick={handleNext} className="btn btn-primary">
                                Next →
                            </button>
                        ) : (
                            <button onClick={handleAddPatient} className="btn btn-success">
                                ✓ Add Patient
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPatient;
