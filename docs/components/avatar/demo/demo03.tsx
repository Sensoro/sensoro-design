/**
 * title: 自动调整字符大小
 * desc: 对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { Avatar } from '@sensoro/sensoro-design';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

export default () => {
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);

  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  };

  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };

  return (
    <>
      <Avatar
        style={{
          backgroundColor: color,
          verticalAlign: 'middle'
        }}
        size="large"
        gap={gap}
      >
        {user}
      </Avatar>
      <Button
        size="small"
        style={{
          margin: '0 16px',
          verticalAlign: 'middle'
        }}
        onClick={changeUser}
      >
        ChangeUser
      </Button>
      <Button
        size="small"
        style={{
          verticalAlign: 'middle'
        }}
        onClick={changeGap}
      >
        changeGap
      </Button>
    </>
  );
};
