import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import {
  Box,
  Button,
  Grid,
  TextField,
  ListSubheader,
  Typography,
  MenuItem,
} from '@mui/material';
import EmployeesTable from './EmployeesTable';
import PageContainer from '../../components/PageContainer';
import OfficesTable from './OfficesTable';
import AddEmployeeModal from './AddEmployeeModal';
import AddOfficeModal from './AddOfficeModal';
import { useFetchData } from '../../hooks/useFetchData';
import offices from '../../requests/offices';
import employees from './../../requests/employees';
import { useForm } from '../../hooks/useForm';
import TextFieldSelect from '../../components/TextFieldSelect';
import { ExportDataContext } from './../../context/DataExport';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import { PageHeaderContainer } from '../../styles/styledComponents';

const EmployeesPage = () => {
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [addOfficeModal, setAddOfficeModal] = useState(false);
  const [office, setOffice] = useState('');
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };
  const { headers, fileName, data, changeDataExport } =
    useContext(ExportDataContext);

  const {
    state: allEmployees,
    error,
    setState,
    fetchData: allEmployeesFetchData,
  } = useFetchData(employees.getAllEmployees);

  const {
    state: allOffices,
    error: allOfficesErr,
    fetchData: allOfficesFetchData,
  } = useFetchData(offices.getAllOffices);

  const { onChange, onSubmit, setFieldValue, values } = useForm(
    searchCallback,
    {
      officeId: '',
      search: '',
    }
  );

  const searchEmployees = async () => {
    const resultSearchEmployees = await employees.getEmployeesByParams(
      userAction,
      values
    );
    setState(resultSearchEmployees);
  };

  function searchCallback() {
    searchEmployees();
  }

  const handleAddEmployeeModal = () => setAddEmployeeModal(!addEmployeeModal);
  const handleAddOfficeModal = () => setAddOfficeModal(!addOfficeModal);

  useEffect(() => {
    changeDataExport('Employees', allEmployees);
  }, [allEmployees]);

  return (
    <>
      <PageContainer>
        <PageHeaderContainer>
          <Typography sx={{ m: 1 }} variant="h4">
            Employees
          </Typography>

          <Box sx={{ m: 1 }}>
         
            <Button
              onClick={handleAddEmployeeModal}
              color="secondary"
              variant="contained"
            >
              Add Employee
            </Button>
          </Box>
        </PageHeaderContainer>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Search Employee"
                onChange={onChange}
                value={values.search}
                variant="outlined"
                name="search"
              />
            </Grid>
            <Grid item xs={3}>
              <TextFieldSelect
                value={office}
                onChange={event => {
                  setFieldValue('officeId', event.target.value);
                  setOffice(event.target.value);
                }}
                label={'Select Office'}
              >
                <MenuItem value="">None</MenuItem>
                <ListSubheader>Select Office</ListSubheader>
                {allOffices
                  ? allOffices.map(office => (
                    <MenuItem key={office.officeId} value={office.officeId}>
                      {office.officeName}
                    </MenuItem>
                  ))
                  : null}
              </TextFieldSelect>
            </Grid>
            <Grid sx={{ alignSelf: 'center' }} item xs={1}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={onSubmit}
                sx={{ p: '14px' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        {allEmployees ? (
          <Box sx={{ mt: 3 }}>
            <EmployeesTable
              error={error}
              allEmployees={allEmployees}
              allOffices={allOffices}
              fetchData={allEmployeesFetchData}
            />
          </Box>
        ) : null}

        <PageHeaderContainer sx={{ mt: 5 }}>
          <Typography sx={{ m: 1 }} variant="h4">
            Offices
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleAddOfficeModal}
            >
              Add Office
            </Button>
          </Box>
        </PageHeaderContainer>
        {allOffices ? (
          <>
            <Box sx={{ mt: 3 }}>
              <OfficesTable allOffices={allOffices} fetchData={allOfficesFetchData} error={allOfficesErr} />
            </Box>
            <AddOfficeModal
              fetchData={allOfficesFetchData}
              open={addOfficeModal}
              close={handleAddOfficeModal}
            />
            <AddEmployeeModal
              open={addEmployeeModal}
              close={handleAddEmployeeModal}
              allOffices={allOffices}
              fetchData={allEmployeesFetchData}
            />
          </>
        ) : null}
      </PageContainer>
    </>
  );
};

export default EmployeesPage;
