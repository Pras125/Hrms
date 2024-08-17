import React from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LeaveApprovedEmail from './LeaveApprovedEmail';
import LeaveRejectedEmail from './LeaveRejectedEmail';
import LeaveStatusUpdatedEmail from './LeaveStatusUpdatedEmail';

function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      message: 'Your leave request has been approved',
      date: '2023-07-01',
    },
    {
      id: 2,
      message: 'New performance review is due by end of the week',
      date: '2023-07-02',
    },
    {
      id: 3,
      message: 'Payroll for June has been processed',
      date: '2023-07-03',
    },
  ];

  const handleDelete = (id) => {
    console.log(`Delete notification with id: ${id}`);
    // Implement delete notification logic here
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
              primary={notification.message}
              secondary={notification.date}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default NotificationCenter;
