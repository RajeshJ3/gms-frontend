import React from 'react';

import FreeTrial from '../components/Index/banners/FreeTrial';
import Header2 from '../components/Index/headers/Header2';
import HowItWorks2 from '../components/Index/how-it-works/HowItWorks2';
import Features2 from '../components/Index/features/Features2';
import Signup from '../components/auth/signup'

export default function Index() {
  return (
    <React.Fragment>
      <FreeTrial content={null} />

      <Header2 content={null} />

      <HowItWorks2 content={null} />

      <Features2 content={null} />

      <Signup />
    </React.Fragment>
  );
}

