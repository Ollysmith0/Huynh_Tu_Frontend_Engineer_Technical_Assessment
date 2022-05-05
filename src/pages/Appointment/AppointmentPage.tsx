import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Booking } from '../../models/booking.model';
import ins from '../../utils/axios';
import BasicTable from '../Home/Tables';
import BasicModal from './Modal';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [booking, setBooking] = useState<Booking[]>([]);
  const [openModal, setIsOpenModal] = useState<boolean>(false);

  const onChangeStatusAppointment = (value: string) => {
    const bookingId = localStorage.getItem('bookingId');
    console.log(value, bookingId);

    value &&
      ins
        .patch(`/booking/${bookingId}`, value)
        .then((res) => {
          setBooking(res.data);
          setIsOpenModal(false);
          navigate(`/appointment/${bookingId}`);
          alert('update appointment status succeed');
        })
        .catch((err) => alert(err));
  };

  useEffect(() => {
    const bookingId = localStorage.getItem('bookingId');
    if (params.id) {
      ins
        .get(`/booking/${bookingId}`)
        .then((res) => {
          setBooking(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      !booking.length &&
        !params.id &&
        ins
          .get('/booking')
          .then((res: any) => {
            setBooking(res.data);
          })
          .catch((err: any) => console.log(err));
    }
  }, [booking, params.id]);

  return (
    <>
      {booking ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BasicTable booking={booking} setIsOpenModal={setIsOpenModal} />
          <BasicModal isOpen={openModal} onChangeStatusAppointment={onChangeStatusAppointment} setIsOpenModal={setIsOpenModal} booking={booking} />
          {params.id && (
            <Button variant="outlined" onClick={() => navigate('/appointment')} style={{ width: 300, marginTop: 30 }}>
              Back to your booking list
            </Button>
          )}
          <Button variant="outlined" onClick={() => navigate('/doctor')} style={{ width: 300, marginTop: 30 }}>
            Back to your doctor list
          </Button>
        </div>
      ) : (
        'fetching data'
      )}
    </>
  );
};

export default AppointmentPage;
