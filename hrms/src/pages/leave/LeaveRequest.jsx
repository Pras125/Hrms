import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/Firebase';
const LeaveRequestForm = () => {
  const naviagate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    leaveDuration: 'days', // Default to days
    durationValue: '', // Days or hours
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.leaveType) newErrors.leaveType = 'Leave type is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';
    if (!formData.durationValue)
      newErrors.durationValue = 'Leave duration is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Add a new document with a generated ID
        await addDoc(collection(db, 'leaverequests'), {
          ...formData,
          createdAt: new Date(), // Optionally add a timestamp
        });
        setSuccess('Leave request submitted successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: '',
          leaveDuration: 'days',
          durationValue: '',
        });
        naviagate('/leave/approval');
      } catch (error) {
        console.error('Error adding document: ', error);
        setErrors({
          submit: 'Failed to submit leave request. Please try again.',
        });
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Leave Request Form
      </Typography>

      {success && <Alert severity="success">{success}</Alert>}
      {Object.keys(errors).length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          {Object.values(errors).map((error, index) => (
            <Alert key={index} severity="error">
              {error}
            </Alert>
          ))}
        </Box>
      )}

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />

      <FormControl fullWidth margin="normal" error={!!errors.leaveType}>
        <InputLabel>Leave Type</InputLabel>
        <Select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
        >
          <MenuItem value="sick">Sick Leave</MenuItem>
          <MenuItem value="vacation">Vacation</MenuItem>
          <MenuItem value="personal">Personal</MenuItem>
        </Select>
        <FormHelperText>{errors.leaveType}</FormHelperText>
      </FormControl>

      <TextField
        fullWidth
        label="Start Date"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={!!errors.startDate}
        helperText={errors.startDate}
      />

      <TextField
        fullWidth
        label="End Date"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={!!errors.endDate}
        helperText={errors.endDate}
      />

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.leaveDuration === 'days'}
                onChange={() =>
                  setFormData({ ...formData, leaveDuration: 'days' })
                }
              />
            }
            label="Request Leave in Days"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.leaveDuration === 'hours'}
                onChange={() =>
                  setFormData({ ...formData, leaveDuration: 'hours' })
                }
              />
            }
            label="Request Leave in Hours"
          />
        </FormGroup>
      </FormControl>

      <TextField
        fullWidth
        label={`Leave Duration (${formData.leaveDuration === 'days' ? 'Days' : 'Hours'})`}
        name="durationValue"
        type="number"
        value={formData.durationValue}
        onChange={handleChange}
        margin="normal"
        error={!!errors.durationValue}
        helperText={errors.durationValue}
      />

      <TextField
        fullWidth
        label="Reason"
        name="reason"
        multiline
        rows={4}
        value={formData.reason}
        onChange={handleChange}
        margin="normal"
        error={!!errors.reason}
        helperText={errors.reason}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Submit Request
      </Button>
    </Box>
  );
};

export default LeaveRequestForm;

{
  /*import { Box, Button, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function LeaveRequest() {
  const [uname, setuname] = useState("");
  const [email, setemail] = useState("");
  const[startdate,setstartdate]=useState("")
 const[enddate,setenddate]=useState("")
   
  const StyledTextField=styled(TextField)({
    width:"400px",
    marginBottom:"15px",
  })


  return (
    <Box sx={{ display: "flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} width={800} top={0}>
      <Typography sx={{mb:3,fontSize:24}}>Leave Request Form</Typography>
      <StyledTextField label="user name" type="user" value={uname} required></StyledTextField>
      <StyledTextField label="email" type="email" value={email} required></StyledTextField>
      <StyledTextField label="Position" required></StyledTextField>
      <StyledTextField label="leave start date" type="date" value={startdate}></StyledTextField>
      <StyledTextField label="leave end date" type="date" value={enddate}></StyledTextField>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{textAlign:"left"}}>Leave Request For</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
      <FormControlLabel value="days" control={<Radio />} label="Days" />
        <FormControlLabel value="hours" control={<Radio />} label="Hours" />
        
        </RadioGroup>
        </FormControl>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{textAlign:"left"}}>Reason</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
      <FormControlLabel value="vacation" control={<Radio />} label="Vacation" />
        <FormControlLabel value="sick" control={<Radio />} label="Sick" />
        <FormControlLabel value="other" control={<Radio />} label="other" />
        
        </RadioGroup>
        </FormControl>
        <Button variant='contained' >Submit</Button>
    </Box>
  );
}

export default LeaveRequest;
*/
}











{/*import React from 'react';
import { Typography, Container, TextField, Button, Box } from '@mui/material';

function LeaveRequest() {
  const [formData, setFormData] = React.useState({
    startDate: '',
    endDate: '',
    leaveType: '',
    reason: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Leave request:', formData);
    // Implement leave request logic here
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5" gutterBottom>
        Leave Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="startDate"
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="endDate"
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="leaveType"
          label="Leave Type"
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="reason"
          label="Reason"
          name="reason"
          multiline
          rows={4}
          value={formData.reason}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default LeaveRequest;
*/}
