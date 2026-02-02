const baseQuestions = [
    {
        id: 'hemoglobin',
        label: 'Hemoglobin',
        type: 'number',
        unit: 'g/dL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'leucocytes',
        label: 'Leucocytes',
        type: 'number',
        unit: 'Cells/µL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'lymphocytesTotal',
        label: 'Lymphocytes (Total Count)',
        type: 'number',
        unit: 'µL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'lymphocytesPercent',
        label: '% Lymphocytes',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'neutrophils',
        label: 'Neutrophils',
        type: 'number',
        unit: 'µL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'platelets',
        label: 'Platelets',
        type: 'number',
        unit: 'µL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'rdw',
        label: 'RDW',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'mcv',
        label: 'MCV',
        type: 'number',
        unit: 'fL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'glucose',
        label: 'Glucose',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'triglycerides',
        label: 'Triglycerides',
        type: 'number',
        unit: 'mmol/L',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'cholesterol',
        label: 'Cholesterol',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'albumin',
        label: 'Albumin',
        type: 'number',
        unit: 'g/dL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'prealbumin',
        label: 'Prealbumin',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'creatinine',
        label: 'Creatinine',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'hba1c',
        label: 'HbA1c',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'bun',
        label: 'BUN',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'crp',
        label: 'CRP',
        type: 'number',
        unit: 'mg/L',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'alkalinePhosphatase',
        label: 'Alkaline Phosphatase',
        type: 'number',
        unit: 'IU/L',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'urineNitrogen',
        label: 'Urine Nitrogen 24hrs',
        type: 'number',
        unit: 'gms',
        placeholder: 'Enter value',
        required: false
    },
    {
        id: 'vitaminD',
        label: 'Vitamin D Level',
        type: 'number',
        unit: 'ng/mL',
        placeholder: 'Enter value',
        required: false
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
