export const anthropometricQuestions = [
    {
        id: 'nutritionalRiskTool',
        label: 'Nutritional Risk Tool Name',
        type: 'checkbox-group',
        options: [
            'GLIM Criteria (Global Leadership Initiative on Malnutrition - Screening Tool)',
            'MUST (Malnutrition Universal Screening Tool)',
            'MNA (Mini Nutritional Assessment)',
            'NRS (Nutritional Risk Screening)',
            'SNAQ (Short Nutritional Assessment Questionnaire)',
            'SGA (Subjective Global Assessment)',
            'Other'
        ],
        required: true
    },
    {
        id: 'glimCriteria',
        label: 'GLIM Criteria (Global Leadership Initiative on Malnutrition - Screening Tool)',
        type: 'select',
        options: [
            'Well-nourished',
            'Stage I / Moderate Malnutrition',
            'Stage II / Severe Malnutrition'
        ],
        showIf: (data) => data.nutritionalRiskTool?.includes('GLIM Criteria (Global Leadership Initiative on Malnutrition - Screening Tool)'),
        required: true,
        image: 'b8vMRE_zeimage_1766121446976_Glim_Scale.jpeg'
    },
    {
        id: 'mustValue',
        label: 'MUST (Malnutrition Universal Screening Tool)',
        type: 'range',
        min: 0,
        max: 3,
        step: 1,
        showIf: (data) => data.nutritionalRiskTool?.includes('MUST (Malnutrition Universal Screening Tool)'),
        required: true
    },
    {
        id: 'mnaValue',
        label: 'MNA (Mini Nutritional Assessment)',
        type: 'range',
        min: 0,
        max: 30,
        step: 1,
        showIf: (data) => data.nutritionalRiskTool?.includes('MNA (Mini Nutritional Assessment)'),
        required: true
    },
    {
        id: 'nrsValue',
        label: 'NRS (Nutritional Risk Screening)',
        type: 'range',
        min: 0,
        max: 10,
        step: 1,
        showIf: (data) => data.nutritionalRiskTool?.includes('NRS (Nutritional Risk Screening)'),
        required: true
    },
    {
        id: 'snaqValue',
        label: 'SNAQ (Short Nutritional Assessment Questionnaire)',
        type: 'range',
        min: 0,
        max: 3,
        step: 1,
        showIf: (data) => data.nutritionalRiskTool?.includes('SNAQ (Short Nutritional Assessment Questionnaire)'),
        required: true
    },
    {
        id: 'sgaValue',
        label: 'Please Select any one of the option - SGA (Subjective Global Assessment)',
        type: 'select',
        options: [
            'A) Well Nourished',
            'B) Mildly/Moderately Malnourished',
            'C) Severely Malnourished'
        ],
        showIf: (data) => data.nutritionalRiskTool?.includes('SGA (Subjective Global Assessment)'),
        required: true
    },
    {
        id: 'otherNutritionalRiskToolName',
        label: 'Other Nutritional Risk Tool Name',
        type: 'text',
        placeholder: 'Please Enter the Tool Name',
        showIf: (data) => data.nutritionalRiskTool?.includes('Other'),
        required: true
    },
    {
        id: 'otherNutritionalRiskValue',
        label: 'Other Nutritional Risk Value',
        type: 'text',
        placeholder: 'Please Enter the Risk Value',
        showIf: (data) => data.nutritionalRiskTool?.includes('Other'),
        required: true
    },
    {
        id: 'usualBodyWeight',
        label: 'Usual body weight (last 1 year)',
        type: 'number',
        unit: 'Kgs',
        required: true
    },
    {
        id: 'height',
        label: 'Height',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'hosp_anthropometricHeading',
        type: 'heading',
        label: 'At Hospitalization'
    },
    {
        id: 'hosp_currentWeight',
        label: 'Current Body Weight',
        type: 'number',
        unit: 'Kgs',
        required: true
    },
    {
        id: 'hosp_weightLoss',
        label: 'Did the Patient experience Weight Loss?',
        type: 'radio-group',
        options: ['Yes', 'No'],
        required: true
    },
    {
        id: 'hosp_weightLossPeriod',
        label: 'Over what period did the patient\'s weight loss occur?',
        type: 'select',
        options: [
            'One Month',
            'Two Month',
            'Three Month',
            'Six Months',
            'One Year',
            'More than one year'
        ],
        showIf: (data) => data.hosp_weightLoss === 'Yes',
        required: true
    },
    {
        id: 'hosp_weightLossAmount',
        label: 'How Much Weight did Patient Loose',
        type: 'number',
        unit: 'Kgs',
        showIf: (data) => data.hosp_weightLoss === 'Yes',
        required: true
    },
    {
        id: 'hosp_waistCircumference',
        label: 'Waist Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'hosp_hipCircumference',
        label: 'Hip Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'hosp_bmi',
        label: 'Body Mass Index',
        type: 'number',
        readOnly: true,
        info: 'Below 18.5 – Under Weight, 18.5-24.9 – Normal Weight, 25 - 29.9 – Over Weight, 30-34.9 – Obesity Class I, 35-39.9 – Obesity Class II, Above 40 – Obesity Class III',
        required: false
    },
    {
        id: 'hosp_muac',
        label: 'Middle Upper Arm Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'hosp_calfCircumference',
        label: 'Calf Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'hosp_dynamometry',
        label: 'Dynamometry',
        type: 'number',
        unit: 'Kgs',
        required: true
    },
    {
        id: 'inter_anthropometricHeading',
        type: 'heading',
        label: 'Intermediate'
    },
    {
        id: 'inter_currentWeight',
        label: 'Current Body Weight (Intermediate Value)',
        type: 'number',
        unit: 'Kgs',
        required: true
    },
    {
        id: 'inter_waistCircumference',
        label: 'Waist Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'inter_hipCircumference',
        label: 'Hip Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'inter_bmi',
        label: 'Body Mass Index',
        type: 'number',
        readOnly: true,
        info: 'Below 18.5 – Under Weight, 18.5-24.9 – Normal Weight, 25 - 29.9 – Over Weight, 30-34.9 – Obesity Class I, 35-39.9 – Obesity Class II, Above 40 – Obesity Class III',
        required: false
    },
    {
        id: 'inter_muac',
        label: 'Middle Upper Arm Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'inter_calfCircumference',
        label: 'Calf Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'inter_dynamometry',
        label: 'Dynamometry',
        type: 'number',
        unit: 'Kgs',
        required: true
    },
    {
        id: 'disch_anthropometricHeading',
        type: 'heading',
        label: 'Before Discharge'
    },
    {
        id: 'disch_currentWeight',
        label: 'Current Body Weight (At Discharge)',
        type: 'number',
        unit: 'Kgs',
        required: true
    },
    {
        id: 'disch_waistCircumference',
        label: 'Waist Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'disch_hipCircumference',
        label: 'Hip Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'disch_bmi',
        label: 'Body Mass Index',
        type: 'number',
        readOnly: true,
        info: 'Below 18.5 – Under Weight, 18.5-24.9 – Normal Weight, 25 - 29.9 – Over Weight, 30-34.9 – Obesity Class I, 35-39.9 – Obesity Class II, Above 40 – Obesity Class III',
        required: false
    },
    {
        id: 'disch_muac',
        label: 'Middle Upper Arm Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'disch_calfCircumference',
        label: 'Calf Circumference',
        type: 'number',
        unit: 'Cms',
        required: true
    },
    {
        id: 'disch_dynamometry',
        label: 'Dynamometry',
        type: 'number',
        unit: 'Kgs',
        required: true
    }
];
