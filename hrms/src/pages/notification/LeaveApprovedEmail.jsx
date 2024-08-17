// src/components/LeaveApprovedEmail.jsx

import React from 'react';
import { Typography, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const LeaveApprovedEmail = ({ employeeName, leaveDates }) => (
  <Box
    sx={{
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '8px',
      width: '80%',
      margin: '0 auto',
    }}
  >
    <Typography variant="h4" sx={{ color: '#4CAF50' }}>
      Leave Request Approved
    </Typography>
    <Typography variant="body1">
      Dear {employeeName},
    </Typography>
    <Typography variant="body1">
      We are pleased to inform you that your leave request for {leaveDates} has been approved. Enjoy your time off!
    </Typography>
    <Typography variant="body1">
      If you have any questions, feel free to reach out to the HR department.
    </Typography>
    <Typography variant="body1">
      Best regards,<br />
      Your Company Name
    </Typography>
    <Typography variant="body2" sx={{ marginTop: '20px', fontSize: '0.9em', color: '#777' }}>
      This is an automated message. Please do not reply to this email.
    </Typography>
  </Box>
);

export default LeaveApprovedEmail;
