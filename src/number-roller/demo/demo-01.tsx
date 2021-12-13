import React, { FC, useState, useEffect } from 'react';
import { NumberRoller } from '@sensoro/sensoro-design';

let animateInterval: any = null;

const Example: FC = () => {
  const [val, setVal] = useState(123456);

  useEffect(() => {
    animateInterval = setInterval(() => {
      setVal(val > 999999 ? 123456 : val + Math.round(1232 * Math.random()));
    }, 1000);

    return () => {
      clearInterval(animateInterval);
    };
  }, []);

  return (
    <div style={{ background: '#000' }}>
      <NumberRoller value={val} />
    </div>
  );
};

export default Example;
