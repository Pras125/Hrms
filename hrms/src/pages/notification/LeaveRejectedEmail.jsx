// src/components/LeaveRejectedEmail.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const LeaveRejectedEmail = ({ employeeName, leaveDates }) => (
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
    <Typography variant="h4" sx={{ color: '#F44336' }}>
      Leave Request Rejected
    </Typography>
    <Typography variant="body1">
      Dear {employeeName},
    </Typography>
    <Typography variant="body1">
      We regret to inform you that your leave request for {leaveDates} has been rejected. Please contact your manager or HR for further details or to discuss alternative arrangements.
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

export default LeaveRejectedEmail;
