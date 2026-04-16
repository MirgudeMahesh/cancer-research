const baseQuestions = [
    {
        id: 'hemoglobin',
        label: 'Hemoglobin',
        type: 'number',
        unit: 'g/dL',
        placeholder: 'Enter value',
        required: false,
        min: 2,
        max: 22
    },
    {
        id: 'leucocytes',
        label: 'Leucocytes',
        type: 'number',
        unit: 'Cells/µL',
        placeholder: 'Enter value',
        required: false,
        min: 500,
        max: 300000
    },
    {
        id: 'lymphocytesTotal',
        label: 'Lymphocytes (Total Count)',
        type: 'number',
        unit: 'cells/µL',
        placeholder: 'Enter value',
        required: false,
        min: 100,
        max: 100000
    },
    {
        id: 'lymphocytesPercent',
        label: '% Lymphocytes',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value',
        required: false,
        min: 0,
        max: 100
    },
    {
        id: 'neutrophils',
        label: 'Neutrophils',
        type: 'number',
        unit: 'cells/µL',
        placeholder: 'Enter value',
        required: false,
        min: 0,
        max: 200000
    },
    {
        id: 'platelets',
        label: 'Platelets',
        type: 'number',
        unit: 'cells/µL',
        placeholder: 'Enter value',
        required: false,
        min: 5000,
        max: 2000000
    },
    {
        id: 'rdw',
        label: 'RDW',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value',
        required: false,
        min: 8,
        max: 30
    },
    {
        id: 'mcv',
        label: 'MCV',
        type: 'number',
        unit: 'fL',
        placeholder: 'Enter value',
        required: false,
        min: 50,
        max: 130
    },
    {
        id: 'glucose',
        label: 'Glucose',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false,
        min: 20,
        max: 1000
    },
    {
        id: 'triglycerides',
        label: 'Triglycerides',
        type: 'number',
        unit: 'mmol/L',
        placeholder: 'Enter value',
        required: false,
        min: 0.1,
        max: 30
    },
    {
        id: 'cholesterol',
        label: 'Cholesterol',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false,
        min: 50,
        max: 1000
    },
    {
        id: 'albumin',
        label: 'Albumin',
        type: 'number',
        unit: 'g/dL',
        placeholder: 'Enter value',
        required: false,
        min: 0.5,
        max: 6.5
    },
    {
        id: 'prealbumin',
        label: 'Prealbumin',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false,
        min: 2,
        max: 80
    },
    {
        id: 'creatinine',
        label: 'Creatinine',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false,
        min: 0.1,
        max: 20
    },
    {
        id: 'hba1c',
        label: 'HbA1c',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value',
        required: false,
        min: 3,
        max: 20
    },
    {
        id: 'bun',
        label: 'BUN',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false,
        min: 2,
        max: 200
    },
    {
        id: 'crp',
        label: 'CRP',
        type: 'number',
        unit: 'mg/L',
        placeholder: 'Enter value',
        required: false,
        min: 0,
        max: 500
    },
    {
        id: 'alkalinePhosphatase',
        label: 'Alkaline Phosphatase',
        type: 'number',
        unit: 'IU/L',
        placeholder: 'Enter value',
        required: false,
        min: 10,
        max: 3000
    },
    {
        id: 'urineNitrogen',
        label: 'Urine Nitrogen 24hrs',
        type: 'number',
        unit: 'g/day',
        placeholder: 'Enter value',
        required: false,
        min: 0,
        max: 50
    },
    {
        id: 'vitaminD',
        label: 'Vitamin D Level',
        type: 'number',
        unit: 'ng/mL',
        placeholder: 'Enter value',
        required: false,
        min: 2,
        max: 200
    }
];

const createSection = (prefix, sectionTitle, doneLabel) => [
    {
        id: `${prefix}_heading`,
        type: 'heading',
        label: sectionTitle
    },
    {
        id: `${prefix}_done`,
        label: doneLabel,
        type: 'radio-group',
        options: ['Yes', 'No'],
        required: true
    },
    ...baseQuestions.map(q => ({
        ...q,
        id: `${prefix}_${q.id}`,
        showIf: (data) => data[`${prefix}_done`] === 'Yes'
    }))
];

export const biochemicalEvaluationQuestions = [
    ...createSection('hosp', 'Biochemical Evaluation (At Hospitalization)', 'Biochemical Evaluations (At Hospitalization)'),
    ...createSection('inter', 'Biochemical Evaluation (Intermediate)', 'Biochemical Evaluations (Intermediate)'),
    ...createSection('disch', 'Biochemical Evaluation (Before Discharge)', 'Biochemical Evaluations (Before Discharge)')
];
