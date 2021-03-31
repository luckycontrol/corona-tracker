import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import cx from 'classnames'

import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, deaths, lastUpdate, recovered } }) => {

  const dateBuilder = (d) => {
    let months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let date = d.getDate();
    let day = days[d.getDay()];

    return `${year}년 ${month} ${date}일 ${day}`;
  }

  if(!confirmed) {
    return 'Loading';
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>감염자</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={confirmed.value} duration={2.5} separator=","
              />
            </Typography>
            <Typography color="textSecondary">{dateBuilder(new Date(lastUpdate))}</Typography>
            <Typography variant="body2">COVID-19 로 인한 감염자 수</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>감염 후 회복</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered.value} duration={2.5} separator=","
              />
            </Typography>
            <Typography color="textSecondary">{dateBuilder(new Date(lastUpdate))}</Typography>
            <Typography variant="body2">COVID-19 로 인한 감염 후 회복자 수</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>사망자</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths.value} duration={2.5} separator=","
              />
            </Typography>
            <Typography color="textSecondary">{dateBuilder(new Date(lastUpdate))}</Typography>
            <Typography variant="body2">COVID-19 로 인한 사망자 수</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
};

export default Cards;
