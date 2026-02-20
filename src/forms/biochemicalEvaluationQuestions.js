/* eslint-disable no-unused-vars */

const biochemicalSubQuestions = [
    {
        id: 'hemoglobin',
        label: 'Hemoglobin',
        type: 'number',
        unit: 'g/dL',
        placeholder: 'Enter value'
    },
    {
        id: 'leucocytes',
        label: 'Leucocytes',
        type: 'number',
        unit: 'Cells/µL',
        placeholder: 'Enter value'
    },
    {
        id: 'lymphocytesTotal',
        label: 'Lymphocytes (Total Count)',
        type: 'number',
        unit: 'µL',
        placeholder: 'Enter value'
    },
    {
        id: 'lymphocytesPercent',
        label: '% Lymphocytes',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value'
    },
    {
        id: 'neutrophils',
        label: 'Neutrophils',
        type: 'number',
        unit: 'µL',
        placeholder: 'Enter value'
    },
    {
        id: 'platelets',
        label: 'Platelets',
        type: 'number',
        unit: 'µL',
        placeholder: 'Enter value'
    },
    {
        id: 'rdw',
        label: 'RDW',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value'
    },
    {
        id: 'mcv',
        label: 'MCV',
        type: 'number',
        unit: 'fL',
        placeholder: 'Enter value'
    },
    {
        id: 'glucose',
        label: 'Glucose',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value'
    },
    {
        id: 'triglycerides',
        label: 'Triglycerides',
        type: 'number',
        unit: 'mmol/L',
        placeholder: 'Enter value'
    },
    {
        id: 'cholesterol',
        label: 'Cholesterol',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value'
    },
    {
        id: 'albumin',
        label: 'Albumin',
        type: 'number',
        unit: 'g/dL',
        placeholder: 'Enter value'
    },
    {
        id: 'prealbumin',
        label: 'Prealbumin',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value'
    },
    {
        id: 'creatinine',
        label: 'Creatinine',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value'
    },
    {
        id: 'hba1c',
        label: 'HbA1c',
        type: 'number',
        unit: '%',
        placeholder: 'Enter value'
    },
    {
        id: 'bun',
        label: 'BUN',
        type: 'number',
        unit: 'mg/dL',
        placeholder: 'Enter value'
    },
    {
        id: 'crp',
        label: 'CRP',
        type: 'number',
        unit: 'mg/L',
        placeholder: 'Enter value'
    },
    {
        id: 'alkalinePhosphatase',
        label: 'Alkaline Phosphatase',
        type: 'number',
        unit: 'IU/L',
        placeholder: 'Enter value'
    },
    {
        id: 'urineNitrogen',
        label: 'Urine Nitrogen 24hrs',
        type: 'number',
        unit: 'gms',
        placeholder: 'Enter value'
    },
    {
        id: 'vitaminD',
        label: 'Vitamin D Level',
        type: 'number',
        unit: 'ng/mL',
        placeholder: 'Enter value'
    }
];

export const biochemicalEvaluationQuestions = [
    {
        id: 'biochemicalEvaluation',
        type: 'dynamic-days',
        label: (data) => data.patientType === 'Out-Patient' ? 'Biochemical Evaluation (At Evaluation(O/P))' : 'Biochemical Evaluation (At Hospitalization)',
        subFields: biochemicalSubQuestions,
        required: false
    }
];
