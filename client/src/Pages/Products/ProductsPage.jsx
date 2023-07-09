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
import { useForm } from '../../hooks/useForm';
import products from './../../requests/products';
import ProductsTable from './ProductsTable';
import PageContainer from '../../components/PageContainer';
import AddProductsModal from './AddProductsModal';
import locations from '../../requests/locations';
import { useFetchData } from '../../hooks/useFetchData';
import TextFieldSelect from '../../components/TextFieldSelect';
import Banner from '../../components/Banner';
import { PageHeaderContainer } from '../../styles/styledComponents';
import GapsTable from './GapsTable';

const ProductsPage = () => {
  const [warehouse, setWarehouse] = useState('');
  const [country, setCountry] = useState('');
  const [addModal, setAddModal] = useState(false);
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const {
    state: allproducts,
    error,
    fetchData,
    setState,
  } = useFetchData(products.getAllProducts);

  const { state: allCountries } = useFetchData(locations.getAllCountries);

  const { state: allLocations, setState: setLocationState } = useFetchData(
    locations.getAllLocations
  );

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

  const searchProduct = async () => {
    const resultSearchProduct = await products.getProductByParams(
      userAction,
      values
    );
    setState(resultSearchProduct);
  };

  function searchCallback() {
    searchProduct();
  }

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  return (
    <>
      <PageContainer>
        <PageHeaderContainer>
          {country ? <Banner country={country} /> : <Banner country={''} />}

          <Typography sx={{ m: 1 }} variant="h4">
            Products
          </Typography>
          <Box sx={{ m: 1 }}>
            {user?.permission !== 'Viewer' ? (
              <Button
                onClick={handleAddModal}
                color="secondary"
                variant="contained"
              >
                Add Product
              </Button>
            ) : null}
          </Box>
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
                  ? allLocations?.map(location => (
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
          <ProductsTable
            error={error}
            fetchData={fetchData}
            allproducts={allproducts}
          />
          <AddProductsModal
            fetchData={fetchData}
            open={addModal}
            close={handleAddModal}
          />
        </Box>

        {warehouse ? (
          <>
            <Box sx={{ mt: 3 }}>
              <GapsTable warehouse={warehouse} />
            </Box>
          </>
        ) : null}
      </PageContainer>
    </>
  );
};

export default ProductsPage;
