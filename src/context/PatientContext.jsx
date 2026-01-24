import { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const usePatients = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatients must be used within a PatientProvider');
    }
    return context;
};

export const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState([
        {
            id: 1,
            personalDetails: {
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: '1980-05-15',
                gender: 'Male',
                email: 'john.doe@email.com',
                phone: '+1234567890',
                address: '123 Main St, City, State 12345'
            },
            healthDetails: {
                cancerType: 'Lung Cancer',
                stage: 'Stage II',
                diagnosisDate: '2023-06-10',
                currentTreatment: 'Chemotherapy',
                allergies: 'Penicillin',
                medications: 'Carboplatin, Paclitaxel'
            },
            backgroundDetails: {
                smokingHistory: 'Former smoker',
                alcoholConsumption: 'Occasional',
                familyHistory: 'Mother had breast cancer',
                occupation: 'Engineer',
                insuranceProvider: 'HealthCare Plus',
                insuranceNumber: 'HC123456789'
            },
            miscellaneous: {
                emergencyContact: 'Jane Doe - Wife',
                emergencyPhone: '+1234567891',
                preferredLanguage: 'English',
                notes: 'Patient is responding well to treatment'
            }
        }
    ]);

    const [currentPatientForm, setCurrentPatientForm] = useState({
        personalDetails: {},
        healthDetails: {},
        backgroundDetails: {},
        miscellaneous: {}
    });

    const addPatient = (patientData) => {
        const newPatient = {
            id: patients.length + 1,
            ...patientData
        };
        setPatients([...patients, newPatient]);
        resetForm();
    };

    const updatePatient = (id, patientData) => {
        setPatients(patients.map(p => p.id === id ? { ...p, ...patientData } : p));
    };

    const saveFormProgress = (section, data) => {
        setCurrentPatientForm(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    const resetForm = () => {
        setCurrentPatientForm({
            personalDetails: {},
            healthDetails: {},
            backgroundDetails: {},
            miscellaneous: {}
        });
    };

    return (
        <PatientContext.Provider
            value={{
                patients,
                currentPatientForm,
                addPatient,
                updatePatient,
                saveFormProgress,
                resetForm
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};
