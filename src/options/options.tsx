import React from 'react';
import LinkOptions from './link-options';
import ButtonOptions from './button-options';
import { excludeChildrenFragment } from '../_utils/condition-component';
import { OptionsProps } from './types';

const Options: React.FC<OptionsProps> = (props) => {
  const { children, type, ...rest } = props;

  const excludeFragment = excludeChildrenFragment(children);

  return type === 'link' ? (
    <LinkOptions {...rest}>{excludeFragment}</LinkOptions>
  ) : (
    <ButtonOptions {...rest}>{excludeFragment}</ButtonOptions>
  );
};

Options.defaultProps = {
  type: 'link'
};

export default Options;
