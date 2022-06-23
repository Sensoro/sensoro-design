/**
 * title: 带徽标的头像
 * desc: 通常用于消息提示。
 */
import { Badge, Space } from 'antd';
import UserOutlined from '@sensoro-design/icons/UserOutlined';
import { Avatar } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space>
      <span className="avatar-item">
        <Badge count={1}>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
      </span>
      <span>
        <Badge dot>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
      </span>
    </Space>
  );
};
