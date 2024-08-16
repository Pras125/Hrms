import React from 'react';
import { Typography, Box } from '@mui/material';
import CustomTable from '../../components/common/Table';

function PayrollRecords() {
  const headers = [
    'Employee',
    'Pay Period',
    'Gross Pay',
    'Deductions',
    'Net Pay',
  ];
  const data = [
    {
      employee: 'John Doe',
      payPeriod: 'June 2023',
      grossPay: '$5000',
      deductions: '$1000',
      netPay: '$4000',
    },
    {
      employee: 'Jane Smith',
      payPeriod: 'June 2023',
      grossPay: '$6000',
      deductions: '$1200',
      netPay: '$4800',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payroll Records
      </Typography>
      <CustomTable headers={headers} data={data} />
    </Box>
  );
}

export default PayrollRecords;
