export type address = {
  line_1: string;
  line_2: string;
  district: string;
};

export type opening_hour = {
  start: string;
  end: string;
  isClosed: boolean;
  day: string;
};

export type doctor = {
  id: string;
  name: string;
  description: string;
  address: address;
  opening_hours: opening_hour[];
};
