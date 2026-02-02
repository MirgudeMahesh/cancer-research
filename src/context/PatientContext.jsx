import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PatientContext = createContext();

export const usePatients = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatients must be used within a PatientProvider');
    }
    return context;
};

const API_BASE_URL = 'https://cancer-research-backend-1.onrender.com/api';

export const PatientProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPatientForm, setCurrentPatientForm] = useState({
        personalDetails: {},
        healthDetails: {},
        backgroundDetails: {},
        nutritionIntervention: {},
        anthropometric: {},
        miscellaneous: {},
        nutritionMonitoring: {}
    });

    // Fetch patients when doctor logs in
    useEffect(() => {
        if (currentUser && currentUser.id) {
            fetchPatients();
        } else {
            setPatients([]);
        }
    }, [currentUser]);

    const fetchPatients = async () => {
        if (!currentUser?.id) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/patients/doctor/${currentUser.id}`);
            const data = await response.json();
            if (data.success) {
                // Parse JSON columns back into objects/arrays
                const jsonColumns = ['monitoringDays', 'performanceStatusScale', 'nutritionPlanned', 'dieteticAssessmentType', 'enteralNutritionType', 'nutritionalRiskTool'];
                const parsedPatients = data.patients.map(patient => {
                    const parsed = { ...patient };
                    jsonColumns.forEach(col => {
                        if (parsed[col] && typeof parsed[col] === 'string') {
                            try {
                                parsed[col] = JSON.parse(parsed[col]);
                            } catch (e) {
                                console.warn(`Failed to parse ${col} for patient ${patient.id}`);
                            }
                        }
                    });
                    return parsed;
                });
                setPatients(parsedPatients);
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addPatient = async (patientFormData) => {
        if (!currentUser?.id) return { success: false, message: 'Not authenticated' };

        // Flatten the multi-section form data into a single object for the API
        const flattenedData = {
            doctor_id: currentUser.id,
            ...patientFormData.personalDetails,
            ...patientFormData.healthDetails,
            ...patientFormData.backgroundDetails,
            ...patientFormData.nutritionIntervention,
            ...patientFormData.anthropometric,
            ...patientFormData.miscellaneous,
            ...patientFormData.nutritionMonitoring
        };

        try {
            const response = await fetch(`${API_BASE_URL}/patients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flattenedData),
            });

            const data = await response.json();
            if (data.success) {
                await fetchPatients(); // Refresh list
                resetForm();
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error adding patient:', error);
            return { success: false, message: 'Server connection failed' };
        }
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
            nutritionIntervention: {},
            anthropometric: {},
            miscellaneous: {},
            nutritionMonitoring: {}
        });
    };

    return (
        <PatientContext.Provider
            value={{
                patients,
                currentPatientForm,
                addPatient,
                saveFormProgress,
                resetForm,
                isLoading,
                refreshPatients: fetchPatients
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};
