import React from 'react';
import { OptionItem } from './types';
import TextButton from './text-button';

const Item: React.FC<OptionItem> = (props) => {
  const { title, children, style, ...rest } = props;
  return (
    <>
      {children ? (
        React.Children.map(children, (i: any) =>
          typeof i === 'string' ? (
            <TextButton {...rest} style={{ ...style }}>
              {i}
            </TextButton>
          ) : (
            React.cloneElement(i, { ...rest, style })
          )
        )
      ) : (
        <TextButton {...rest} style={style}>
          {title}
        </TextButton>
      )}
    </>
  );
};

export default Item;
