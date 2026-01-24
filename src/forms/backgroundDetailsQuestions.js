export const backgroundDetailsQuestions = [
    {
        id: 'smokingHistory',
        label: 'Smoking History',
        type: 'select',
        options: ['Never smoked', 'Former smoker', 'Current smoker'],
        required: true
    },
    {
        id: 'alcoholConsumption',
        label: 'Alcohol Consumption',
        type: 'select',
        options: ['None', 'Occasional', 'Moderate', 'Heavy'],
        required: true
    },
    {
        id: 'familyHistory',
        label: 'Family Medical History',
        type: 'textarea',
        placeholder: 'Describe any relevant family medical history',
        required: false
    },
    {
        id: 'occupation',
        label: 'Occupation',
        type: 'text',
        placeholder: 'Current or previous occupation',
        required: false
    },
    {
        id: 'insuranceProvider',
        label: 'Insurance Provider',
        type: 'text',
        placeholder: 'Name of insurance company',
        required: true
    },
    {
        id: 'insuranceNumber',
        label: 'Insurance Number',
        type: 'text',
        placeholder: 'Insurance policy number',
        required: true
    }
];
