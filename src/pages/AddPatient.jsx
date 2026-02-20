import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientContext';
import { personalDetailsQuestions } from '../forms/personalDetailsQuestions';
import { healthDetailsQuestions } from '../forms/healthDetailsQuestions';
import { backgroundDetailsQuestions } from '../forms/backgroundDetailsQuestions';
import { nutritionInterventionQuestions } from '../forms/nutritionInterventionQuestions';
import { biochemicalEvaluationQuestions } from '../forms/biochemicalEvaluationQuestions';
import { nutritionMonitoringQuestions } from '../forms/nutritionMonitoringQuestions';

const STEPS = [
    { id: 1, name: 'Personal', section: 'personalDetails', questions: personalDetailsQuestions },
    { id: 2, name: 'History', section: 'healthDetails', questions: healthDetailsQuestions },
    { id: 3, name: 'Assessment', section: 'backgroundDetails', questions: backgroundDetailsQuestions },
    { id: 4, name: 'Intervention', section: 'nutritionIntervention', questions: nutritionInterventionQuestions },
    { id: 5, name: 'Evaluation', section: 'miscellaneous', questions: biochemicalEvaluationQuestions },
    { id: 6, name: 'Monitoring', section: 'nutritionMonitoring', questions: nutritionMonitoringQuestions }
];






//calculate age
const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonthDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();
        days += prevMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        years: years >= 0 ? years : 0,
        months: months >= 0 ? months : 0,
        days: days >= 0 ? days : 0
    };
};

// calculate dob from age
const calculateDobFromAge = (age) => {
    if (!age || (!age.years && !age.months && !age.days)) return '';

    const today = new Date();
    const dob = new Date(today);

    dob.setFullYear(today.getFullYear() - (parseInt(age.years) || 0));
    dob.setMonth(today.getMonth() - (parseInt(age.months) || 0));
    dob.setDate(today.getDate() - (parseInt(age.days) || 0));

    return dob.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};



function AddPatient() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { currentPatientForm, saveFormProgress, addPatient, resetForm } = usePatients();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(currentPatientForm.data || {});
    const [showReview, setShowReview] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [touchedFields, setTouchedFields] = useState({});
    const [submittingAction, setSubmittingAction] = useState(null); // 'save', 'draft', or 'add'

    // Scroll to top on step change or review toggle
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep, showReview]);

    // Sync local formData with context state when context updates (resuming or global sync)
    useEffect(() => {
        setFormData(currentPatientForm.data || {});
    }, [currentPatientForm.data]);

    const currentStepData = STEPS.find(s => s.id === currentStep);

    const handleInputChange = (questionId, value) => {
        // Prevent future dates
        const question = [...personalDetailsQuestions, ...healthDetailsQuestions, ...backgroundDetailsQuestions, ...nutritionInterventionQuestions, ...biochemicalEvaluationQuestions, ...nutritionMonitoringQuestions].find(q => q.id === questionId);

        if (question?.type === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Compare dates only

            if (selectedDate > today) {
                alert('Future dates are not allowed.');
                return;
            }
        }

        let updatedData = {
            ...formData,
            [questionId]: value
        };

        // Auto-calculate chronological age from Date of Birth
        if (questionId === 'dateOfBirth' && value) {
            const age = calculateAge(value);
            updatedData.chronologicalAge = age;
        }

        // Auto-calculate Date of Birth from Chronological Age
        if (questionId === 'chronologicalAge' && value) {
            const dob = calculateDobFromAge(value);
            if (dob) {
                updatedData.dateOfBirth = dob;
            }
        }
        // Auto-calculate hospital stay length if discharge date or mortality status changes
        if ((questionId === 'hospitalDischargeDate' && value) || (questionId === 'mortality' && value === 'Yes')) {
            const admissionDateStr = { ...currentPatientForm.data, ...updatedData }.dateOfAdmission;
            const targetDateStr = questionId === 'hospitalDischargeDate' ? value : updatedData.dateOfDeath;

            if (admissionDateStr && targetDateStr) {
                const start = new Date(admissionDateStr);
                const end = new Date(targetDateStr);
                if (!isNaN(start) && !isNaN(end)) {
                    if (end < start) {
                        updatedData.hospitalStayLength = '';
                    } else {
                        const diffTime = end - start;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        updatedData.hospitalStayLength = diffDays;
                    }
                }
            } else if (questionId === 'mortality' && value === 'Yes') {
                updatedData.hospitalStayLength = ''; // Reset if dying but no date yet
            }
        }

        if (questionId === 'dateOfDeath' && value) {
            const admissionDateStr = { ...currentPatientForm.data, ...updatedData }.dateOfAdmission;
            if (admissionDateStr) {
                const start = new Date(admissionDateStr);
                const end = new Date(value);
                if (!isNaN(start) && !isNaN(end)) {
                    if (end < start) {
                        updatedData.hospitalStayLength = '';
                    } else {
                        const diffTime = end - start;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        updatedData.hospitalStayLength = diffDays;
                    }
                }
            }
        }

        // BMI calculation
        if (questionId === 'height' || questionId === 'hosp_currentWeight') {
            const height = questionId === 'height' ? value : updatedData.height;
            const hospWeight = questionId === 'hosp_currentWeight' ? value : updatedData.hosp_currentWeight;

            if (height && height > 0) {
                if (hospWeight) updatedData.hosp_bmi = (hospWeight / ((height / 100) * (height / 100))).toFixed(1);
            }
        }

        setFormData(updatedData);
        // Clear touched state when user types
        if (touchedFields[questionId]) {
            setTouchedFields(prev => ({ ...prev, [questionId]: false }));
        }
    };

    const handleSave = () => {
        if (submittingAction) return;
        setSubmittingAction('save');
        saveFormProgress(currentStepData.section, formData);
        setSaveMessage('Progress saved successfully!');
        setTimeout(() => {
            setSaveMessage('');
            setSubmittingAction(null);
        }, 2000);
    };

    const getMissingFields = (stepId) => {
        const step = STEPS.find(s => s.id === stepId);
        if (!step) return [];

        const data = stepId === currentStep ? formData : (currentPatientForm[step.section] || {});

        return step.questions
            .filter(q => {
                if (q.showIf) return q.showIf(data);
                return true;
            })
            .filter(q => {
                if (!q.required) return false;
                const val = data[q.id];
                if (q.type === 'age') {
                    return !(val && (val.years || val.months || val.days));
                }
                if (q.type === 'checkbox-group') {
                    return !(Array.isArray(val) && val.length > 0);
                }
                if (typeof val === 'string') return val.trim() === '';
                if (q.type === 'number') return val === undefined || val === null || val === '';
                if (q.type === 'dynamic-days') {
                    const days = val || [{ energy: '', protein: '' }];
                    return days.some(d => !d.energy || !d.protein);
                }
                return !val;
            });
    };

    const validateStep = (id) => {
        return getMissingFields(id).length === 0;
    };

    const canAccessStep = (targetStepId) => {
        // We can always go to the first step or go backwards
        if (targetStepId <= currentStep) return true;

        // To go to targetStepId, all steps from 1 to targetStepId - 1 must be valid
        for (let i = 1; i < targetStepId; i++) {
            if (!validateStep(i)) return false;
        }
        return true;
    };

    const handleNext = () => {
        if (submittingAction) return;

        // Custom validation for Medical History step
        if (currentStep === 2) {
            const data = { ...currentPatientForm.data, ...formData };
            if (data.dateOfBirth && data.initialCancerDiagnosis) {
                if (new Date(data.initialCancerDiagnosis) <= new Date(data.dateOfBirth)) {
                    alert('Initial Cancer Diagnosis must be after Date of Birth.');
                    return;
                }
            }
            if (data.dateOfBirth && data.firstCancerTherapy) {
                if (new Date(data.firstCancerTherapy) <= new Date(data.dateOfBirth)) {
                    alert('First Cancer Therapy Initiated must be after Date of Birth.');
                    return;
                }
            }
            if (data.initialCancerDiagnosis && data.firstCancerTherapy) {
                if (new Date(data.firstCancerTherapy) <= new Date(data.initialCancerDiagnosis)) {
                    alert('First Cancer Therapy Initiated must be after Initial Cancer Diagnosis.');
                    return;
                }
            }
        }

        const missing = getMissingFields(currentStep);
        if (missing.length > 0) {
            // Mark all current fields as touched to show red highlights
            const newTouched = {};
            currentStepData.questions.forEach(q => newTouched[q.id] = true);
            setTouchedFields(newTouched);

            // Scroll to first invalid field
            setTimeout(() => {
                const element = document.getElementById(`field-group-${missing[0].id}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return;
        }

        saveFormProgress(currentStepData.section, formData);
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
            setTouchedFields({}); // Reset touched for next page
        }
    };


    const handlePrevious = () => {
        if (submittingAction) return;
        saveFormProgress(currentStepData.section, formData);
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            setTouchedFields({});
        }
    };


    const handleStepClick = (stepId) => {
        if (!canAccessStep(stepId)) {
            return;
        }

        saveFormProgress(currentStepData.section, formData);
        setCurrentStep(stepId);
        setTouchedFields({});
    };


    const handleReview = () => {
        if (submittingAction) return;
        // Save current step progress before showing review
        saveFormProgress(currentStepData.section, formData);
        setShowReview(true);
    };

    const handleAddPatient = async (finalData = currentPatientForm) => {
        setSubmittingAction('add');
        try {
            const result = await addPatient(finalData);
            if (result.success) {
                alert(finalData.id ? 'Patient updated successfully!' : 'Patient added successfully!');
                navigate('/dashboard');
            } else {
                alert('Error adding/updating patient: ' + (result.message || 'Unknown error'));
                setSubmittingAction(null);
            }
        } catch (error) {
            console.error('Error in handleAddPatient:', error);
            alert('An unexpected error occurred.');
            setSubmittingAction(null);
        }
    };


    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderQuestion = (question) => {
        const value = formData[question.id] || '';

        const renderImage = () => {
            if (!question.image) return null;
            return (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <img
                        src={`/src/images/${question.image}`}
                        alt={question.label}
                        style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            );
        };

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
                            onWheel={(e) => e.target.blur()}
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
                            onWheel={(e) => e.target.blur()}
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
                            onWheel={(e) => e.target.blur()}
                            placeholder="0"
                        />
                    </div>
                </div>
            );
        }

        if (question.type === 'select') {
            return (
                <div>
                    <select
                        id={question.id}
                        className="form-select"
                        value={value}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                    >
                        <option value="">Select {question.label}</option>
                        {(() => {
                            const options = typeof question.options === 'function'
                                ? question.options(formData)
                                : question.options;

                            if (question.groups) {
                                return question.groups.map(group => (
                                    <optgroup key={group.label} label={group.label}>
                                        {group.options.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </optgroup>
                                ));
                            }

                            return options?.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ));
                        })()}
                    </select>
                    {renderImage()}
                </div>
            );
        }

        if (question.type === 'checkbox-group') {
            const selectedValues = Array.isArray(value) ? value : [];
            const handleCheckboxChange = (optionValue) => {
                const newValue = selectedValues.includes(optionValue)
                    ? selectedValues.filter(v => v !== optionValue)
                    : [...selectedValues, optionValue];
                handleInputChange(question.id, newValue);
            };

            return (
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
                    {question.options.map(option => (
                        <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            );
        }

        if (question.type === 'radio-group') {
            return (
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
                    {question.options.map(option => (
                        <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                            <input
                                type="radio"
                                name={question.id}
                                checked={value === option}
                                onChange={() => handleInputChange(question.id, option)}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            );
        }

        if (question.type === 'range') {
            return (
                <div style={{ paddingTop: '1rem' }}>
                    <input
                        type="range"
                        id={question.id}
                        min={question.min || 0}
                        max={question.max || 100}
                        step={question.step || 10}
                        value={value || 0}
                        onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer', height: '6px', appearance: 'none', background: '#e2e8f0', borderRadius: '3px', outline: 'none' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        <span>{question.minLabel || question.min || 0}</span>
                        <span style={{ fontWeight: '700', color: 'var(--primary-color)', fontSize: '1rem' }}>{value || 0}</span>
                        <span>{question.maxLabel || question.max || 100}</span>
                    </div>
                </div>
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

        if (question.type === 'dynamic-days') {
            const days = value || [{ date: '', energy: '', protein: '' }];
            const updateDay = (index, field, val) => {
                const newDays = [...days];

                // Date Validation: Ensure 2nd date is after 1st, etc.
                if (field === 'date' && index > 0) {
                    const prevDate = new Date(newDays[index - 1].date);
                    const currDate = new Date(val);
                    if (prevDate && currDate <= prevDate) {
                        alert('Date must be after the previous day\'s date');
                        return; // Don't update if invalid
                    }
                }
                // Reverse validation: if modifying a previous date, check if it conflicts with next
                if (field === 'date' && index < newDays.length - 1) {
                    const nextDateStr = newDays[index + 1].date;
                    if (nextDateStr) {
                        const nextDate = new Date(nextDateStr);
                        const currDate = new Date(val);
                        if (currDate >= nextDate) {
                            alert('Date must be before the next day\'s date');
                            return;
                        }
                    }
                }

                newDays[index] = { ...newDays[index], [field]: val };
                handleInputChange(question.id, newDays);
            };
            const addDay = () => {
                handleInputChange(question.id, [...days, { date: '', energy: '', protein: '' }]);
            };
            const removeDay = (index) => {
                if (days.length > 1) {
                    const newDays = days.filter((_, i) => i !== index);
                    handleInputChange(question.id, newDays);
                }
            };

            return (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {days.map((day, index) => (
                        <div key={index} style={{
                            padding: '1.25rem',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #e2e8f0',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label className="form-label" style={{ marginBottom: '0.25rem', display: 'block', color: 'var(--primary-color)', fontWeight: '600' }}>
                                        Date for Day {index + 1}
                                    </label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={day.date || ''}
                                        onChange={(e) => updateDay(index, 'date', e.target.value)}
                                        max={new Date().toISOString().split('T')[0]} // Prevent future dates? User didn't specify, but good practice.
                                        required
                                        style={{ maxWidth: '200px' }}
                                    />
                                </div>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDay(index)}
                                        style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', fontSize: '1.25rem', padding: '0.5rem' }}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Total Energy Met (%)</label>
                                    <select
                                        className="form-select"
                                        value={day.energy}
                                        onChange={(e) => updateDay(index, 'energy', e.target.value)}
                                    >
                                        <option value="">Select %</option>
                                        <option value="30%">30%</option>
                                        <option value="50%">50%</option>
                                        <option value="75%">75%</option>
                                        <option value="100%">100%</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Total Protein Met (%)</label>
                                    <select
                                        className="form-select"
                                        value={day.protein}
                                        onChange={(e) => updateDay(index, 'protein', e.target.value)}
                                    >
                                        <option value="">Select %</option>
                                        <option value="30%">30%</option>
                                        <option value="50%">50%</option>
                                        <option value="75%">75%</option>
                                        <option value="100%">100%</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDay}
                        className="btn btn-secondary"
                        style={{ alignSelf: 'start', padding: '0.5rem 1rem' }}
                    >
                        + Add Another Day
                    </button>
                </div>
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
                    onWheel={(e) => question.type === 'number' && e.target.blur()}
                    required={question.required}
                    readOnly={question.readOnly}
                    max={question.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                    style={{ flex: 1, backgroundColor: question.readOnly ? '#f8fafc' : 'white' }}
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

    const renderReviewSection = (sectionKey, title) => {
        const step = STEPS.find(s => s.section === sectionKey);
        const data = currentPatientForm.data;
        if (!step || !data || Object.keys(data).length === 0) return null;

        const sectionQuestions = step.questions;
        const sectionFields = data;

        return (
            <div className="mb-4">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary-light)' }}>
                    {title}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {sectionQuestions
                        .filter(q => {
                            if (q.type === 'heading') return false;
                            if (q.showIf) return q.showIf(data);
                            return data[q.id] !== undefined && data[q.id] !== null && data[q.id] !== '';
                        })
                        .map((question) => {
                            const key = question.id;
                            const value = data[key];
                            const unit = question.unit ? ` ${question.unit}` : '';

                            if (question.type === 'dynamic-days' && Array.isArray(value)) {
                                return (
                                    <div key={key} style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                                        <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{typeof question.label === 'function' ? question.label(data) : question.label}:</div>
                                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                                            {value.map((day, i) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                                                    <span style={{ fontSize: '0.85rem' }}>{day.date ? new Date(day.date).toLocaleDateString() : `Day ${i + 1}`}</span>
                                                    <span style={{ fontWeight: '500', fontSize: '0.85rem' }}>Energy: {day.energy} | Protein: {day.protein}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                    <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                                        {typeof question.label === 'function' ? question.label(data) : question.label}:
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
                            <button
                                onClick={() => !submittingAction && setShowReview(false)}
                                className="btn btn-secondary"
                                disabled={submittingAction !== null}
                                style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                            >
                                Back to Form
                            </button>
                        </div>

                        {renderReviewSection('personalDetails', 'Personal Details')}
                        {renderReviewSection('healthDetails', 'Medical History')}
                        {renderReviewSection('backgroundDetails', 'Anthropometric and Strength Evaluation')}
                        {renderReviewSection('nutritionIntervention', 'Nutrition Interventional Plans')}
                        {renderReviewSection('miscellaneous', 'Biochemical Evaluation')}
                        {renderReviewSection('nutritionMonitoring', 'Nutrition Monitoring')}

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => {
                                    if (submittingAction) return;
                                    // Final validation before actual adding
                                    const allData = currentPatientForm.data;
                                    if (allData.dateOfAdmission && allData.hospitalDischargeDate) {
                                        if (new Date(allData.hospitalDischargeDate) < new Date(allData.dateOfAdmission)) {
                                            alert('Hospital Discharge Date must be after Date of Admission.');
                                            return;
                                        }
                                    }
                                    if (allData.dateOfAdmission && allData.dateOfDeath) {
                                        if (new Date(allData.dateOfDeath) < new Date(allData.dateOfAdmission)) {
                                            alert('Date of Death must be after Date of Admission.');
                                            return;
                                        }
                                    }

                                    const firstInvalidStep = STEPS.find(step => getMissingFields(step.id).length > 0);

                                    if (!firstInvalidStep) {
                                        handleAddPatient(currentPatientForm);
                                    } else {

                                        // Redirect to the first invalid step and show highlights
                                        const missingFields = getMissingFields(firstInvalidStep.id);
                                        setCurrentStep(firstInvalidStep.id);
                                        setShowReview(false);
                                        // formData is automatically synced with currentPatientForm.data via useEffect

                                        const newTouched = {};
                                        firstInvalidStep.questions.forEach(q => newTouched[q.id] = true);
                                        setTouchedFields(newTouched);

                                        // Scroll after render
                                        setTimeout(() => {
                                            const element = document.getElementById(`field-group-${missingFields[0].id}`);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }, 100);
                                    }
                                }}
                                className="btn btn-success"
                                style={{ flex: 1, cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                                disabled={submittingAction !== null}
                            >
                                {submittingAction === 'add' ? '⌛ Adding...' : '✓ Finalize & Add Patient'}
                            </button>
                            <button
                                onClick={() => !submittingAction && setShowReview(false)}
                                className="btn btn-secondary"
                                disabled={submittingAction !== null}
                                style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                            >
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
                    {currentPatientForm.id ? 'Resume Patient Documentation' : 'Add New Patient'}
                </h1>


                {/* Progress Stepper */}
                <div className="progress-stepper">
                    {STEPS.map((step) => {
                        const isCurrent = step.id === currentStep;
                        const isCompleted = currentStep > step.id;
                        const isAccessible = canAccessStep(step.id);

                        return (
                            <div
                                key={step.id}
                                className={`step ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                onClick={() => !submittingAction && isAccessible && handleStepClick(step.id)}
                                style={{
                                    opacity: isAccessible ? 1 : 0.5,
                                    cursor: (isAccessible && !submittingAction) ? 'pointer' : 'not-allowed'
                                }}
                            >
                                <div className="step-circle">{step.id}</div>
                                <div className="step-label">{step.name}</div>
                            </div>
                        );
                    })}
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
                        {currentStep === 1 ? 'Personal Details' :
                            currentStep === 2 ? 'Medical History' :
                                currentStep === 3 ? 'Anthropometric and Strength Evaluation' :
                                    currentStep === 4 ? 'Nutrition Interventional Plans' :
                                        currentStep === 5 ? 'Biochemical Evaluation' :
                                            currentStep === 6 ? 'Nutrition Monitoring' :
                                                `${currentStepData.name} Details`}
                    </h2>

                    <form>
                        {currentStepData.questions
                            .filter(q => {
                                if (q.showIf) {
                                    return q.showIf(formData);
                                }
                                return true;
                            })
                            .map((question) => {
                                if (question.type === 'heading') {
                                    return (
                                        <h3 key={question.id} style={{
                                            fontSize: '1.25rem',
                                            fontWeight: '700',
                                            marginTop: '2rem',
                                            marginBottom: '1rem',
                                            color: 'var(--text-primary)',
                                            borderBottom: '1px solid #e2e8f0',
                                            paddingBottom: '0.5rem'
                                        }}>
                                            {typeof question.label === 'function' ? question.label(formData) : question.label}
                                        </h3>
                                    );
                                }

                                const isMissing = question.required && (
                                    question.type === 'age'
                                        ? !(formData[question.id] && (formData[question.id].years || formData[question.id].months || formData[question.id].days))
                                        : question.type === 'checkbox-group'
                                            ? !(Array.isArray(formData[question.id]) && formData[question.id].length > 0)
                                            : !formData[question.id] || (typeof formData[question.id] === 'string' && formData[question.id].trim() === '')
                                );
                                const showError = touchedFields[question.id] && isMissing;

                                return (
                                    <div
                                        key={question.id}
                                        id={`field-group-${question.id}`}
                                        className="form-group"
                                        style={showError ? { borderLeft: '3px solid var(--danger-color)', paddingLeft: '1rem', marginLeft: '-1.25rem', transition: 'all 0.3s ease' } : {}}
                                    >
                                        <label htmlFor={question.id} className="form-label" style={showError ? { color: 'var(--danger-color)' } : {}}>
                                            {typeof question.label === 'function' ? question.label(formData) : question.label} {question.required && <span style={{ color: 'var(--danger-color)' }}>*</span>}
                                        </label>
                                        <div className={showError ? 'field-error' : ''}>
                                            {renderQuestion(question)}
                                        </div>
                                        {showError && <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: '500' }}>This field is mandatory</p>}
                                    </div>
                                );
                            })}
                    </form>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4" style={{ flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="btn btn-secondary"
                                disabled={submittingAction !== null}
                                style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                            >
                                {submittingAction === 'save' ? '⌛ Saving...' : '💾 Save Progress'}
                            </button>
                            <button
                                onClick={async () => {
                                    if (submittingAction) return;
                                    setSubmittingAction('draft');
                                    try {
                                        saveFormProgress(currentStepData.section, formData);
                                        // We need to pass the updated form data because saveFormProgress is async-ish (state update)
                                        const updatedForm = {
                                            ...currentPatientForm,
                                            data: { ...currentPatientForm.data, ...formData },
                                            [currentStepData.section]: formData
                                        };
                                        const result = await addPatient(updatedForm, 'pending');
                                        if (result.success) {
                                            alert('Patient draft saved! You can complete it later.');
                                            navigate('/dashboard');
                                        } else {
                                            alert('Error saving draft: ' + result.message);
                                            setSubmittingAction(null);
                                        }
                                    } catch (error) {
                                        console.error('Error saving draft:', error);
                                        alert('An unexpected error occurred while saving draft.');
                                        setSubmittingAction(null);
                                    }
                                }}
                                className={`btn btn-warning ${submittingAction ? 'disabled' : ''}`}
                                disabled={submittingAction !== null}
                                style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                            >
                                {submittingAction === 'draft' ? '⌛ Saving...' : '📝 Save Draft'}
                            </button>



                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleReview}
                                className="btn btn-secondary"
                                disabled={submittingAction !== null}
                                style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                            >
                                👁️ Review All
                            </button>
                            {currentStep > 1 && (
                                <button
                                    onClick={handlePrevious}
                                    className="btn btn-secondary"
                                    disabled={submittingAction !== null}
                                    style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                                >
                                    ← Previous
                                </button>
                            )}
                            {currentStep < STEPS.length ? (
                                <button
                                    onClick={handleNext}
                                    className="btn btn-primary"
                                    disabled={submittingAction !== null}
                                    style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (submittingAction) return;
                                        const missing = getMissingFields(currentStep);
                                        if (missing.length > 0) {
                                            const newTouched = {};
                                            currentStepData.questions.forEach(q => newTouched[q.id] = true);
                                            setTouchedFields(newTouched);

                                            // Scroll to first invalid field
                                            setTimeout(() => {
                                                const element = document.getElementById(`field-group-${missing[0].id}`);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }
                                            }, 100);
                                            return;
                                        }

                                        const allData = { ...currentPatientForm.data, ...formData };
                                        if (allData.dateOfAdmission && allData.hospitalDischargeDate) {
                                            if (new Date(allData.hospitalDischargeDate) < new Date(allData.dateOfAdmission)) {
                                                alert('Hospital Discharge Date must be after Date of Admission.');
                                                return;
                                            }
                                        }
                                        if (allData.dateOfAdmission && allData.dateOfDeath) {
                                            if (new Date(allData.dateOfDeath) < new Date(allData.dateOfAdmission)) {
                                                alert('Date of Death must be after Date of Admission.');
                                                return;
                                            }
                                        }

                                        saveFormProgress(currentStepData.section, formData);
                                        const finalData = {
                                            ...currentPatientForm,
                                            data: { ...currentPatientForm.data, ...formData },
                                            [currentStepData.section]: formData
                                        };
                                        handleAddPatient(finalData);

                                    }}
                                    className="btn btn-success"
                                    disabled={submittingAction !== null}
                                    style={{ cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1 }}
                                >
                                    {submittingAction === 'add' ? '⌛ Adding...' : '✓ Add Patient'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPatient;
