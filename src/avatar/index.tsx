import React from 'react';
import Group from 'antd/es/avatar/group';
import { InternalAvatar } from './avatar';

import type { AvatarProps } from './avatar';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
}

const Avatar = InternalAvatar as CompoundedComponent;
Avatar.Group = Group;

export { Group, Avatar };
export default Avatar;
