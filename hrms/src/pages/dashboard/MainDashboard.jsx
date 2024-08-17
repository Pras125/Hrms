import React from 'react';
import Dashboard from '../../components/common/Dashboard';
import { auth } from './firebaseConfig';

function MainDashboard() {
  const dashboardItems = [
    {
      title: 'Total Employees',
      value: '150',
      description: 'Current number of employees',
    },
    {
      title: 'Leave Requests',
      value: '5',
      description: 'Pending leave requests',
    },
    {
      title: 'Upcoming Reviews',
      value: '10',
      description: 'Performance reviews due this month',
    },
    {
      title: 'Department Count',
      value: '8',
      description: 'Total number of departments',
    },
    {
      title: 'Payroll Status',
      value: 'On Track',
      description: 'Next payroll run in 5 days',
    },
    {
      title: 'New Hires',
      value: '3',
      description: 'Employees joined this month',
    },
  ];

  return <Dashboard title="HR Dashboard" items={dashboardItems} />;
}

export default MainDashboard;
