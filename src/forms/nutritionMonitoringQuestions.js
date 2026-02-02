export const nutritionMonitoringQuestions = [
    {
        id: 'monitoringDays',
        type: 'dynamic-days',
        label: 'Daily Nutrition Monitoring',
        required: true
    },
    {
        id: 'refeedingSyndrome',
        label: 'Refeeding Syndrome',
        type: 'radio-group',
        options: ['Yes', 'No'],
        required: true
    },
    {
        id: 'mortality',
        label: 'Mortality (if occurred)',
        type: 'radio-group',
        options: ['Yes', 'No'],
        required: true
    },
    {
        id: 'dateOfDeath',
        label: 'Date of Death',
        type: 'date',
        required: true,
        showIf: (data) => data.mortality === 'Yes'
    },
    {
        id: 'hospitalDischargeDate',
        label: 'Hospital Discharge Date',
        type: 'date',
        required: true,
        showIf: (data) => data.mortality === 'No'
    },
    {
        id: 'hospitalStayLength',
        label: 'Length of Hospital Stay (Days)',
        type: 'number',
        placeholder: 'Autofilled',
        required: false,
        readOnly: true
    },
    {
        id: 'discontinueOncologyTreatment',
        label: 'Was there a need to discontinue Oncology treatment?',
        type: 'radio-group',
        options: ['Yes', 'No'],
        required: true
    },
    {
        id: 'discontinueReason',
        label: 'Reason for the discontinuation of the oncology treatment?',
        type: 'textarea',
        placeholder: 'Enter reason for discontinuation...',
        required: true,
        showIf: (data) => data.discontinueOncologyTreatment === 'Yes'
    }
];
