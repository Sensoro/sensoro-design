import React from 'react';
import { Fullscreen } from '@sensoro/sensoro-design';

export default () => {
  const [enabled, setEnabled] = React.useState(false);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  return (
    <div>
      <Fullscreen
        enabled={enabled}
        target={document.body}
        onClose={() => {
          setEnabled(false);
        }}
      />
      <button onClick={handleClick}>全屏 {enabled + ''}</button>
    </div>
  );
};
