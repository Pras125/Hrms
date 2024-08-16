import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';

function createData(Id, Name, Department, Positions, Email) {
  return {
    Id,
    Name,
    Department,
    Positions,
    Email,
  };
}

const rows = [
  createData(1, 'John Doe', 'IT', 'Developer', 'john@example.com'),
  createData(2, 'Jane Smith', 'HR', 'Manager', 'jane@example.com'),
  createData(3, 'Alice Johnson', 'Finance', 'Accountant', 'alice@example.com'),
  createData(4, 'Bob Wilson', 'Marketing', 'Specialist', 'bob@example.com'),
  createData(5, 'Charlie Brown', 'Sales', 'Representative', 'charlie@example.com'),
  createData(6, 'David Lee', 'IT', 'System Admin', 'david@example.com'),
  createData(7, 'Emily Davis', 'HR', 'Recruiter', 'emily@example.com'),
  createData(8, 'Frank Harris', 'Finance', 'Analyst', 'frank@example.com'),
  createData(9, 'Grace Kim', 'Marketing', 'Coordinator', 'grace@example.com'),
  createData(10, 'Henry Thompson', 'Sales', 'Executive', 'henry@example.com'),
  createData(11, 'Irene White', 'IT', 'Support Engineer', 'irene@example.com'),
  createData(12, 'Jack Green', 'HR', 'Assistant', 'jack@example.com'),
  createData(13, 'Kelly Baker', 'Finance', 'Controller', 'kelly@example.com'),
  createData(14, 'Liam Scott', 'Marketing', 'Manager', 'liam@example.com'),
  createData(15, 'Mia Clark', 'Sales', 'Lead', 'mia@example.com'),  
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'Id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'Name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'Department', numeric: false, disablePadding: false, label: 'Department' },
  { id: 'Positions', numeric: false, disablePadding: false, label: 'Positions' },
  { id: 'Email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ padding: '0 4px' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all employees',
            }}
            size="small"
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ padding: '4px' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function NewEmployeeForm({ onClose, onSubmit }) {
  const [newEmployee, setNewEmployee] = React.useState({
    Name: '',
    Department: '',
    Positions: '',
    Email: '',
  });

  const handleChange = (event) => {
    setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    onSubmit(newEmployee);
    onClose();
  };

  return (
    <>
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="Name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={newEmployee.Name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="Department"
          label="Department"
          type="text"
          fullWidth
          variant="standard"
          value={newEmployee.Department}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="Positions"
          label="Position"
          type="text"
          fullWidth
          variant="standard"
          value={newEmployee.Positions}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="Email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={newEmployee.Email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, onSearchChange, onAddNewEmployee, onDeleteSelected } = props;
  const [openNewEmployeeModal, setOpenNewEmployeeModal] = React.useState(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={onDeleteSelected}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        </>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Employees
        </Typography>
      )}

      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained"
        onClick={() => setOpenNewEmployeeModal(true)}
        sx={{ ml: 2, fontSize: '0.85rem', padding: '6px 10px' }}
      >
        + Add 
      </Button>

      <Dialog open={openNewEmployeeModal} onClose={() => setOpenNewEmployeeModal(false)}>
        <NewEmployeeForm 
          onClose={() => setOpenNewEmployeeModal(false)} 
          onSubmit={(newEmployee) => {
            onAddNewEmployee(newEmployee);
            setOpenNewEmployeeModal(false);
          }} 
        />
      </Dialog>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onAddNewEmployee: PropTypes.func.isRequired,
  onDeleteSelected: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [employeeData, setEmployeeData] = React.useState(rows);
  const [editingId, setEditingId] = React.useState(null);
  const [editedEmployee, setEditedEmployee] = React.useState({});
  const [editingCell, setEditingCell] = React.useState({ id: null, field: null });
  const [editedValue, setEditedValue] = React.useState('');
  const [dense, setDense] = React.useState(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = employeeData.map((n) => n.Id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Id) => {
    const selectedIndex = selected.indexOf(Id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleAddNewEmployee = (newEmployee) => {
    const newId = Math.max(...employeeData.map(e => e.Id)) + 1;
    setEmployeeData([...employeeData, { ...newEmployee, Id: newId }]);
  };


  const handleEditCell = (id, field, value) => {
    setEditingCell({ id, field });
    setEditedValue(value);
  };
  
  const handleSaveEdit = () => {
    setEmployeeData(employeeData.map(employee => 
      employee.Id === editingCell.id 
        ? { ...employee, [editingCell.field]: editedValue } 
        : employee
    ));
    setEditingCell({ id: null, field: null });
    setEditedValue('');
  };
  
  const handleCancelEdit = () => {
    setEditingCell({ id: null, field: null });
    setEditedValue('');
  };


  const handleEditChange = (event) => {
    setEditedValue(event.target.value);
  };



  const handleDeleteEmployee = (id) => {
    setEmployeeData(employeeData.filter(employee => employee.Id !== id));
  };

  const handleDeleteSelected = () => {
    setEmployeeData(employeeData.filter(employee => !selected.includes(employee.Id)));
    setSelected([]);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const filteredRows = employeeData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  return (
    <Box sx={{ width: '100%', fontSize: '0.85rem' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          onSearchChange={handleSearchChange}
          onAddNewEmployee={handleAddNewEmployee}
          onDeleteSelected={handleDeleteSelected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.Id);
                const labelId = `enhanced-table-checkbox-${index}`;
                const isEditing = editingId === row.Id;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.Id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.Id}
                    selected={isItemSelected}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                      '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ padding: '0 4px' }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" sx={{ padding: '4px', fontSize: '0.8rem' }}>
                      {row.Id}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '4px', fontSize: '0.8rem' }}>
                      {isEditing ? (
                        <TextField
                          name="Name"
                          value={editedEmployee.Name || row.Name}
                          onChange={handleEditChange}
                          variant="standard"
                          size="small"
                        />
                      ) : row.Name}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '4px', fontSize: '0.8rem' }}>
                      {isEditing ? (
                        <TextField
                          name="Department"
                          value={editedEmployee.Department || row.Department}
                          onChange={handleEditChange}
                          variant="standard"
                          size="small"
                        />
                      ) : row.Department}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '4px', fontSize: '0.8rem' }}>
                      {isEditing ? (
                        <TextField
                          name="Positions"
                          value={editedEmployee.Positions || row.Positions}
                          onChange={handleEditChange}
                          variant="standard"
                          size="small"
                        />
                      ) : row.Positions}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '4px', fontSize: '0.8rem' }}>
                      {isEditing ? (
                        <TextField
                          name="Email"
                          value={editedEmployee.Email || row.Email}
                          onChange={handleEditChange}
                          variant="standard"
                          size="small"
                        />
                      ) : row.Email}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '4px', fontSize: '0.8rem' }}>
                      {isEditing ? (
                        <>
                          <IconButton onClick={handleSaveEdit} size="small">
                            <SaveIcon fontSize="small" />
                          </IconButton>
                          <IconButton onClick={handleCancelEdit} size="small">
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={(e) => {
                            e.stopPropagation();
                            handleEditEmployee(row.Id);
                          }} size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEmployee(row.Id);
                          }} size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 30, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ fontSize: '0.85rem' }}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}