import React, { useState, useEffect } from 'react';
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
import { Add, Edit, Delete, FilterList, GetApp, Search } from '@mui/icons-material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)({
  padding: 0,
});

const initialPayrollRecords = [
  {
    id: 1,
    payPeriodStart: '2024-08-01',
    payPeriodEnd: '2024-08-15',
    salary: 5000,
    deductions: 500,
    netPay: 4500,
    status: 'processed',
    createdAt: '2024-08-16',
    updatedAt: '2024-08-16',
  },
];

const PayrollManagement = () => {
  const [records, setRecords] = useState(initialPayrollRecords);
  const [open, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = (record = null) => {
    setEditingRecord(record || {
      payPeriodStart: '',
      payPeriodEnd: '',
      salary: '',
      deductions: '',
      netPay: '',
      status: 'pending',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRecord(null);
  };

  const handleSave = () => {
    if (editingRecord.id) {
      setRecords(records.map(r => r.id === editingRecord.id ? editingRecord : r));
    } else {
      setRecords([...records, { ...editingRecord, id: records.length + 1, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const handleMultipleDelete = () => {
    setRecords(records.filter(r => !selected.includes(r.id)));
    setSelected([]);
  };

  const filteredRecords = records.filter(record => 
    (filterStatus === 'all' || record.status === filterStatus) &&
    Object.values(record).some(value => 
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

  const handleGenerateReport = () => {
    setReportDialogOpen(true);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');
    setReportDialogOpen(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRecords.map((n) => n.id);
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
            Payroll Records
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
              <MenuItem value="processed">Processed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <Button
            startIcon={<FilterList />}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
          <Button
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            Add Record
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
                    indeterminate={selected.length > 0 && selected.length < filteredRecords.length}
                    checked={filteredRecords.length > 0 && selected.length === filteredRecords.length}
                    onChange={handleSelectAllClick}
                  />
                </StyledTableCell>
                <StyledTableCell>Payroll ID</StyledTableCell>
                <StyledTableCell>Pay Period Start</StyledTableCell>
                <StyledTableCell>Pay Period End</StyledTableCell>
                <StyledTableCell>Salary</StyledTableCell>
                <StyledTableCell>Deductions</StyledTableCell>
                <StyledTableCell>Net Pay</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Updated At</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => {
                  const isItemSelected = isSelected(record.id);
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, record.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={record.id}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </StyledTableCell>
                      <StyledTableCell>{record.id}</StyledTableCell>
                      <StyledTableCell>{record.payPeriodStart}</StyledTableCell>
                      <StyledTableCell>{record.payPeriodEnd}</StyledTableCell>
                      <StyledTableCell>{record.salary}</StyledTableCell>
                      <StyledTableCell>{record.deductions}</StyledTableCell>
                      <StyledTableCell>{record.netPay}</StyledTableCell>
                      <StyledTableCell>{record.status}</StyledTableCell>
                      <StyledTableCell>{record.createdAt}</StyledTableCell>
                      <StyledTableCell>{record.updatedAt}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton onClick={() => handleOpen(record)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(record.id)}>
                          <Delete />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
          <Typography>
            Showing {page + 1} of {Math.ceil(filteredRecords.length / rowsPerPage)}
          </Typography>
          <TablePagination
            rowsPerPageOptions={[10, 30, 50]}
            component="div"
            count={filteredRecords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingRecord && editingRecord.id ? 'Edit Record' : 'Add Record'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Pay Period Start"
            type="date"
            fullWidth
            value={editingRecord?.payPeriodStart || ''}
            onChange={(e) => setEditingRecord({ ...editingRecord, payPeriodStart: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Pay Period End"
            type="date"
            fullWidth
            value={editingRecord?.payPeriodEnd || ''}
            onChange={(e) => setEditingRecord({ ...editingRecord, payPeriodEnd: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Salary"
            type="number"
            fullWidth
            value={editingRecord?.salary || ''}
            onChange={(e) => setEditingRecord({ ...editingRecord, salary: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Deductions"
            type="number"
            fullWidth
            value={editingRecord?.deductions || ''}
            onChange={(e) => setEditingRecord({ ...editingRecord, deductions: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Net Pay"
            type="number"
            fullWidth
            value={editingRecord?.netPay || ''}
            onChange={(e) => setEditingRecord({ ...editingRecord, netPay: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={editingRecord?.status || ''}
              onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value })}
            >
              <MenuItem value="processed">Processed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)}>
        <DialogTitle>Payroll Report Preview</DialogTitle>
        <DialogContent>
          <Typography>This is a preview of the generated payroll report.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Close</Button>
          <Button startIcon={<GetApp />} onClick={handleDownloadReport}>Download PDF</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayrollManagement;