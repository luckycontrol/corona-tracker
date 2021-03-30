import { useEffect, useState } from "react";
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, [setDailyData]);

  const lineChart = (

    dailyData.length ? (
      <Line 
        data = {{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "감염자",
            borderColor: "#3333ff",
            fill: true,
          }, {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "사망자",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          }],
        }}
      />
    ) : null
  );

  const barChart = (
    confirmed ? (
      <Bar 
        data={{
          labels: ['감염자', '감염 후 회복자', '사망자'],
          datasets: [{
            labels: '사람들',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }]
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `${country}의 현재 상태`},
        }}
      />
    ) : null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
};

export default Chart;
