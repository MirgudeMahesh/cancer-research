import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hospitalName: '',
        societies: [],
        otherSociety: '',
        country: '',
        city: '',
        title: '',
        firstName: '',
        lastName: '',
        consent: false,
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const societiesOptions = [
        "American Society for Parenteral and Enteral Nutrition (ASPEN)",
        "European Society for Clinical Nutrition and Metabolism (ESPEN)",
        "Parenteral and Enteral Nutrition Society of Asia (PENSA)",
        "Federación Latinoamericana de Nutrición Parenteral y Enteral (FELANPE)",
        "Indian Society for Parenteral and Enteral Nutrition (ISPEN)",
        "Indian Association for Parenteral and Enteral Nutrition (IAPEN)",
        "Middle Eastern Alliance for Parenteral and Enteral Nutrition (MEAPEN)",
        "No Membership",
        "Other"
    ];

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
        "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
        "Oman",
        "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
        "Qatar",
        "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
        "Yemen",
        "Zambia", "Zimbabwe"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'consent') {
                setFormData(prev => ({ ...prev, consent: checked }));
            } else {
                const updatedSocieties = checked
                    ? [...formData.societies, value]
                    : formData.societies.filter(s => s !== value);
                setFormData(prev => ({ ...prev, societies: updatedSocieties }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.hospitalName) newErrors.hospitalName = 'Hospital Name is required';
        if (formData.societies.length === 0) newErrors.societies = 'Please select at least one option';
        if (formData.societies.includes('Other') && !formData.otherSociety) newErrors.otherSociety = 'Please specify other society';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.consent) newErrors.consent = 'You must agree to the terms';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (validate()) {
            setIsSubmitting(true);
            try {
                const response = await fetch('https://cancer-research-backend-1.onrender.com/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful! Please wait for admin approval.');
                    navigate('/login');
                } else {
                    alert(data.message || 'Registration failed. Please try again.');
                    if (data.message && data.message.includes('Email')) {
                        setErrors({ email: data.message });
                    }
                    setIsSubmitting(false);
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Connection error. Please ensure the backend is running.');
                setIsSubmitting(false);
            }
        } else {
            const firstError = document.querySelector('.form-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'var(--bg-secondary)' }}>

                <div style={{ padding: '2rem 2rem 0 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                    <img
                        src="/cancer-research-thumbnail.jpg"
                        alt="Logo"
                        style={{ height: '80px', objectFit: 'contain' }}
                    />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                        Registration Form For Global Collaborative Research on Cancer Nutrition
                    </h1>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
                    {/* 1st Question: Hospital Name */}
                    <div className="form-group">
                        <label className="form-label">Name of the Hospital <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                        <input
                            type="text"
                            name="hospitalName"
                            className="form-input"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            placeholder="Enter hospital name"
                        />
                        {errors.hospitalName && <div className="form-error">{errors.hospitalName}</div>}
                    </div>

                    {/* 2nd Question: Societies */}
                    <div className="form-group">
                        <label className="form-label">Are you a member of any of the following clinical nutrition societies? <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                            {societiesOptions.map((opt, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <input
                                        type="checkbox"
                                        id={`society-${index}`}
                                        value={opt}
                                        checked={formData.societies.includes(opt)}
                                        onChange={handleChange}
                                        style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <label htmlFor={`society-${index}`} style={{ fontSize: '0.95rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                        {opt}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formData.societies.includes('Other') && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="otherSociety"
                                    className="form-input"
                                    placeholder="Please specify other society"
                                    value={formData.otherSociety}
                                    onChange={handleChange}
                                />
                                {errors.otherSociety && <div className="form-error">{errors.otherSociety}</div>}
                            </div>
                        )}
                        {errors.societies && <div className="form-error">{errors.societies}</div>}
                    </div>

                    {/* 3rd Question: Country */}
                    <div className="form-group">
                        <label className="form-label">Country <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                        <select
                            name="country"
                            className="form-select"
                            value={formData.country}
                            onChange={handleChange}
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {errors.country && <div className="form-error">{errors.country}</div>}
                    </div>

                    {/* 4th Question: City */}
                    <div className="form-group">
                        <label className="form-label">City <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                        <input
                            type="text"
                            name="city"
                            className="form-input"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                        />
                        {errors.city && <div className="form-error">{errors.city}</div>}
                    </div>

                    {/* 5th Question: Dietitian Name */}
                    <div className="form-group">
                        <label className="form-label">Name of Clinical Dietitian/Registered Dietitian/Clinical Nutritionist <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: '1rem' }}>
                            <div>
                                <select name="title" className="form-select" value={formData.title} onChange={handleChange}>
                                    <option value="">Title</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Dt">Dt</option>
                                </select>
                                {errors.title && <div className="form-error">{errors.title}</div>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-input"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-input"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                            </div>
                        </div>
                    </div>

                    {/* 6th Question: Consent */}
                    <div className="form-group" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <input
                                type="checkbox"
                                name="consent"
                                id="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <label htmlFor="consent" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                <strong style={{ color: 'var(--text-primary)' }}>By registering to this Research *</strong><br />
                                1) I confirm that I have the requisite authority to share the data being provided for this database on cancer nutrition.<br />
                                2) I permit the data to be used for research work.<br />
                                3) I give the consent to use my name in the publication.
                            </label>
                        </div>
                        {errors.consent && <div className="form-error">{errors.consent}</div>}
                    </div>

                    {/* 7th Question: Phone */}
                    <div className="form-group">
                        <label className="form-label">Phone Number (with country code) <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                        <input
                            type="text"
                            name="phone"
                            className="form-input"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                        />
                        {errors.phone && <div className="form-error">{errors.phone}</div>}
                    </div>

                    {/* 8th Question: Email */}
                    <div className="form-group">
                        <label className="form-label">Email <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                        />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>

                    {/* 9th & 10th Question: Password */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Set Password <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '4px'
                                    }}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <div className="form-error">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Re-enter Password <span style={{ color: 'var(--danger-color)' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="form-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '4px'
                                    }}
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Submit Registration'}
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Already Registered? <span
                                onClick={() => navigate('/login')}
                                style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Login here
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
