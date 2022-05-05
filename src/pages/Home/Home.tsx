import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Doctor from './Doctor';
import './index.css';

export interface IDoctorPageProps {}

const DoctorPage: React.FunctionComponent<IDoctorPageProps> = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Doctor />
      <Button variant="outlined" onClick={() => navigate('/doctor')} style={{ width: 300, marginTop: 30 }}>
        Back to landing Page
      </Button>
    </div>
  );
};

export default DoctorPage;
