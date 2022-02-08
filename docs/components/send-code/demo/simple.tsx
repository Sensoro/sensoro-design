import React, { FC, useState } from 'react';
import { SendCode } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  const [start, setStart] = useState(false);

  const handleClick = () => {
    setStart(true);
  };

  return (
    <div>
      <SendCode
        start={start}
        onClick={handleClick}
        onEnd={() => {
          setStart(false);
        }}
      />
    </div>
  );
};

export default BasicExample;
