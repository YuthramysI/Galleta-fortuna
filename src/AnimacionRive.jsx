import React from 'react';
import { RiveCanvas } from '@rive-app/react-canvas';

const AnimacionRive = () => {
  return (
    <div style={{ width: '600px', height: '400px' }}>
      <RiveCanvas src="/fortune-ah.riv" autoplay />
    </div>
  );
};

export default AnimacionRive;
