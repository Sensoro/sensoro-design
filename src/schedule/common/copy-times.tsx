import React from 'react';
import { Checkbox, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { ConfigContext } from '../../config-provider';
import Popmodal from '../../popmodal';
import { weekConfig } from '../constant';

export interface CopyTimesProps {
  currentWeek?: number;
  onConfirm?: (weeks: number[]) => void;
}

const CopyTimes: React.FC<CopyTimesProps> = ({ currentWeek, onConfirm }) => {
  const [weeks, setWeeks] = React.useState<number[]>([]);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('schedule-copy-times');
  const options: CheckboxGroupProps['options'] = [];

  Object.keys(weekConfig).forEach((item) => {
    if (+item !== currentWeek) {
      options.push({
        label: weekConfig[item].text,
        value: item
      });
    }
  });

  const handleChange = (vals) => {
    setWeeks(vals);
  };

  const handleCancel = () => {
    setWeeks([]);
  };

  const handleConfirm = () => {
    const vals = weeks.map((item) => +item);
    onConfirm && onConfirm(vals);
    setWeeks([]);
  };

  return (
    <Popmodal
      overlayClassName={`${prefixCls}-toolbar-popover`}
      okText="保存"
      cancelText="取消"
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      okButtonProps={{
        disabled: !weeks.length
      }}
      footerBorder
      content={
        <div className={prefixCls}>
          <div className={`${prefixCls}-header`}>复制此天时间至</div>
          <div className={`${prefixCls}-body`}>
            <Checkbox.Group value={weeks} onChange={handleChange}>
              {[undefined, undefined, undefined].map((_, index) => {
                const ops = options.slice(index * 2, index * 2 + 2);
                return (
                  <div key={index}>
                    {ops.map((item) => (
                      <Checkbox key={item['value']} value={item['value']}>
                        {item['label']}
                      </Checkbox>
                    ))}
                  </div>
                );
              })}
            </Checkbox.Group>
          </div>
        </div>
      }
    >
      <Button icon={<CopyOutlined />} type="link">
        复制此天时间
      </Button>
    </Popmodal>
  );
};

export default CopyTimes;
