import { opening_hour } from '../models/doctor.model';

interface sorter {
  SUN: 0;
  MON: 1;
  TUE: 2;
  WED: 3;
  THU: 4;
  FRI: 5;
  SAT: 6;
}

export const daySortHelper = (value: opening_hour[]): any => {
  let result = [];
  const sorter: sorter = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
  };

  result = value.sort((a, b): any => {
    let day1 = a.day;
    let day2 = b.day;
    return sorter[day1 as keyof object] - sorter[day2 as keyof object];
  });

  return result;
};

export const hourFilterHelper = (value: opening_hour[], weekday: string): any => {
  let hours: {
    start: string;
    end: string;
  } = {
    start: '',
    end: ''
  };

  value.map((e: any) => {
    if (weekday?.toUpperCase() === e.day) {
      hours = {
        start: e.start,
        end: e.end
      };
    }
  });

  return hours;
};
