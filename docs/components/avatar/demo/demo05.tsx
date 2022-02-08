/**
 * title: Avatar.Group
 * desc: 头像组合展现。
 */
import { Divider, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from '@sensoro/sensoro-design';

export default () => (
  <>
    <Avatar.Group>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Avatar
        style={{
          backgroundColor: '#f56a00'
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068'
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff'
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      maxCount={2}
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf'
      }}
    >
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Avatar
        style={{
          backgroundColor: '#f56a00'
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068'
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff'
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      maxCount={2}
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf'
      }}
    >
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Avatar
        style={{
          backgroundColor: '#f56a00'
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068'
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff'
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      maxCount={2}
      maxPopoverTrigger="click"
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        cursor: 'pointer'
      }}
    >
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar
        style={{
          backgroundColor: '#f56a00'
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068'
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff'
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
  </>
);
