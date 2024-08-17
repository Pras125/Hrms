import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  styled,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)({
  padding: 8,
});

const initialEmployees = [
  { id: 1, userID: 'EMP001', department: 'IT', position: 'Developer', contactInfo: { phone: '123-456-7890', address: '123 Main St' }, employmentDate: '2022-01-15', status: 'active', createdAt: '2022-01-15', updatedAt: '2022-01-15' },
  { id: 2, userID: 'EMP002', department: 'HR', position: 'Manager', contactInfo: { phone: '234-567-8901', address: '456 Elm St' }, employmentDate: '2021-05-20', status: 'active', createdAt: '2021-05-20', updatedAt: '2021-05-20' },
  { id: 3, userID: 'EMP003', department: 'Finance', position: 'Accountant', contactInfo: { phone: '345-678-9012', address: '789 Oak St' }, employmentDate: '2023-03-10', status: 'active', createdAt: '2023-03-10', updatedAt: '2023-03-10' },
  { id: 4, userID: 'EMP004', department: 'Marketing', position: 'Coordinator', contactInfo: { phone: '456-789-0123', address: '101 Pine St' }, employmentDate: '2022-09-01', status: 'on leave', createdAt: '2022-09-01', updatedAt: '2022-09-01' },
  { id: 5, userID: 'EMP005', department: 'Sales', position: 'Representative', contactInfo: { phone: '567-890-1234', address: '202 Cedar St' }, employmentDate: '2023-01-05', status: 'active', createdAt: '2023-01-05', updatedAt: '2023-01-05' },
  { id: 6, userID: 'EMP006', department: 'IT', position: 'System Admin', contactInfo: { phone: '678-901-2345', address: '303 Birch St' }, employmentDate: '2021-11-11', status: 'active', createdAt: '2021-11-11', updatedAt: '2021-11-11' },
  { id: 7, userID: 'EMP007', department: 'HR', position: 'Recruiter', contactInfo: { phone: '789-012-3456', address: '404 Maple St' }, employmentDate: '2022-07-20', status: 'active', createdAt: '2022-07-20', updatedAt: '2022-07-20' },
  { id: 8, userID: 'EMP008', department: 'Finance', position: 'Analyst', contactInfo: { phone: '890-123-4567', address: '505 Walnut St' }, employmentDate: '2023-02-14', status: 'active', createdAt: '2023-02-14', updatedAt: '2023-02-14' },
  { id: 9, userID: 'EMP009', department: 'Marketing', position: 'Manager', contactInfo: { phone: '901-234-5678', address: '606 Spruce St' }, employmentDate: '2021-08-30', status: 'active', createdAt: '2021-08-30', updatedAt: '2021-08-30' },
  { id: 10, userID: 'EMP010', department: 'Sales', position: 'Manager', contactInfo: { phone: '012-345-6789', address: '707 Fir St' }, employmentDate: '2022-04-01', status: 'active', createdAt: '2022-04-01', updatedAt: '2022-04-01' },
  { id: 11, userID: 'EMP011', department: 'IT', position: 'QA Engineer', contactInfo: { phone: '123-456-7891', address: '808 Ash St' }, employmentDate: '2023-05-15', status: 'active', createdAt: '2023-05-15', updatedAt: '2023-05-15' },
  { id: 12, userID: 'EMP012', department: 'HR', position: 'Coordinator', contactInfo: { phone: '234-567-8902', address: '909 Pine St' }, employmentDate: '2022-10-10', status: 'on leave', createdAt: '2022-10-10', updatedAt: '2022-10-10' },
  { id: 13, userID: 'EMP013', department: 'Finance', position: 'Controller', contactInfo: { phone: '345-678-9013', address: '1010 Oak St' }, employmentDate: '2021-12-01', status: 'active', createdAt: '2021-12-01', updatedAt: '2021-12-01' },
  { id: 14, userID: 'EMP014', department: 'Marketing', position: 'Designer', contactInfo: { phone: '456-789-0124', address: '1111 Elm St' }, employmentDate: '2023-06-20', status: 'active', createdAt: '2023-06-20', updatedAt: '2023-06-20' },
  { id: 15, userID: 'EMP015', department: 'Sales', position: 'Account Executive', contactInfo: { phone: '567-890-1235', address: '1212 Maple St' }, employmentDate: '2022-03-15', status: 'terminated', createdAt: '2022-03-15', updatedAt: '2022-03-15' },
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = (employee = null) => {
    setEditingEmployee(employee || {
      userID: '',
      department: '',
      position: '',
      contactInfo: { phone: '', address: '' },
      employmentDate: '',
      status: 'active',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEmployee(null);
  };

  const handleSave = () => {
    if (editingEmployee.id) {
      setEmployees(employees.map(e => e.id === editingEmployee.id ? editingEmployee : e));
    } else {
      setEmployees([...employees, { ...editingEmployee, id: employees.length + 1, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const handleMultipleDelete = () => {
    setEmployees(employees.filter(e => !selected.includes(e.id)));
    setSelected([]);
  };

  const filteredEmployees = employees.filter(employee => 
    (filterStatus === 'all' || employee.status === filterStatus) &&
    Object.values(employee).some(value => 
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredEmployees.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Records
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search />,
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="on leave">On Leave</MenuItem>
              <MenuItem value="terminated">Terminated</MenuItem>
            </Select>
          </FormControl>
          <Button
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            Add Employee
          </Button>
          {selected.length > 0 && (
            <Button
              startIcon={<Delete />}
              onClick={handleMultipleDelete}
            >
              Delete Selected
            </Button>
          )}
        </Toolbar>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredEmployees.length}
                    checked={filteredEmployees.length > 0 && selected.length === filteredEmployees.length}
                    onChange={handleSelectAllClick}
                  />
                </StyledTableCell>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Position</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>Employment Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Updated At</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => {
                  const isItemSelected = isSelected(employee.id);
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, employee.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={employee.id}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </StyledTableCell>
                      <StyledTableCell>{employee.userID}</StyledTableCell>
                      <StyledTableCell>{employee.department}</StyledTableCell>
                      <StyledTableCell>{employee.position}</StyledTableCell>
                      <StyledTableCell>{employee.contactInfo.phone}</StyledTableCell>
                      <StyledTableCell>{employee.contactInfo.address}</StyledTableCell>
                      <StyledTableCell>{employee.employmentDate}</StyledTableCell>
                      <StyledTableCell>{employee.status}</StyledTableCell>
                      <StyledTableCell>{employee.createdAt}</StyledTableCell>
                      <StyledTableCell>{employee.updatedAt}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton onClick={() => handleOpen(employee)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(employee.id)}>
                          <Delete />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingEmployee && editingEmployee.id ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User ID"
            fullWidth
            value={editingEmployee?.userID || ''}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, userID: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department"
            fullWidth
            value={editingEmployee?.department || ''}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            value={editingEmployee?.position || ''}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={editingEmployee?.contactInfo?.phone || ''}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, contactInfo: { ...editingEmployee.contactInfo, phone: e.target.value } })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={editingEmployee?.contactInfo?.address || ''}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, contactInfo: { ...editingEmployee.contactInfo, address: e.target.value } })}
          />
          <TextField
            margin="dense"
            label="Employment Date"
            type="date"
            fullWidth
            value={editingEmployee?.employmentDate || ''}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, employmentDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={editingEmployee?.status || ''}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="on leave">On Leave</MenuItem>
              <MenuItem value="terminated">Terminated</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeManagement;