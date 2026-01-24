export const healthDetailsQuestions = [
    {
        id: 'cancerType',
        label: 'Cancer Type',
        type: 'select',
        options: [
            'Lung Cancer',
            'Breast Cancer',
            'Prostate Cancer',
            'Colorectal Cancer',
            'Skin Cancer',
            'Leukemia',
            'Lymphoma',
            'Pancreatic Cancer',
            'Liver Cancer',
            'Other'
        ],
        required: true
    },
    {
        id: 'stage',
        label: 'Cancer Stage',
        type: 'select',
        options: ['Stage 0', 'Stage I', 'Stage II', 'Stage III', 'Stage IV'],
        required: true
    },
    {
        id: 'diagnosisDate',
        label: 'Diagnosis Date',
        type: 'date',
        required: true
    },
    {
        id: 'currentTreatment',
        label: 'Current Treatment',
        type: 'select',
        options: [
            'Chemotherapy',
            'Radiation Therapy',
            'Surgery',
            'Immunotherapy',
            'Targeted Therapy',
            'Hormone Therapy',
            'Combination Therapy',
            'None'
        ],
        required: true
    },
    {
        id: 'allergies',
        label: 'Known Allergies',
        type: 'textarea',
        placeholder: 'List any known allergies',
        required: false
    },
    {
        id: 'medications',
        label: 'Current Medications',
        type: 'textarea',
        placeholder: 'List all current medications',
        required: false
    }
];
