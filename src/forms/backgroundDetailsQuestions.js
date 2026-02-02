export const backgroundDetailsQuestions = [
    {
        id: 'dieteticAssessmentType',
        label: 'Type of Dietetic Assessment',
        type: 'checkbox-group',
        options: [
            'Nutrition input in the last 24 Hour',
            'Food Frequency Questionnaire',
            'Food Dairy',
            'Usual Diet Count'
        ],
        required: true
    },
    {
        id: 'dietType',
        label: 'Type of Diet',
        type: 'select',
        options: [
            'Normal',
            'Special',
            'Oral',
            'Enteral',
            'Parenteral'
        ],
        required: true
    },
    {
        id: 'specialDietType',
        label: 'Types of Special Diet',
        type: 'select',
        options: [
            'Vegetarian',
            'Non-Vegetarian',
            'Vegan',
            'Lacto Vegetarian',
            'Lacto-ovo-Vegetarian',
            'Ovo-Vegetarian',
            'Pescetarian',
            'Flexitarian'
        ],
        showIf: (data) => data.dietType === 'Special',
        required: true
    },
    {
        id: 'hospitalizationHeading',
        type: 'heading',
        label: 'At Hospitalization/ Pre Hospitalization'
    },
    {
        id: 'hospitalizationKcal',
        label: 'Kcal',
        type: 'number',
        placeholder: 'Enter Kcal',
        required: true
    },
    {
        id: 'hospitalizationProteins',
        label: 'Proteins',
        type: 'number',
        placeholder: 'Enter Proteins',
        unit: 'gms',
        required: true
    },
    {
        id: 'hospitalizationCarbohydrates',
        label: 'Carbohydrates',
        type: 'number',
        placeholder: 'Enter Carbohydrates',
        unit: 'gms',
        required: true
    },
    {
        id: 'hospitalizationFats',
        label: 'Fats',
        type: 'number',
        placeholder: 'Enter Fats',
        unit: 'gms',
        required: true
    },
    {
        id: 'hospitalizationFiber',
        label: 'Fiber',
        type: 'number',
        placeholder: 'Enter Fiber',
        unit: 'gms',
        required: true
    },
    {
        id: 'hospitalizationFluids',
        label: 'Fluids',
        type: 'number',
        placeholder: 'Enter Fluids',
        unit: 'ml',
        required: true
    },
    {
        id: 'daysToFirstConsultation',
        label: 'Days From Initial Diagnosis to First Clinical Nutrition Consultation',
        type: 'number',
        placeholder: 'Enter Days',
        unit: 'Days',
        required: true
    }
];
