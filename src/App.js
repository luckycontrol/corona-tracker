import "./App.css";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { useEffect, useState } from "react";

import coronaImage from './images/image.png';

const App = () => {
  let [data, setData] = useState({});
  let [country, setCountry] = useState("");

  const _handleCountryChange = async (country) => {

    const fetchedData = await fetchData(country);

    setData(fetchedData);
    setCountry(country);
  }

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();

      setData(data);
    };

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker _handleCountryChange={_handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
