import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { doctor } from '../../models/doctor.model';
import ins from '../../utils/axios';
import { hourConvertHelper } from '../../utils/hourConvertHelper';
import './index.css';
import BasicModal from './Modal';
import BasicTable from './Tables';

type appointmentProps = {
  name?: string;
  doctorId: string;
  start: number;
  end?: number;
  date?: any;
};

const DoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<doctor[] | doctor>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [bookingContent, setBookingContent] = useState<appointmentProps>();
  const [errDoctor, setErrDoctor] = useState<any>();
  const onOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const onSetBookingContent = (id: string, start: number, end: number) => {
    setBookingContent({ doctorId: id, start, end });
  };

  const getData = (id: string) => {
    ins
      .get(`/doctor/${id}`)
      .then((res: any) => setDoctors(res.data))
      .catch((err: any) => setErrDoctor(err));
  };

  const onBookAppointment = ({ name, date }: appointmentProps) => {
    const appointmentContent = {
      name,
      doctorId: bookingContent?.doctorId,
      start: hourConvertHelper(date?.format('HH:mm').replace(':', '.')),
      date: moment(date).format('YYYY-MM-DD')
    };

    ins
      .post('/booking', appointmentContent)
      .then((res: any) => {
        if (res) {
          alert('Booking succeed');
          setIsOpenModal(false);
        }
      })
      .catch((err: any) => alert(err));
  };

  useEffect(() => {
    !Array.isArray(doctors) &&
      !id &&
      ins
        .get('/doctor')
        .then((res: any) => setDoctors(res.data))
        .catch((err: any) => setErrDoctor(err));
  }, [id, doctors]);

  useEffect(() => {
    if (id !== undefined) {
      getData(id);
    }
  }, [id]);

  return (
    <>
      {doctors ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <BasicTable isRenderAddress={!!id} isRenderOpeningHours={!!id} doctors={doctors} setIsOpenModal={setIsOpenModal} onSetBookingContent={onSetBookingContent} />
          <BasicModal onBookAppointment={onBookAppointment} isOpen={isOpenModal} onOpenModal={onOpenModal} doctors={doctors} setIsOpenModal={setIsOpenModal} />
          {id && (
            <Button variant="outlined" onClick={() => navigate('/doctor')} style={{ width: 300, marginTop: 30 }}>
              Back to your doctor list
            </Button>
          )}{' '}
          <Button variant="outlined" onClick={() => navigate('/appointment')} style={{ width: 300, marginTop: 30 }}>
            Check Booking List
          </Button>
          <span style={{ marginTop: 5 }}>Note: please click on item to select</span>
        </div>
      ) : (
        'fetching data'
      )}
    </>
  );
};

export default DoctorPage;
