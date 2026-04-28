import { neoplasmsOfOrganMap, neoplasmsOfRegionMap } from '../data/diagnosisData';

export const healthDetailsQuestions = [
    {
        id: 'initialCancerDiagnosis',
        label: 'Initial Cancer Diagnosis',
        type: 'date',
        placeholder: 'MMM-yyyy',
        required: true
    },
    {
        id: 'firstCancerTherapy',
        label: 'First Cancer Therapy Initiated',
        type: 'date',
        placeholder: 'MMM-yyyy',
        required: true
    },
    {
        id: 'patientType',
        label: 'Patient Type',
        type: 'radio-group',
        options: ['In-Patient', 'Out-Patient'],
        required: true
    },
    {
        id: 'dateOfAdmission',
        label: 'Date of Admission',
        type: 'date',
        placeholder: 'dd-MMM-yyyy',
        required: true,
        showIf: (formData) => formData.patientType === 'In-Patient'
    },
    {
        id: 'dateOfVisit',
        label: 'Date of Visit',
        type: 'date',
        placeholder: 'dd-MMM-yyyy',
        required: true,
        showIf: (formData) => formData.patientType === 'Out-Patient'
    },

    {
        id: 'conditionSpecific',
        label: 'Condition Specific',
        type: 'select',
        options: [
            'Pediatric Oncology',
            'Gynecologic Oncology',
            'Thoracic Oncology',
            'Head & Neck Oncology',
            'Breast Oncology',
            'Prostate Oncology',
            'Colorectal Oncology',
            'Sarcoma Oncology',
            'Gastrointestinal Oncology',
            'Dermato / Skin Oncology',
            'Uro Oncology',
            'Hepatobiliary Oncology',
            'Endocrine Oncology',
            'Hematologic Oncology',
            'Other'
        ],
        required: false,
        showIf: (formData) => !!formData.patientType
    },
    {
        id: 'conditionSpecificOther',
        label: 'Other Condition',
        type: 'text',
        placeholder: 'Please specify...',
        required: true,
        showIf: (formData) => formData.conditionSpecific === 'Other'
    },
    {
        id: 'primaryDiagnosis',
        label: 'Primary Diagnosis',
        type: 'select',
        options: [
            'C00 - C14  Malignant neoplasms of lip, oral cavity and pharynx',
            'C15 - C26  Malignant neoplasms of digestive organs',
            'C30 - C39  Malignant neoplasms of respiratory and intrathoracic organs',
            'C40 - C41  Malignant neoplasms of bone and articular cartilage',
            'C43 - C44  Melanoma and other malignant neoplasms of skin',
            'C45 - C49  Malignant neoplasms of mesothelial and soft tissue',
            'C50 Malignant neoplasms of breast',
            'C51 - C58  Malignant neoplasms of female genital organs',
            'C60 - C63  Malignant neoplasms of male genital organs',
            'C64 - C68  Malignant neoplasms of urinary tract',
            'C69 - C72  Malignant neoplasms of eye, brain and other parts of central nervous system',
            'C73 - C75  Malignant neoplasms of thyroid and other endocrine glands',
            'C76 - C80  Malignant neoplasms of ill-defined, other secondary and unspecified sites',
            'C7A Malignant neuroendocrine tumors',
            'C7B Secondary neuroendocrine tumors',
            'C81 - C96  Malignant neoplasms of lymphoid, hematopoietic and related tissue',
            'D00 - D09  In situ neoplasms',
            'D10 - D36  Benign neoplasms, except benign neuroendocrine tumors',
            'D37 - D48  Neoplasms of uncertain behavior, polycythemia vera and myelodysplastic syndromes',
            'D3A Benign neuroendocrine tumors',
            'D49 Neoplasms of unspecified behavior'
        ],
        required: true,
        showIf: (formData) => formData.conditionSpecific && formData.conditionSpecific !== 'Hematologic Oncology'
    },
    {
        id: 'neoplasmsOfOrgan',
        label: 'Neoplasms of Organ',
        type: 'select',
        options: (formData) => {
            if (!formData.primaryDiagnosis) return [];
            const key = Object.keys(neoplasmsOfOrganMap).find(k => formData.primaryDiagnosis.startsWith(k));
            return key ? neoplasmsOfOrganMap[key] : [];
        },
        required: false,
        showIf: (formData) => !!formData.primaryDiagnosis
    },
    {
        id: 'neoplasmsOfRegion',
        label: 'Neoplasms of Region',
        type: 'select',
        options: (formData) => {
            if (!formData.neoplasmsOfOrgan) return [];
            return neoplasmsOfRegionMap[formData.neoplasmsOfOrgan] || [];
        },
        required: false,
        showIf: (formData) => !!formData.neoplasmsOfOrgan
    },
    {
        id: 'hematologicOncology',
        label: 'Hematologic Oncology',
        type: 'select',
        groups: [
            {
                label: 'Leukemia',
                options: [
                    'Acute Lymphoblastic Leukemia (ALL)',
                    'Acute Myeloid Leukemia (AML)',
                    'Chronic Lymphocytic Leukemia (CLL)',
                    'Chronic Myeloid Leukemia (CML)',
                    'Chronic Neutrophilic Leukemia',
                    'Chronic Eosinophilic Leukemia',
                    'Hairy Cell Leukemia'
                ]
            },
            {
                label: 'Lymphoma',
                options: [
                    'Hodgkin lymphoma',
                    'Non-Hodgkin lymphoma'
                ]
            },
            {
                label: 'Myeloproliferative Neoplasms',
                options: [
                    'Polycythemia Vera',
                    'Essential Thrombocythemia',
                    'Primary Myelofibrosis',
                    'Mastocytosis'
                ]
            }
        ],
        required: false,
        showIf: (formData) => formData.conditionSpecific === 'Hematologic Oncology'
    },
    {
        id: 'clinicalStage',
        label: 'Clinical Stage (I-IV)',
        type: 'select',
        options: [
            'Stage-I Early Stage',
            'Stage-II Early Locally Advanced Cancer',
            'Stage-III Advanced Stage',
            'Stage-IV Metastatic'
        ],
        required: true,
        showIf: (formData) => !!formData.patientType
    },
    {
        id: 'priorSurgery',
        label: 'Prior Surgery',
        type: 'select',
        options: ['Yes', 'No'],
        required: true,
        showIf: (formData) => !!formData.patientType
    },
    {
        id: 'surgeryTiming',
        label: 'Surgery Timing',
        type: 'select',
        options: [
            '1 month ago',
            '2-3 months',
            '4-6 months',
            '6-12 months',
            'More Than 1 Year'
        ],
        required: true,
        showIf: (formData) => !!formData.patientType && formData.priorSurgery === 'Yes'
    },
    {
        id: 'typeOfTreatment',
        label: 'Type of treatment',
        type: 'checkbox-group',
        options: [
            'Chemotherapy',
            'Radiotherapy',
            'Immunotherapy',
            'Surgery',
            'Targeted Therapy',
            'Hormone Therapy',
            'Photodynamic Therapy',
            'Checkpoint Inhibitor Therapy',
            'Chimeric Antigen Receptor Therapy',
            'Monoclonal Antibody Therapy',
            'Hyperthermia (HIPEC)'
        ],
        required: true,
        showIf: (formData) => !!formData.patientType
    },
    {
        id: 'chemotherapyScheme',
        label: 'Chemotherapy Scheme',
        type: 'select',
        options: [
            'Adjuvant Chemotherapy',
            'Neoadjuvant Chemotherapy',
            'Palliative Chemotherapy',
            'Induction Chemotherapy',
            'Consolidation Chemotherapy',
            'Maintenance Chemotherapy',
            'Other (Text Box)'
        ],
        required: true,
        showIf: (formData) => !!formData.patientType && formData.typeOfTreatment?.includes('Chemotherapy')
    },
    {
        id: 'chemotherapySchemeOther',
        label: 'Other Chemotherapy Scheme',
        type: 'text',
        placeholder: 'Please specify...',
        required: true,
        showIf: (formData) => !!formData.patientType && formData.typeOfTreatment?.includes('Chemotherapy') && formData.chemotherapyScheme === 'Other (Text Box)'
    },
    {
        id: 'chemotherapyLine',
        label: 'Chemotherapy',
        type: 'select',
        options: [
            '1st Line Chemotherapy',
            '2nd Line Chemotherapy',
            '3rd Line Chemotherapy & Beyond',
            'Other (Text Box)'
        ],
        required: true,
        showIf: (formData) => !!formData.patientType && formData.typeOfTreatment?.includes('Chemotherapy')
    },
    {
        id: 'chemotherapyLineOther',
        label: 'Other Chemotherapy Line',
        type: 'text',
        placeholder: 'Please specify...',
        required: true,
        showIf: (formData) => !!formData.patientType && formData.typeOfTreatment?.includes('Chemotherapy') && formData.chemotherapyLine === 'Other (Text Box)'
    },
    {
        id: 'performanceStatusScale',
        label: 'Performance Status Scale',
        type: 'checkbox-group',
        options: ['Ecog Scale', 'Karnofsky Scale'],
        required: true,
        showIf: (formData) => !!formData.patientType
    },
    {
        id: 'ecogScaleValue',
        label: 'Ecog Scale',
        type: 'radio-group',
        vertical: true,
        options: [
            { value: 'Grade 0', label: 'Fully active, able to carry on all pre-disease performance without restriction.' },
            { value: 'Grade 1', label: 'Restricted in physically strenuous activity but ambulatory and able to carry out work of a light or sedentary nature, e.g., light house work, office work.' },
            { value: 'Grade 2', label: 'Capable of all self-care but unable to carry out any work activities; up and about more than 50% of waking hours.' },
            { value: 'Grade 3', label: 'Capable of only limited self-care, confined to bed or chair more than 50% of waking hours.' },
            { value: 'Grade 4', label: 'Completely disabled. Cannot carry on any self-care. Totally confined to bed or chair.' },
            { value: 'Grade 5', label: 'Dead' }
        ],
        required: true,
        showIf: (formData) => formData.performanceStatusScale?.includes('Ecog Scale')
    },
    {
        id: 'karnofskyCategory',
        label: 'Karnofsky Scale Category',
        type: 'radio-group',
        vertical: true,
        options: [
            { value: 'cat1', label: 'Able to carry on normal activity and to work; no special care needed.' },
            { value: 'cat2', label: 'Unable to work; able to live at home and care for most personal needs; varying amount of assistance needed.' },
            { value: 'cat3', label: 'Unable to care for self; requires equivalent of institutional or hospital care; disease may be progressing rapidly.' }
        ],
        required: true,
        showIf: (formData) => formData.performanceStatusScale?.includes('Karnofsky Scale')
    },
    {
        id: 'karnofskyScaleValue',
        label: 'Karnofsky Score Details',
        type: 'radio-group',
        vertical: true,
        options: (formData) => {
            if (formData.karnofskyCategory === 'cat1') {
                return [
                    { value: 100, label: '100 - Normal with no complaints; no evidence of disease.' },
                    { value: 90, label: '90 - Able to carry on normal activity; minor signs or symptoms of disease.' },
                    { value: 80, label: '80 - Normal activity with effort; some signs and symptoms of disease.' }
                ];
            }
            if (formData.karnofskyCategory === 'cat2') {
                return [
                    { value: 70, label: '70 - Cares for self; unable to carry on normal activity or do active work.' },
                    { value: 60, label: '60 - Requires occasional assistance, but able to care for most of his/her personal needs.' },
                    { value: 50, label: '50 - Requires considerable assistance and frequent medical care.' }
                ];
            }
            if (formData.karnofskyCategory === 'cat3') {
                return [
                    { value: 40, label: '40 - Disabled; requires special care and assistance.' },
                    { value: 30, label: '30 - Severely disabled; hospital admission is indicated although death is not imminent.' },
                    { value: 20, label: '20 - Very sick; hospital admission necessary; active supportive treatment necessary.' },
                    { value: 10, label: '10 - Moribund; fatal processes progressing rapidly.' },
                    { value: 0, label: '0 - Dead' }
                ];
            }
            return [];
        },
        required: true,
        showIf: (formData) => formData.performanceStatusScale?.includes('Karnofsky Scale') && !!formData.karnofskyCategory
    }
];

