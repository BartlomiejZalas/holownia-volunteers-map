import React, { useState } from 'react';
import './App.css';
import { Box, Typography } from '@material-ui/core';
import { CitySelect } from './components/CitySelect';
import { cities } from './data/cities';
import { DateSelect } from './components/DateSelect';
import { HourSelect } from './components/HourSelect';
import { Map } from './components/Map';
import { SimpleDate } from './data/simpleDate';

const App = () => {

  const today = new Date();
  const [city, setCity] = useState(cities[0]);
  const [date, setDate] = useState<SimpleDate | null>({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() });
  const [hour, setHour] = useState<number>(12);

  return (
    <>
      <header>
        <Box display="flex" p={2} className="header">
          <img src={require('./img/logo.png')} alt="logo" />
        </Box>
      </header>
      <Box>
        <Box pl={2} pt={2}>
          <Typography variant="h5">Gdzie mogę podpisać listę poparcia?</Typography>
        </Box>
        <Box p={1} display="flex" justifyContent="flex-start">
          <Box p={1}>
            <CitySelect cities={cities} setCity={setCity} currentCity={city} />
          </Box>
          <Box p={1}>
            <DateSelect selectedDate={date} setDate={setDate} />
          </Box>
          <Box p={1}>
            <HourSelect setHour={setHour} hour={hour} />
          </Box>
        </Box>
        <Box>
          {date && <Map city={city} date={date} hour={hour} />}
        </Box>
      </Box>
    </>
  );
}

export default App;
