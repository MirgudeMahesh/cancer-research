export const miscellaneousQuestions = [
    {
        id: 'emergencyContact',
        label: 'Emergency Contact Name',
        type: 'text',
        placeholder: 'Full name and relationship',
        required: true
    },
    {
        id: 'emergencyPhone',
        label: 'Emergency Contact Phone',
        type: 'tel',
        placeholder: '+1234567890',
        required: true
    },
    {
        id: 'preferredLanguage',
        label: 'Preferred Language',
        type: 'select',
        options: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Hindi', 'Other'],
        required: true
    },
    {
        id: 'notes',
        label: 'Additional Notes',
        type: 'textarea',
        placeholder: 'Any additional information or special considerations',
        required: false
    }
];
