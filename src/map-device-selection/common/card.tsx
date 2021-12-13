import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Button, Typography } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import Tree from '../../tree';
import Empty from '../../empty';
import Icon from '../../icon';
import { DeviceInfo } from '../interface';
import { ConfigContext } from '../../config-provider';

interface ContentProps {
  devices?: DeviceInfo[];
  onRemove?: (id: string) => void;
}

interface CardProps extends ContentProps {
  useGB: boolean;
  onReset?: () => void;
}

const { Paragraph } = Typography;

const ContentTree: React.FC<ContentProps> = ({ devices = [], onRemove }) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('map-device-selection-card');

  const renderMenu = (node, hoverKey) => {
    if ((node.type === 'GB' || node.type === 'SENSORO') && hoverKey === node.key) {
      return (
        <CloseCircleFilled
          className={`${prefixCls}-extra-icon `}
          onClick={() => {
            onRemove?.(node.key);
          }}
        />
      );
    }
    return null;
  };

  return <Tree treeData={devices} blockNode renderMenu={renderMenu} />;
};

const ContentList: React.FC<ContentProps> = ({ devices = [], onRemove }) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('map-device-selection-card');

  return (
    <div>
      {devices.map((item, index) => {
        return (
          <div
            key={item.key || index}
            className={classNames(`${prefixCls}-item`, {
              [`${prefixCls}-item-offline`]: item.status !== 1
            })}
          >
            <Paragraph ellipsis style={{ width: 200 }}>
              <Icon type={item?.titleIcon?.type || 'icon-camera'} style={item?.titleIcon?.style} />
              <span>{item.title}</span>
            </Paragraph>
            <div
              className={`${prefixCls}-item-extra`}
              onClick={() => {
                onRemove?.(item.key);
              }}
            >
              <CloseCircleFilled />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Card: React.FC<CardProps> = ({ useGB, devices = [], onRemove, onReset }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('map-device-selection-card');

  const handleReset = () => {
    onReset?.();
  };

  const handleRemove = (id: string) => {
    onRemove?.(id);
  };

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-content`}>
          <div className={`${prefixCls}-device-number`}>{devices.length} 台</div>
          <div style={{ marginLeft: 8 }}>已选择设备</div>
          <div className={`${prefixCls}-extra`}>
            <Button size="small" disabled={!devices.length} onClick={handleReset}>
              清空
            </Button>
          </div>
        </div>
      </div>
      <div className={`${prefixCls}-body`}>
        {/* 树模式 */}
        {useGB && devices.length > 0 && <ContentTree devices={devices} onRemove={handleRemove} />}
        {/* 列表模式 */}
        {!useGB && devices.length > 0 && <ContentList devices={devices} onRemove={handleRemove} />}
        {devices.length === 0 && (
          <Empty icon="device" description="暂无设备" style={{ marginTop: '82px' }} />
        )}
      </div>
    </div>
  );
};

export default Card;
