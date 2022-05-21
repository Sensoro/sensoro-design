import React, { useRef } from 'react';
import { OptionsRenderProps } from './types';
import MoreOutlined from '@sensoro-design/icons/MoreOutlined';
import PlusOutlined from '@sensoro-design/icons/PlusOutlined';
import { Dropdown, Button } from 'antd';
import { createMenu, createMenuWithOptions } from './util';

const ButtonOptions: React.FC<OptionsRenderProps> = (props) => {
  const { children, className, style, shrinkIndex, autoHide, options, onClick } = props;
  const btnEl = useRef(null);
  const renderItems = () => {
    const childCount = React.Children.count(children);
    if (childCount <= (autoHide ? shrinkIndex + 1 : shrinkIndex)) {
      return React.Children.map(children, (child: any, idx: number) =>
        React.cloneElement(child, {
          ...child?.props,
          style: { marginLeft: 8, ...child?.props?.style }
        })
      );
    } else {
      const formatChildren = React.Children.map(children, (i) => i);
      const firstChildren = formatChildren.slice(0, shrinkIndex);
      const otherChildren = formatChildren.slice(shrinkIndex);
      const dropdownDisable = otherChildren && otherChildren.every((i: any) => i?.props?.disabled);
      return (
        <>
          {firstChildren &&
            firstChildren.map((child: any, idx) =>
              React.cloneElement(child, {
                ...child?.props,
                style: { marginLeft: 8, ...child?.props?.style }
              })
            )}
          {
            <Dropdown
              overlay={createMenu(otherChildren)}
              placement="bottomRight"
              disabled={dropdownDisable}
            >
              <Button icon={<MoreOutlined />}></Button>
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
          <Button
            key={o.value}
            type={idx === 0 ? 'primary' : 'default'}
            style={{ marginLeft: 8 }}
            icon={o?.icon ?? (idx === 0 && <PlusOutlined />)}
            onClick={() => onClick && onClick(options[0].value)}
          >
            {o.label}
          </Button>
        ));
      } else {
        const dropdownDisable = options.slice(shrinkIndex).every((i: any) => i?.disabled);
        return (
          <>
            {options.slice(0, shrinkIndex).map((i, idx) => (
              <Button
                key={i.value}
                type="primary"
                icon={i?.icon ?? <PlusOutlined />}
                style={{ marginLeft: 8 }}
                onClick={() => onClick && onClick(i.value)}
              >
                {i.label}
              </Button>
            ))}
            {
              <Dropdown
                overlay={createMenuWithOptions(options.slice(shrinkIndex), onClick)}
                placement="bottomRight"
                disabled={dropdownDisable}
                getPopupContainer={() => btnEl.current}
              >
                <Button ref={btnEl} icon={<MoreOutlined />} style={{ marginLeft: 8 }}></Button>
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
    <div className={className} style={{ display: 'flex', flexDirection: 'row-reverse', ...style }}>
      {options && options.length > 0 ? renderItemWithOptions() : renderItems()}
    </div>
  );
};

ButtonOptions.defaultProps = {
  shrinkIndex: 1
};

export default ButtonOptions;
