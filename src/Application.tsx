import React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppointmentPage from './pages/Appointment/AppointmentPage';
import DoctorPage from './pages/Home/Doctor';
import HomePage from './pages/Home/Home';
import LandingPage from './pages/Landing/Landing';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/doctor">
            <Route index element={<DoctorPage />} />
            <Route path=":id" element={<DoctorPage />} />
          </Route>
          <Route path="/appointment">
            <Route index element={<AppointmentPage />} />
            <Route path=":id" element={<AppointmentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default Application;
