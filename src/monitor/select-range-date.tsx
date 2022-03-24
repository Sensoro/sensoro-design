import React, { FC, useState, memo, useEffect, useRef } from 'react';
import moment, { Moment } from 'moment';
import { InfoCircleFilled } from '@ant-design/icons';
import { Modal, Tag, DatePicker, Spin } from 'antd';
import { SetMealInfo } from './types';

interface SelectRangeDateProps {
  className?: string;
  name?: string;
  visible?: boolean;
  loading?: boolean;
  setMealLoading?: boolean;
  setMeal?: SetMealInfo;
  isDownload?: boolean;
  onCancel?: () => void;
  onConfirm?: (val: [Moment, Moment], isDownload?: boolean) => void;
  getContainer?: () => HTMLElement;
}

const { RangePicker } = DatePicker;

const dictionary = {
  0: '无云录像',
  1: '7*24全天录像',
  2: '7*24活动录像',
  3: '7*24报警录像',
  4: '30*24全天录像',
  5: '30*24活动录像',
  6: '30*24报警录像',
  7: '24小时全天录像',
  8: '60*24全天录像',
  9: '90*24全天录像',
}

const SelectRangeDate: FC<SelectRangeDateProps> = (props) => {
  const {
    className,
    visible,
    loading,
    name,
    onCancel,
    onConfirm,
    isDownload,
    getContainer,
    setMeal,
    setMealLoading
  } = props;
  const container = useRef<HTMLDivElement>(null)
  const [rangePicker, setRangePicker] = useState<[Moment, Moment]>();
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    if (isDownload) {
      setRangePicker(undefined);
    } else {
      setRangePicker([moment().subtract(1, 'hours'), moment()]);
    }
  }, [props.isDownload]);

  useEffect(() => {
    if (!visible) {
      setErrorText('');
    }
  }, [props.visible]);

  const handleRangePickerChange = (values) => {
    setRangePicker(values);
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // 下载视频间距为 1-30 分钟
    if (isDownload) {
      const time = rangePicker[1].valueOf() - rangePicker[0].valueOf();
      if (time < 1 * 60 * 1000 || time > 30 * 60 * 1000) {
        setErrorText('可选时间范围最长支持半小时，最短支持1分钟');
        return;
      }
    } else {
      const time = rangePicker[1].valueOf() - rangePicker[0].valueOf();
      if (time > 24 * 60 * 60 * 1000) {
        setErrorText('可选时间范围最长支持1天');
        return;
      }
    }

    onConfirm?.(rangePicker, isDownload);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onCancel?.();
  };

  const disabledDate = (current) => {
    return current && (current > moment() || current < moment().subtract(setMeal?.value ? setMeal.value : 0, 'days'));
  };

  return (
    <Modal
      title="选择时间范围"
      visible={visible}
      okText="开始检索"
      cancelText="取消"
      okButtonProps={{
        disabled: !(rangePicker && rangePicker.length === 2) ||
          (setMeal?.value <= 0),
        loading
      }}
      width={460}
      getContainer={getContainer}
      wrapClassName={className}
      onOk={handleConfirm}
      onCancel={handleCancel}
    >
      <div ref={container}>
        <Spin spinning={setMealLoading}>
          {setMealLoading}
          <div>
            {name}
            {setMeal?.value > 0 && (
              <Tag>{dictionary[setMeal.value]}</Tag>
            )}
          </div>
          <RangePicker
            //@ts-ignore
            value={rangePicker}
            showTime
            getPopupContainer={() => container.current}
            disabled={!setMeal?.value}
            disabledDate={disabledDate}
            onChange={handleRangePickerChange}
          />
          {errorText && (
            <div style={{ color: '#F2555F', fontSize: 12, lineHeight: '20px', marginTop: 2 }}>
              <InfoCircleFilled /> {errorText}
            </div>
          )}
        </Spin>
      </div>

    </Modal>
  );
};

SelectRangeDate.defaultProps = {
  isDownload: false
};

export default memo(SelectRangeDate);
