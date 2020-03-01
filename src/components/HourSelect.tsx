import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { hours } from '../data/hours';

interface Props {
    setHour: (hour: number) => void;
    hour: number;
}

export const HourSelect: React.FC<Props> = ({ setHour, hour }) => {

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Godzina</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hour}
                onChange={e => setHour(e.target.value as number)}
            >
                {hours.map((h: number) => <MenuItem value={h} key={h}>{String(h).padStart(2, '0')}:00</MenuItem>)}
            </Select>
        </FormControl>
    )
}