import React from 'react';
import 'date-fns';
import { FormControl } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleDate } from '../data/simpleDate';

interface Props {
    setDate: (date: SimpleDate | null) => void;
    selectedDate: SimpleDate | null;
}

export const DateSelect: React.FC<Props> = ({ selectedDate, setDate }) => {
    console.log(selectedDate, selectedDate!.year, selectedDate!.month, selectedDate!.day);
    return (
        <FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Wybierz datę"
                    format="dd-MM-yyyy"
                    value={selectedDate ? new Date(selectedDate.year, selectedDate.month, selectedDate.day) : new Date()}
                    minDate={new Date()}
                    onChange={(date: any) => {
                        setDate({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() })
                    }}
                />
            </MuiPickersUtilsProvider>
        </FormControl>
    )
}