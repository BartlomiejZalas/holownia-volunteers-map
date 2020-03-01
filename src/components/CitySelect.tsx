import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { City } from '../data/cities';

interface Props {
    setCity: (city: City) => void;
    cities: City[];
    currentCity: City;
}

export const CitySelect: React.FC<Props> = ({ setCity, cities, currentCity }) => {

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Miasto</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentCity.name}
                onChange={e => setCity({ name: e.target.value as string })}
            >
                {cities.map((c: City) => <MenuItem value={c.name} key={c.name}>{c.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}