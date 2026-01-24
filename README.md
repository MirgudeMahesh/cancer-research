# Cancer Research Doctor Portal

A comprehensive React application for doctors to manage patient records in a cancer research facility.

## 🚀 Features

### 1. **Authentication System**
- Secure login with email and unique code
- Sample credentials provided for testing
- Protected routes for authenticated users only

### 2. **Dashboard**
- Clean, modern interface with two main options:
  - **Add Patient**: Register new patients
  - **Patient Details**: View and manage existing patients

### 3. **Multi-Step Patient Registration Form**
- **4-Page Form System** with progress stepper (1→2→3→4)
- Each page contains specific questions stored in individual files:
  - **Page 1: Personal Details** (`personalDetailsQuestions.js`)
    - First Name, Last Name, Date of Birth, Gender
    - Email, Phone, Address
  - **Page 2: Health Details** (`healthDetailsQuestions.js`)
    - Cancer Type, Stage, Diagnosis Date
    - Current Treatment, Allergies, Medications
  - **Page 3: Background Details** (`backgroundDetailsQuestions.js`)
    - Smoking History, Alcohol Consumption
    - Family History, Occupation
    - Insurance Provider & Number
  - **Page 4: Miscellaneous** (`miscellaneousQuestions.js`)
    - Emergency Contact Information
    - Preferred Language, Additional Notes

### 4. **Form Features**
- ✅ **Progress Stepper**: Always visible at the top (1→2→3→4)
- ✅ **Navigation**: Click on any step to jump to that page
- ✅ **Save Progress**: Save button on every page to prevent data loss
- ✅ **Review Mode**: View all filled details at any time
- ✅ **Form Persistence**: Data is saved as you navigate between pages

### 5. **Patient Management**
- **Search Functionality**: Filter patients by name
- **Patient List**: View all patients in a table format
- **View Details**: See complete patient information
- **Edit Functionality**: Update patient details in the future
- **Sample Data**: Pre-loaded with one sample patient

### 6. **Design Features**
- 🎨 Modern glassmorphism UI
- 🌈 Gradient color schemes
- ✨ Smooth animations and transitions
- 📱 Responsive design
- 🖼️ Cancer Research branding throughout the application

## 📦 Installation

The application is already set up! Dependencies have been installed.

## 🏃‍♂️ Running the Application

The development server is currently running at:
```
http://localhost:5173/
```

To start it manually in the future:
```bash
npm run dev
```

## 🔐 Sample Login Credentials

Use these credentials to test the application:

**Email:** `doctor@cancer-research.com`  
**Code:** `CR2024`

Alternative credentials:
**Email:** `admin@cancer-research.com`  
**Code:** `ADMIN123`

## 📁 Project Structure

```
cancer-research/
├── public/
│   └── cancer-research-thumbnail.jpg    # Logo image
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx              # Authentication state management
│   │   └── PatientContext.jsx           # Patient data management
│   ├── forms/
│   │   ├── personalDetailsQuestions.js  # Page 1 questions
│   │   ├── healthDetailsQuestions.js    # Page 2 questions
│   │   ├── backgroundDetailsQuestions.js # Page 3 questions
│   │   └── miscellaneousQuestions.js    # Page 4 questions
│   ├── pages/
│   │   ├── Login.jsx                    # Login page
│   │   ├── Dashboard.jsx                # Main dashboard
│   │   ├── AddPatient.jsx               # Multi-step patient form
│   │   └── PatientDetails.jsx           # Patient list & details
│   ├── App.jsx                          # Main app component with routing
│   ├── main.jsx                         # Entry point
│   └── index.css                        # Global styles & design system
├── index.html
├── package.json
└── vite.config.js
```

## 🧪 Testing the Application

### Step 1: Login
1. Open `http://localhost:5173/` in your browser
2. Enter the sample credentials
3. Click "Sign In"

### Step 2: Dashboard
- You'll see two cards: "Add Patient" and "Patient Details"

### Step 3: Add Patient
1. Click "Add Patient"
2. Notice the progress stepper at the top (1→2→3→4)
3. Fill in the Personal Details form
4. Click "💾 Save Progress" to save your work
5. Click "Next →" to go to Health Details
6. Try clicking on different steps in the stepper to navigate
7. Click "👁️ Review All" to see all your filled information
8. Complete all 4 pages
9. Click "✓ Add Patient" to save the patient

### Step 4: View Patients
1. Go back to Dashboard
2. Click "Patient Details"
3. See the list of patients (including the sample patient)
4. Use the search bar to filter by name
5. Click "View" to see complete patient information
6. Click "Edit" to modify patient details
7. Make changes and click "Save Changes"

## 🎨 Design System

The application uses a modern design system with:
- **Color Palette**: Purple/blue gradients with dark theme
- **Typography**: Inter font family
- **Components**: Glass cards, smooth transitions, hover effects
- **Animations**: Background patterns, button effects, modal transitions

## 🔧 Customization

### Adding More Questions
Edit the question files in `src/forms/`:
- `personalDetailsQuestions.js`
- `healthDetailsQuestions.js`
- `backgroundDetailsQuestions.js`
- `miscellaneousQuestions.js`

Each question follows this format:
```javascript
{
  id: 'fieldName',
  label: 'Display Label',
  type: 'text|email|date|select|textarea',
  placeholder: 'Placeholder text',
  options: ['Option 1', 'Option 2'], // For select type
  required: true|false
}
```

### Adding More Doctors
Edit `src/context/AuthContext.jsx` and add to the `SAMPLE_DOCTORS` array:
```javascript
{ email: 'newdoctor@cancer-research.com', code: 'NEWCODE' }
```

## 🚀 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 📝 Notes

- All patient data is stored in memory (React state)
- Data will be lost on page refresh
- For production, integrate with a backend API and database
- The application includes one sample patient for demonstration

## 🎯 Key Features Implemented

✅ Login page with email and unique code  
✅ Sample data for authentication  
✅ Dashboard with 2 options  
✅ Multi-step form (4 pages)  
✅ Individual question files for each page  
✅ Progress stepper (1→2→3→4) always visible  
✅ Navigation between pages via stepper  
✅ Save changes option on every page  
✅ Review mode to see all details  
✅ Add patient functionality  
✅ Patient details page with table view  
✅ Search/filter by name  
✅ Edit patient details  
✅ Cancer Research branding throughout  

## 🎨 Screenshots

The application features:
- Beautiful login page with gradient effects
- Modern dashboard with card-based navigation
- Multi-step form with visual progress indicator
- Comprehensive patient management interface
- Responsive design that works on all devices

---

**Developed with React + Vite**  
**Styled with modern CSS and glassmorphism effects**
