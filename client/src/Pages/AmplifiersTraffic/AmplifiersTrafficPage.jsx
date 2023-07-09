import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Grid,
  ListSubheader,
} from '@mui/material';
import PageContainer from '../../components/PageContainer';
import AmplifiersTrafficTable from './AmplifiersTrafficTable';
import locations from '../../requests/locations';
import { useFetchData } from '../../hooks/useFetchData';
import logs from './../../requests/logs';
import { useForm } from '../../hooks/useForm';
import TextFieldSelect from '../../components/TextFieldSelect';
import Banner from '../../components/Banner';
import { PageHeaderContainer } from '../../styles/styledComponents';

const AmplifiersTrafficPage = () => {
  const [warehouse, setWarehouse] = useState('');
  const [country, setCountry] = useState('');
  const { state: allCountries } = useFetchData(locations.getAllCountries);
  const { state: allLocations, setState: setLocationState } = useFetchData(
    locations.getAllLocations
  );
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };
  const {
    state: allAmplifiersTraffic,
    error,
    setState,
  } = useFetchData(logs.GetAllLogsAmplifierTraffic);

  const getLocationByCountry = async countryId => {
    const country = {
      countryId: countryId,
    };
    const result = await locations.getLocationsByCountryId(userAction, country);
    if (result.length > 0) {
      setLocationState(result);
    } else {
      setLocationState([]);
    }
  };
  const getLocations = async countryId => {
    const result = await locations.getAllLocations(userAction);
    if (result.length > 0) {
      setLocationState(result);
    } else {
      setLocationState([]);
    }
  };


  useEffect(() => {
    values.locationId = '';
    setWarehouse('');

    if (!country) {
      getLocations();
    } else {
      getLocationByCountry(country);
    }


  }, [country]);

  const { onChange, onSubmit, setFieldValue, values } = useForm(
    searchCallback,
    {
      locationId: '',
      countryId: '',
      search: '',
    }
  );

  const searchLogs = async () => {
    const resultGetAllProductsBySearch =
      await logs.GetAllLogsProductsAmplifiersTrafficByParams(
        userAction,
        values
      );
    setState(resultGetAllProductsBySearch);
  };

  function searchCallback() {
    searchLogs();
  }

  return (
    <>
      <PageContainer>
        {country ? <Banner country={country} /> : <Banner country={''} />}
        <PageHeaderContainer>
          <Typography sx={{ m: 1 }} variant="h4">
            Amplifiers Traffic
          </Typography>
        </PageHeaderContainer>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Search Product"
                onChange={onChange}
                value={values.search}
                variant="outlined"
                name="search"
              />
            </Grid>
            <Grid item xs={3}>
              <TextFieldSelect
                value={country}
                onChange={event => {
                  setFieldValue('locationId', '');
                  setFieldValue('countryId', event.target.value);
                  setCountry(event.target.value);
                }}
                label={'Select country'}
              >
                <MenuItem value="">None</MenuItem>
                <ListSubheader>Select Country</ListSubheader>
                {allCountries
                  ? allCountries.map(country => (
                    <MenuItem
                      key={country.countryId}
                      value={country.countryId}
                    >
                      {country.countryName}
                    </MenuItem>
                  ))
                  : null}
              </TextFieldSelect>
            </Grid>
            <Grid item xs={3}>
              <TextFieldSelect
                value={warehouse}
                onChange={event => {
                  setFieldValue('locationId', event.target.value);
                  setWarehouse(event.target.value);
                }}
                label={'Select Location'}
              >
                <MenuItem value="">None</MenuItem>
                <ListSubheader>Select Location</ListSubheader>
                {allLocations
                  ? allLocations.map(location => (
                    <MenuItem
                      key={location.locationId}
                      value={location.locationId}
                    >
                      {location.locationName}
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

        <Box sx={{ mt: 3 }}>
          <AmplifiersTrafficTable
            allAmplifiersTraffic={allAmplifiersTraffic}
            error={error}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default AmplifiersTrafficPage;
