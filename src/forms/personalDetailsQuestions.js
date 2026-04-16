import { COUNTRIES } from "./countries";
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
        required: true
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
        required: false,
        // info: 'Please Mention Patient Date of Birth'
    },
    {
        id: 'chronologicalAge',
        label: 'Chronological Age',
        type: 'age',
        maxYears: 100,
        required: true
    },
    {
        id: 'gender',
        label: 'Gender',
        type: 'select',
        options: ['Male', 'Female', 'Other'],
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
        type: 'select',
        options: COUNTRIES,
        required: true
    }
];
