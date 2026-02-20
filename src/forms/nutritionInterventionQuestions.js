export const nutritionInterventionQuestions = [
    {
        id: 'nutritionPlanningHeading',
        type: 'heading',
        label: (data) => data.patientType === 'Out-Patient' ? 'Nutrition Planning (At Evaluation(O/P))' : 'Nutrition Planning (At Hospitalization)'
    },
    {
        id: 'nutritionPlanned',
        label: 'Nutrition Planned',
        type: 'checkbox-group',
        options: [
            'Oral Nutrition Support',
            'Enteral Tube feeding',
            'Parenteral Nutrition',
            'Normal',
            'Special'
        ],
        required: true
    },
    // Oral Nutrition Support Section
    {
        id: 'oralSupplementsName',
        label: 'Name of Oral Nutrition Supplements',
        type: 'text',
        placeholder: 'e.g. Supplement A, Supplement B',
        info: 'Please Specify the combination of supplements separating with comma(,)',
        showIf: (data) => data.nutritionPlanned?.includes('Oral Nutrition Support'),
        required: true
    },
    {
        id: 'oralSupplementsAmount',
        label: 'Amount of Oral Nutrition Supplements Per Day',
        type: 'number',
        unit: 'gms',
        placeholder: 'Enter amount in gms',
        showIf: (data) => data.nutritionPlanned?.includes('Oral Nutrition Support'),
        required: true
    },
    {
        id: 'recommendedIntake',
        label: 'Recommended Intake of Supplement in a Day',
        type: 'select',
        options: ['Once', 'Twice', 'Thrice', 'Other'],
        showIf: (data) => data.nutritionPlanned?.includes('Oral Nutrition Support'),
        required: true
    },
    {
        id: 'recommendedIntakeOther',
        label: 'Specify Recommended Intake',
        type: 'text',
        showIf: (data) => data.nutritionPlanned?.includes('Oral Nutrition Support') && data.recommendedIntake === 'Other',
        required: true
    },
    {
        id: 'nutritionSupplementType',
        label: 'Type of Nutrition Supplement',
        type: 'select',
        options: [
            'High Calorie High Protein',
            'Standard Nutrition',
            'High Protein',
            'Low Protein High Calorie'
        ],
        showIf: (data) => data.nutritionPlanned?.includes('Oral Nutrition Support'),
        required: true
    },
    // Enteral Tube feeding Section
    {
        id: 'enteralNutritionType',
        label: 'Enteral Nutrition',
        type: 'checkbox-group',
        options: [
            'Nasogastric Tube',
            'Nasoduodenal Tube',
            'Nasojejunal Tube',
            'Gastrostomy tube',
            'Jejunostomy tube',
            'Gastrojejunal tube'
        ],
        showIf: (data) => data.nutritionPlanned?.includes('Enteral Tube feeding'),
        required: true
    },
    {
        id: 'infusionType',
        label: 'Bolus or Continued Infusion',
        type: 'select',
        options: ['50ml/hr', '75ml/hr', '100ml/hr', '150ml/hr', 'Other'],
        showIf: (data) => data.nutritionPlanned?.includes('Enteral Tube feeding'),
        required: true
    },
    {
        id: 'infusionTypeOther',
        label: 'Specify Infusion Rate',
        type: 'text',
        showIf: (data) => data.nutritionPlanned?.includes('Enteral Tube feeding') && data.infusionType === 'Other',
        required: true
    },
    // Parenteral Nutrition Section
    {
        id: 'parenteralNutritionType',
        label: 'Type of Parenteral Nutrition',
        type: 'radio-group',
        options: ['Central', 'Peripheral'],
        showIf: (data) => data.nutritionPlanned?.includes('Parenteral Nutrition'),
        required: true
    },
    {
        id: 'specialNutritionType',
        label: 'Special Nutrition Type',
        type: 'select',
        options: [
            'Glutamine',
            'Omega 3',
            'Vitamin D',
            'Vitamin C',
            'Zinc',
            'Others'
        ],
        showIf: (data) => data.nutritionPlanned?.includes('Special'),
        required: true
    },
    // Global Nutrition Planning
    {
        id: 'planningHospitalizationHeading',
        type: 'heading',
        label: (data) => data.patientType === 'Out-Patient' ? 'Nutrition Planning (At Evaluation(O/P))' : 'Nutrition Planned At Hospitalization'
    },
    {
        id: 'totalKcalPlanned',
        label: 'Total Kcal Planned',
        type: 'number',
        required: true
    },
    {
        id: 'totalProteinsPlanned',
        label: 'Total Proteins',
        type: 'number',
        unit: 'gms',
        required: true
    },
    {
        id: 'totalFatsPlanned',
        label: 'Total Fats',
        type: 'number',
        unit: 'gms',
        required: true
    },
    {
        id: 'totalCarbohydratesPlanned',
        label: 'Total Carbohydrates',
        type: 'number',
        unit: 'gms',
        required: false
    },
    {
        id: 'totalFiberPlanned',
        label: 'Total Fiber',
        type: 'number',
        unit: 'gms',
        required: false
    },
    {
        id: 'totalFluidsPlanned',
        label: 'Total Fluids',
        type: 'number',
        unit: 'ml',
        required: false
    }
];
