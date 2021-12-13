import React from 'react';
import { OptionsRenderProps } from './types';
import Icon from '../icon';
import { Dropdown } from 'antd';
import { createMenu, createMenuWithOptions } from './util';
import TextButton from './text-button';

const LinkOptions: React.FC<OptionsRenderProps> = (props) => {
  const { children, className, style, shrinkIndex, autoHide, options, onClick, hoverStyle } = props;

  const renderItems = () => {
    const childCount = React.Children.map(children, (c) => c).filter((i) => i).length;
    if (childCount <= (autoHide ? shrinkIndex + 1 : shrinkIndex)) {
      return React.Children.map(
        children,
        (child: any, idx: number) =>
          child && (
            <TextButton
              hoverStyle={hoverStyle}
              {...child?.props}
              style={{ marginRight: 8, ...child?.props?.style }}
            />
          )
      );
    } else {
      const formatChildren = React.Children.map(children, (i) => i);
      const firstChildren = formatChildren.slice(0, shrinkIndex);
      const otherChildren = formatChildren.slice(shrinkIndex);
      const dropdownDisable = otherChildren && otherChildren.every((i: any) => i?.props?.disabled);
      return (
        <>
          {firstChildren &&
            firstChildren.map((child: any, idx) => {
              return (
                <TextButton
                  key={idx}
                  {...child?.props}
                  style={{ marginRight: 8, ...child?.props?.style }}
                />
              );
            })}
          {
            <Dropdown
              overlay={createMenu(otherChildren)}
              placement="bottomRight"
              disabled={dropdownDisable}
            >
              <TextButton style={{ color: '#2B6DE5' }}>
                更多
                <Icon type={'icon-down'} style={{ marginLeft: 4 }} />
              </TextButton>
            </Dropdown>
          }
        </>
      );
    }
  };

  const renderItemWithOptions = () => {
    if (options) {
      if (options.length <= (autoHide ? shrinkIndex + 1 : shrinkIndex)) {
        return options.map((o, idx) => (
          <TextButton
            key={o.value}
            style={{ marginRight: 8 }}
            onClick={() => onClick && onClick(o.value)}
          >
            {o.label}
          </TextButton>
        ));
      } else {
        return (
          <>
            {options.slice(0, shrinkIndex).map((i, idx) => (
              <TextButton
                key={i.value}
                style={{ marginRight: 8 }}
                onClick={() => onClick && onClick(i.value)}
              >
                {i.label}
              </TextButton>
            ))}
            {
              <Dropdown
                overlay={createMenuWithOptions(options.slice(shrinkIndex), onClick)}
                placement="bottomRight"
              >
                <TextButton style={{ color: '#2B6DE5' }}>
                  更多 <Icon type={'icon-down'} style={{ marginLeft: 4 }} />
                </TextButton>
              </Dropdown>
            }
          </>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div className={className} style={{ display: 'flex', ...style }}>
      {options && options.length > 0 ? renderItemWithOptions() : renderItems()}
    </div>
  );
};

LinkOptions.defaultProps = {
  shrinkIndex: 1
};

export default LinkOptions;
