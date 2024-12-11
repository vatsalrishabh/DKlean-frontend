import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import { BreadCrumb } from './DoctorDashboard/BreadCrumb';

const PatientProfile = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [patientHistory, setPatientHistory] = useState({
    email: 'john.doe@example.com',
    ongoingConditions: [],
    currentMedications: {},
    medicalHistory: {},
    surgicalHistory: {},
    allergies: {},
    immunization: {},
    lifestyle: {},
    familyHistory: {},
  });

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(userDetails);
      setPatientHistory((prev) => ({ ...prev, email: userDetails.email }));

      // Fetch patient history after setting user details
      const fetchPatientHistory = async () => {
        try {
          const response = await axios.get(`${BaseUrl}/api/patients/getPatientHistory/${userDetails.email}`);
          console.log('Fetched patient history:', response.data); // Log the fetched data
          setPatientHistory(response.data);
        } catch (error) {
          console.error('Error fetching patient history:', error);
        }
      };

      fetchPatientHistory();
    }
  }, []);

  const renderConditionsTable = (conditions, title) => (
    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>#</strong></TableCell>
            <TableCell><strong>Current Diagnoses</strong></TableCell>
            <TableCell><strong>Duration</strong></TableCell>
            <TableCell><strong>Symptoms</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conditions.map((condition, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{condition.currentDiagnoses}</TableCell>
              <TableCell>{condition.duration}</TableCell>
              <TableCell>
                <ul>
                  {Array.isArray(condition.symptoms) ? (
                    condition.symptoms.map((symptom, symptomIndex) => (
                      <li key={symptomIndex}>{symptom}</li>
                    ))
                  ) : (
                    <li>{condition.symptoms || 'None'}</li>
                  )}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderSingleValueTable = (title, data) => (
    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Table>
        <TableBody>
          {Object.entries(data).map(([key, value]) => {
            // Skip rendering the '_id' field
            if (key === '_id') return null;
            return (
              <TableRow key={key}>
                <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <BreadCrumb first="Patient Dashboard" second="Patient Profile" firstLink="/pdash" secondLink="/patientprofile" />
      
      <Typography variant="h4" gutterBottom>
        Patient History
      </Typography>

      {/* Display the email of the logged-in user */}
      <Typography variant="h6" gutterBottom>
        User Email: {loggedInUser.email || patientHistory.email}
      </Typography>

      {renderConditionsTable(patientHistory.ongoingConditions, 'Ongoing Conditions')}
      {renderSingleValueTable('Current Medications', patientHistory.currentMedications)}
      {renderSingleValueTable('Medical History', patientHistory.medicalHistory)}
      {renderSingleValueTable('Surgical History', patientHistory.surgicalHistory)}
      {renderSingleValueTable('Allergies', patientHistory.allergies)}
      {renderSingleValueTable('Immunization', patientHistory.immunization)}
      {renderSingleValueTable('Lifestyle', patientHistory.lifestyle)}
      {renderSingleValueTable('Family History', patientHistory.familyHistory)}

      <Link to="/editpatientprofile">
        <Button variant="outlined" color="primary">
          Edit Data
        </Button>
      </Link>
    </>
  );
};

export default PatientProfile;
