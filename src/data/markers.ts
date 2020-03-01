import {City} from './cities';
import { SimpleDate } from './simpleDate';

export enum MarkerType {
    ACTION, CONSTANT
};

export interface Marker {
    lat: number;
    long: number;
    description: string;
    city: City;
    hourStart: number;
    hourEnd: number;
    date: SimpleDate;
    type: MarkerType;
};

export const markers: Marker[] = [
    {
        lat: 51.110170,
        long: 17.054670,
        description: 'Wrocław, Pl. Grunwaldzki 4<br>Firma CUKUS<br>w godz. 10:00-17:00, <br>tel. 531 263 343',
        city: {name: 'Wrocław'},
        hourStart: 10,
        hourEnd: 17,
        date: {day: 29, month: 2, year: 2020},
        type: MarkerType.CONSTANT,
    },
    {
        lat: 51.1,
        long: 17.03,
        description: 'Akcja 3',
        city: {name: 'Wałbrzych'},
        hourStart: 10,
        hourEnd: 14,
        date: {day: 1, month: 3, year: 2020},
        type: MarkerType.ACTION,
    }
]