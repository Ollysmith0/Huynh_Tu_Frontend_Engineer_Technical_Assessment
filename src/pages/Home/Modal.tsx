import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AppointmentPicker from './AppointmentPicker';
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required')
});

const BasicModal = ({ onBookAppointment, isOpen, onOpenModal, bookingContent, doctors }: any) => {
  return (
    <div>
      <Modal open={isOpen} onClose={() => onOpenModal()}>
        <Box sx={style}>
          <Formik
            initialValues={{
              name: '',
              date: moment()
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => onBookAppointment(values)}
          >
            {({ handleChange, errors, touched, isValid }) => (
              <Form>
                <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  name="name"
                  onChange={handleChange}
                  style={{ marginBottom: 10, border: errors.name && touched.name ? '0.5px solid red' : '', borderRadius: errors.name && touched.name ? 5 : 0 }}
                />
                {errors.name && touched.name && <div style={{ color: 'red', marginBottom: 5 }}>{errors.name}</div>}
                <AppointmentPicker name="date" bookingContent={bookingContent} doctors={doctors} />
                {errors.date && touched.date && <div style={{ color: 'red', marginTop: 5 }}>Please select other time</div>}
                <Button style={{ marginTop: 20 }} variant="outlined" type="submit">
                  Book Appointment
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
