import InternalRadio from './radio';
import Group from './group';
import Button from './button';
import './style';

import type { CompoundedComponent } from './types';

const Radio = InternalRadio as CompoundedComponent;
Radio.Group = Group;
Radio.Button = Button;

export type { RadioProps, RadioGroupProps } from 'antd/es/radio';

export default Radio;
