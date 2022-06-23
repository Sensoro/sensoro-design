import React, { isValidElement, useContext, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Tree as AntTree, Menu } from 'antd';
import { TreeProps as AntTreeProps } from 'antd/es/tree';
import { IconFontProps } from '@sensoro-design/icons/es/components/IconFont';
import { DataNode as RCTreeDataNode } from 'rc-tree/es/interface';
import classNames from '@pansy/classnames';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import { ToolTipCondition, DropDownCondition } from '../_utils/condition-component';
import './style/index.less';

type SubMenu = Omit<MenuData, 'subMenus'>;

export interface MenuData {
  label?: string;
  /**
   * 标题前面的图标
   */
  titleIcon?: React.ReactNode | IconFontProps;
  icon?: React.ReactNode;
  value?: string | number;
  subMenus?: SubMenu[];
  component?: React.ReactNode;
}

export interface DataNode extends RCTreeDataNode {
  menus?: MenuData[];
  keepMenus?: boolean;
  [key: string]: any;
}

export interface TreeProps extends Omit<AntTreeProps, 'treeData'> {
  treeData?: DataNode[];
  onMenuClick?: (val: any, data: DataNode) => void;
  renderMenu?: (node: DataNode, hoverKey?: string | number) => React.ReactNode;
}

const Tree: React.FC<TreeProps> = ({
  children,
  className,
  titleRender,
  onMenuClick,
  renderMenu,
  showIcon,
  ...rest
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const [hoveredKey, setHoveredKey] = React.useState<string | number | null>();

  const prefixCls = getPrefixCls('tree');

  const setHoverKeyDebounced = useCallback(debounce(setHoveredKey, 500, { leading: true }), []);

  const renderTitle = (data: DataNode) => {
    const { menus, titleIcon } = data;
    const hasMenu = menus && menus.length > 0;

    return (
      <div
        className={classNames({
          [`${prefixCls}-node-title`]: true,
          [`${prefixCls}-node-title-with-icon`]: showIcon
        })}
        onMouseEnter={() => setHoverKeyDebounced(data?.key)}
        onMouseLeave={() => data?.key && setHoverKeyDebounced(null)}
      >
        <span className={`${prefixCls}-node-title-text`}>
          {typeof titleRender === 'function' ? (
            titleRender(data)
          ) : (
            <>
              {isValidElement(titleIcon) ? titleIcon : titleIcon && <Icon {...titleIcon} />}
              {data.title}
            </>
          )}
        </span>

        {data?.key &&
          (typeof renderMenu === 'function'
            ? renderMenu(data, hoveredKey)
            : hasMenu &&
              (hoveredKey === data.key || data.keepMenus) && (
                <div className={`${prefixCls}-actions`}>
                  {menus.map((i, idx) => (
                    <DropDownCondition
                      key={idx}
                      overlay={createMenus(i, data)}
                      placement="bottomRight"
                      _disable={!i?.subMenus || i?.subMenus?.length === 0 || !!i.component}
                    >
                      <span
                        className={'action'}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!i.subMenus || i.subMenus.length === 0) {
                            onMenuClick && onMenuClick(i.value, data);
                          }
                        }}
                      >
                        {!!i.component ? (
                          i.component
                        ) : (
                          <ToolTipCondition title={i.label} _disable={!i.label}>
                            <span className={'icon'}>{i.icon}</span>
                          </ToolTipCondition>
                        )}
                      </span>
                    </DropDownCondition>
                  ))}
                </div>
              ))}
      </div>
    );
  };

  const createMenus = (item: MenuData, data: DataNode) => {
    return (
      item?.subMenus?.length > 0 && (
        <Menu onClick={({ key }) => onMenuClick(key, data)}>
          {item.subMenus.map((i) => (
            <Menu.Item key={i.value} icon={i.icon}>
              {i.label}
            </Menu.Item>
          ))}
        </Menu>
      )
    );
  };

  return (
    <div className={prefixCls}>
      <AntTree
        className={classNames(className)}
        titleRender={renderTitle}
        blockNode
        showIcon
        {...rest}
      />
    </div>
  );
};

export default Tree;
