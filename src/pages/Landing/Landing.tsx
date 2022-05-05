import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

export interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <img className="doctor_cartoon" src={process.env.PUBLIC_URL + '/images/doctor_cartoon1.png'} alt="doctor_cartoon" />
      <img className="help_conversation" src={process.env.PUBLIC_URL + '/images/help_conversation.png'} alt="help_conversation" />
      <div className="background">
        <div className="right_content">
          <div className="welcome_user">Welcome to doctor appointment application!</div>
          <button className="more_detail_btn" onClick={() => navigate('/home')}>
            More Detail!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
