export const personalDetailsQuestions = [
    {
        id: 'patientId',
        label: 'Patient ID',
        type: 'text',
        placeholder: 'Enter Patient ID',
        required: true
    },
    {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter first name',
        required: false
    },
    {
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter last name',
        required: false
    },
    {
        id: 'personalDetailsInfo',
        label: 'Note',
        type: 'info',
        text: "Disclaimer: This data field is marked as personal and will be encrypted for privacy reasons, it's also ok if you share only initials for your further reference purposes."
    },
    {
        id: 'dateOfBirth',
        label: 'Patient Date of Birth',
        type: 'date',
        placeholder: 'dd-MMM-yyyy',
        required: true,
        // info: 'Please Mention Patient Date of Birth'
    },
    {
        id: 'chronologicalAge',
        label: 'Chronological Age',
        type: 'age',
        required: false
    },
    {
        id: 'gender',
        label: 'Gender',
        type: 'select',
        options: ['Male', 'Female', 'Other', 'Prefer not to say'],
        required: true
    },
    {
        id: 'occupation',
        label: 'Occupation',
        type: 'text',
        placeholder: 'Enter Occupation',
        required: false
    },
    {
        id: 'country',
        label: 'Country',
        type: 'text',
        placeholder: 'Enter Country',
        required: false
    }
];
