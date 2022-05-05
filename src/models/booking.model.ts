export type Booking = {
  id: string;
  name: string;
  start: number;
  doctorId: string;
  date: string;
  status: string;
};

export type BookingStatus = {
  status: 'confirm' | 'cancel';
};
