import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';
import { Booking } from '../../models/booking.model';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const statusValue: string[] = ['confirmed', 'cancelled'];

type modalProps = {
  onChangeStatusAppointment: (values: any) => void;
  isOpen: boolean;
  setIsOpenModal: (e: any) => void;
  booking: Booking | Booking[];
};

const validationSchema = Yup.object().shape({
  status: Yup.string().required('Required')
});

const BasicModal = ({ onChangeStatusAppointment, isOpen, setIsOpenModal, booking }: modalProps) => {
  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpenModal(false)}>
        <Box sx={style}>
          <Formik
            initialValues={{
              status: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => onChangeStatusAppointment(values)}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form style={{ display: 'flex', flexDirection: 'column' }}>
                <Autocomplete
                  onChange={(e, value) => setFieldValue('status', value !== null ? value : 'confirm')}
                  disablePortal
                  options={statusValue}
                  sx={{ width: '100%', border: errors.status && touched.status ? '0.5px solid red' : '', borderRadius: errors.status && touched.status ? '4px' : 0 }}
                  renderInput={(params) => <TextField {...params} label="Status" />}
                />
                {errors.status && touched.status && <div style={{ color: 'red', marginTop: 10 }}>{errors.status}</div>}
                <LoadingButton style={{ marginTop: 10 }} variant="outlined" type="submit" loading={!booking} loadingPosition="center">
                  Edit Appointment Status
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
