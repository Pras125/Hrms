import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import CustomTable from '../../components/common/Table';

function PayrollReport() {
  const headers = [
    'Department',
    'Employee Count',
    'Total Gross Pay',
    'Total Deductions',
    'Total Net Pay',
  ];
  const data = [
    {
      department: 'IT',
      employeeCount: 15,
      totalGrossPay: '$75,000',
      totalDeductions: '$15,000',
      totalNetPay: '$60,000',
    },
    {
      department: 'HR',
      employeeCount: 8,
      totalGrossPay: '$48,000',
      totalDeductions: '$9,600',
      totalNetPay: '$38,400',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payroll Report
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Generate Report
      </Button>
      <CustomTable headers={headers} data={data} />
    </Box>
  );
}

export default PayrollReport;
