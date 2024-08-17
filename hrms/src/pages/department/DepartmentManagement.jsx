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

const initialDepartments = [
  { id: 1, departmentid: 'DEPT001', name: 'Human Resources', managerID: 'EMP002', createdAt: '2022-01-15', updatedAt: '2022-01-15' },
  { id: 2, departmentid: 'DEPT002', name: 'Information Technology', managerID: 'EMP006', createdAt: '2022-01-16', updatedAt: '2022-01-16' },
  { id: 3, departmentid: 'DEPT003', name: 'Finance', managerID: 'EMP013', createdAt: '2022-01-17', updatedAt: '2022-01-17' },
  { id: 4, departmentid: 'DEPT004', name: 'Marketing', managerID: 'EMP009', createdAt: '2022-01-18', updatedAt: '2022-01-18' },
  { id: 5, departmentid: 'DEPT005', name: 'Sales', managerID: 'EMP010', createdAt: '2022-01-19', updatedAt: '2022-01-19' },
  { id: 6, departmentid: 'DEPT006', name: 'Customer Service', managerID: 'EMP015', createdAt: '2022-01-20', updatedAt: '2022-01-20' },
  { id: 7, departmentid: 'DEPT007', name: 'Research and Development', managerID: 'EMP001', createdAt: '2022-01-21', updatedAt: '2022-01-21' },
  { id: 8, departmentid: 'DEPT008', name: 'Legal', managerID: 'EMP008', createdAt: '2022-01-22', updatedAt: '2022-01-22' },
  { id: 9, departmentid: 'DEPT009', name: 'Operations', managerID: 'EMP011', createdAt: '2022-01-23', updatedAt: '2022-01-23' },
  { id: 10, departmentid: 'DEPT010', name: 'Quality Assurance', managerID: 'EMP014', createdAt: '2022-01-24', updatedAt: '2022-01-24' },
  { id: 11, departmentid: 'DEPT011', name: 'Supply Chain', managerID: 'EMP003', createdAt: '2022-01-25', updatedAt: '2022-01-25' },
  { id: 12, departmentid: 'DEPT012', name: 'Public Relations', managerID: 'EMP004', createdAt: '2022-01-26', updatedAt: '2022-01-26' },
  { id: 13, departmentid: 'DEPT013', name: 'Facilities Management', managerID: 'EMP005', createdAt: '2022-01-27', updatedAt: '2022-01-27' },
  { id: 14, departmentid: 'DEPT014', name: 'Product Management', managerID: 'EMP007', createdAt: '2022-01-28', updatedAt: '2022-01-28' },
  { id: 15, departmentid: 'DEPT015', name: 'Training and Development', managerID: 'EMP012', createdAt: '2022-01-29', updatedAt: '2022-01-29' },
];

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [open, setOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = (department = null) => {
    setEditingDepartment(department || {
      departmentid: '',
      name: '',
      managerID: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDepartment(null);
  };

  const handleSave = () => {
    if (editingDepartment.id) {
      setDepartments(departments.map(d => d.id === editingDepartment.id ? editingDepartment : d));
    } else {
      setDepartments([...departments, { ...editingDepartment, id: departments.length + 1, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const handleMultipleDelete = () => {
    setDepartments(departments.filter(d => !selected.includes(d.id)));
    setSelected([]);
  };

  const filteredDepartments = departments.filter(department => 
    Object.values(department).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
      const newSelected = filteredDepartments.map((n) => n.id);
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
            Department Records
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
          <Button
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            Add Department
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
                    indeterminate={selected.length > 0 && selected.length < filteredDepartments.length}
                    checked={filteredDepartments.length > 0 && selected.length === filteredDepartments.length}
                    onChange={handleSelectAllClick}
                  />
                </StyledTableCell>
                <StyledTableCell>Department ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Manager ID</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Updated At</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDepartments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((department) => {
                  const isItemSelected = isSelected(department.id);
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, department.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={department.id}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </StyledTableCell>
                      <StyledTableCell>{department.departmentid}</StyledTableCell>
                      <StyledTableCell>{department.name}</StyledTableCell>
                      <StyledTableCell>{department.managerID}</StyledTableCell>
                      <StyledTableCell>{department.createdAt}</StyledTableCell>
                      <StyledTableCell>{department.updatedAt}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton onClick={() => handleOpen(department)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(department.id)}>
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
          rowsPerPageOptions={[10, 30, 50]}
          component="div"
          count={filteredDepartments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingDepartment && editingDepartment.id ? 'Edit Department' : 'Add Department'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Department ID"
            fullWidth
            value={editingDepartment?.departmentid || ''}
            onChange={(e) => setEditingDepartment({ ...editingDepartment, departmentid: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editingDepartment?.name || ''}
            onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Manager ID"
            fullWidth
            value={editingDepartment?.managerID || ''}
            onChange={(e) => setEditingDepartment({ ...editingDepartment, managerID: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentManagement;