
import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LeaveApprovedEmail from './LeaveApprovedEmail';
import LeaveRejectedEmail from './LeaveRejectedEmail';
import LeaveStatusUpdatedEmail from './LeaveStatusUpdatedEmail';

function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      type: 'approved',
      employeeName: 'John Doe',
      leaveDates: 'August 20 - August 25',
      date: '2023-07-01',
    },
    {
      id: 2,
      type: 'rejected',
      employeeName: 'Jane Smith',
      leaveDates: 'September 1 - September 5',
      date: '2023-07-02',
    },
    {
      id: 3,
      type: 'updated',
      employeeName: 'Alex Johnson',
      leaveDates: 'October 10 - October 15',
      newStatus: 'Approved',
      date: '2023-07-03',
    },
  ];

  const handleDelete = (id) => {
    console.log(`Delete notification with id: ${id}`);
    // Implement delete notification logic here
  };

  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case 'approved':
        return (
          <LeaveApprovedEmail
            employeeName={notification.employeeName}
            leaveDates={notification.leaveDates}
          />
        );
      case 'rejected':
        return (
          <LeaveRejectedEmail
            employeeName={notification.employeeName}
            leaveDates={notification.leaveDates}
          />
        );
      case 'updated':
        return (
          <LeaveStatusUpdatedEmail
            employeeName={notification.employeeName}
            leaveDates={notification.leaveDates}
            newStatus={notification.newStatus}
          />
        );
      default:
        return <Typography variant="body1">Unknown Notification Type</Typography>;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notification Center
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem
            key={notification.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(notification.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText
              primary={renderNotificationContent(notification)}
              secondary={notification.date}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default NotificationCenter;

