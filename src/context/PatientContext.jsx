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
        id: null,
        status: 'completed',
        data: {}, // Flat object containing all patient fields
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
                const jsonColumns = ['monitoringDays', 'performanceStatusScale', 'nutritionPlanned', 'dieteticAssessmentType', 'enteralNutritionType', 'nutritionalRiskTool', 'chronologicalAge', 'glimCriteria'];
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

    const addPatient = async (patientFormData, status = 'completed') => {
        if (!currentUser?.id) return { success: false, message: 'Not authenticated' };

        // Use the flat data object as the primary source of truth.
        // It should contain all fields from all sections.
        const flattenedData = {
            ...patientFormData.data,
            doctor_id: currentUser.id,
            status: status
        };

        const isUpdate = patientFormData.id !== null && patientFormData.id !== undefined;
        const url = isUpdate ? `${API_BASE_URL}/patients/${patientFormData.id}` : `${API_BASE_URL}/patients`;
        const method = isUpdate ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flattenedData),
            });

            const data = await response.json();
            if (data.success) {
                await fetchPatients(); // Refresh list
                resetForm();
                return {
                    success: true,
                    patientId: isUpdate ? patientFormData.id : data.patientId
                };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error saving patient:', error);
            return { success: false, message: 'Server connection failed' };
        }
    };


    const saveFormProgress = (section, data) => {
        setCurrentPatientForm(prev => {
            const updatedData = { ...prev.data, ...data };
            return {
                ...prev,
                data: updatedData,
                [section]: { ...prev[section], ...data }
            };
        });
    };


    const resetForm = () => {
        setCurrentPatientForm({
            id: null,
            status: 'completed',
            data: {},
            personalDetails: {},
            healthDetails: {},
            backgroundDetails: {},
            nutritionIntervention: {},
            anthropometric: {},
            miscellaneous: {},
            nutritionMonitoring: {}
        });
    };


    const editPatient = (patient) => {
        // We need to map the flat patient object back to the multi-section structure
        const sectionedData = {
            id: patient.id,
            status: patient.status || 'completed',
            data: { ...patient },
            personalDetails: { ...patient },
            healthDetails: { ...patient },
            backgroundDetails: { ...patient },
            nutritionIntervention: { ...patient },
            anthropometric: { ...patient },
            miscellaneous: { ...patient },
            nutritionMonitoring: { ...patient }
        };

        // Sections populated above

        setCurrentPatientForm(sectionedData);
    };


    return (
        <PatientContext.Provider
            value={{
                patients,
                currentPatientForm,
                addPatient,
                saveFormProgress,
                resetForm,
                editPatient,
                isLoading,
                refreshPatients: fetchPatients

            }}
        >
            {children}
        </PatientContext.Provider>
    );
};
