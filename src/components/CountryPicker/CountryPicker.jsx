import { NativeSelect, FormControl } from '@material-ui/core'

import styles from './CountryPicker.module.css'

import { fetchCountries } from '../../api'
import { useEffect, useState } from 'react';

const CountryPicker = ({ _handleCountryChange }) => {

  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    }
    
    fetchAPI();
  }, [setFetchedCountries])

  return (

    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="Glbal" onChange={(e) => _handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {
          fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)
        }
      </NativeSelect>
    </FormControl>
  )
};

export default CountryPicker;
