// src/pages/LeaveManagement/LeaveApproval.jsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TablePagination,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import  db  from '../../config/Firebase'; // Adjust the path based on your project structure

const ViewModal = ({ open, onClose, request }) => {
  if (!request) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: 'white',
          margin: 'auto',
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Leave Request Details
        </Typography>
        <Typography>
          <strong>Employee:</strong> {request.employeeName}
        </Typography>
        <Typography>
          <strong>Start Date:</strong> {request.startDate}
        </Typography>
        <Typography>
          <strong>End Date:</strong> {request.endDate}
        </Typography>
        <Typography>
          <strong>Status:</strong> {request.status}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'leaveRequests'));
      const requests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaveRequests(requests);
    };

    fetchLeaveRequests();
  }, []);

  const handleApproval = async (id) => {
    const requestDoc = doc(db, 'leaveRequests', id);
    await updateDoc(requestDoc, { status: 'Approved' });
    setLeaveRequests((prevState) =>
      prevState.map((req) =>
        req.id === id ? { ...req, status: 'Approved' } : req,
      ),
    );
  };

  const handleRejection = async (id) => {
    const requestDoc = doc(db, 'leaveRequests', id);
    await updateDoc(requestDoc, { status: 'Rejected' });
    setLeaveRequests((prevState) =>
      prevState.map((req) =>
        req.id === id ? { ...req, status: 'Rejected' } : req,
      ),
    );
  };

  const handleView = (id) => {
    const request = leaveRequests.find((req) => req.id === id);
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRequests = leaveRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApproval(request.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRejection(request.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleView(request.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={leaveRequests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ViewModal
        open={modalOpen}
        onClose={handleClose}
        request={selectedRequest}
      />
    </Paper>
  );
};

export default LeaveApproval;















{/*import React from 'react';
import { Typography, Box } from '@mui/material';
import CustomTable from '../../components/common/Table';

function LeaveApproval() {
  const headers = [
    'Employee',
    'Start Date',
    'End Date',
    'Leave Type',
    'Status',
    'Actions',
  ];
  const data = [
    {
      employee: 'John Doe',
      startDate: '2023-07-01',
      endDate: '2023-07-05',
      leaveType: 'Vacation',
      status: 'Pending',
      actions: 'Approve/Reject',
    },
    {
      employee: 'Jane Smith',
      startDate: '2023-07-10',
      endDate: '2023-07-12',
      leaveType: 'Sick',
      status: 'Pending',
      actions: 'Approve/Reject',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leave Approval
      </Typography>
      <CustomTable headers={headers} data={data} />
    </Box>
  );
}

export default LeaveApproval;
*/}