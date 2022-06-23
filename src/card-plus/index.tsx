import React from 'react';
import classNames from '@pansy/classnames';
import { Grid, Spin } from 'antd';
import { SpinProps } from 'antd/es/spin';
import RightOutlined from '@sensoro-design/icons/RightOutlined';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { ConfigContext } from '../config-provider';
import { CardPlusType, CardPlusChildType, Gutter, Breakpoint } from './interface';

const { useBreakpoint } = Grid;

const CardPlus: CardPlusType = ({
  className,
  style,
  bodyStyle = {},
  headStyle = {},
  title,
  extra,
  layout,
  loading,
  colSpan,
  gutter = 0,
  split,
  headerBordered,
  bordered,
  children,
  collapsed: controlCollapsed,
  collapsible = false,
  defaultCollapsed = false,
  onCollapse
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('card-plus');

  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useMergedState<boolean>(defaultCollapsed, {
    value: controlCollapsed,
    onChange: onCollapse
  });

  // 顺序决定如何进行响应式取值，按最大响应值依次取值，请勿修改。
  const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

  /**
   * 根据响应式获取 gutter, 参考 antd 实现
   * @param gutter gutter
   */
  const getNormalizedGutter = (gut: Gutter | Gutter[]) => {
    const results: [number, number] = [0, 0];
    const normalizedGutter = Array.isArray(gut) ? gut : [gut, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i += 1) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint] as number;
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  };

  /**
   * 根据条件返回 style，负责返回空对象
   * @param withStyle 是否符合条件
   * @param appendStyle 如果符合条件要返回的 style 属性
   */
  const getStyle = (withStyle: boolean, appendStyle: React.CSSProperties) => {
    return withStyle ? appendStyle : {};
  };

  const normalizedGutter = getNormalizedGutter(gutter);

  // 判断是否套了卡片，如果套了的话将自身卡片内部内容的 padding 设置为0
  let containCard;
  const childrenArray = React.Children.toArray(children) as CardPlusChildType[];

  const childrenModified = childrenArray.map((element, index) => {
    if (element?.type?.displayName === 'SenCardPlus') {
      containCard = true;

      // 右侧空隙
      const gutterRightStyle = getStyle(
        normalizedGutter[0]! > 0 && index !== childrenArray.length - 1,
        {
          marginRight: normalizedGutter[0]
        }
      );

      // 下方空隙
      const gutterBottomStyle = getStyle(normalizedGutter[1]! > 0, {
        marginBottom: normalizedGutter[1]
      });

      // 当 split 有值时，内部卡片 radius 设置为 0
      const splitStyle = getStyle(split === 'vertical' || split === 'horizontal', {
        borderRadius: 0
      });

      return React.cloneElement(element, {
        className: classNames(element.props.className, {
          // 横纵切割
          [`${prefixCls}-split-vertical`]:
            split === 'vertical' && index !== childrenArray.length - 1,
          [`${prefixCls}-split-horizontal`]:
            split === 'horizontal' && index !== childrenArray.length - 1
        }),
        style: {
          ...gutterRightStyle,
          ...gutterBottomStyle,

          ...splitStyle,
          ...element.props.style
        }
      });
    }
    return element;
  });

  let span = colSpan;

  // colSpan 响应式
  if (typeof colSpan === 'object') {
    for (let i = 0; i < responsiveArray.length; i += 1) {
      const breakpoint: Breakpoint = responsiveArray[i];
      if (screens[breakpoint] && colSpan[breakpoint] !== undefined) {
        span = colSpan[breakpoint];
        break;
      }
    }
  }

  // 当 colSpan 为 30% 或 300px 时
  const colSpanStyle = getStyle(typeof span === 'string' && /\d%|\dpx/i.test(span), {
    flexBasis: span as string,
    flexShrink: 0
  });

  const cardStyle = {
    ...colSpanStyle,
    ...style
  };

  const cardCls = classNames(`${prefixCls}`, className, {
    [`${prefixCls}-span-${span}`]: typeof span === 'number' && span > 0 && span <= 24,
    [`${prefixCls}-border`]: bordered,
    [`${prefixCls}-contain-card`]: containCard,
    [`${prefixCls}-loading`]: loading
  });

  const headerCls = classNames(`${prefixCls}-header`, {
    [`${prefixCls}-header-border`]: headerBordered,
    [`${prefixCls}-header-collapse`]: collapsed
  });

  const bodyCls = classNames(`${prefixCls}-body`, {
    [`${prefixCls}-body-center`]: layout === 'center',
    [`${prefixCls}-body-column`]: split === 'horizontal',
    [`${prefixCls}-body-collapse`]: collapsed
  });

  // 非受控情况下展示
  const collapsibleButton = collapsible && controlCollapsed === undefined && (
    <RightOutlined
      rotate={!collapsed ? 90 : undefined}
      className={`${prefixCls}-collapsible-icon`}
      onClick={() => {
        setCollapsed(!collapsed);
      }}
    />
  );

  let spinProps: SpinProps | undefined;
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading
    };
  } else if (typeof loading === 'object') {
    spinProps = {
      spinning: true,
      ...loading
    };
  }

  return (
    <div className={cardCls} style={cardStyle}>
      {spinProps?.spinning && (
        <Spin spinning={false} {...spinProps} wrapperClassName={`${prefixCls}-wrapper`}>
          <div />
        </Spin>
      )}
      {(title || extra || collapsibleButton) && (
        <div className={headerCls} style={headStyle}>
          <div className={`${prefixCls}-title`}>
            {title}
            {collapsibleButton}
          </div>
          <div className={`${prefixCls}-extra`}>{extra}</div>
        </div>
      )}
      <div className={bodyCls} style={bodyStyle}>
        {childrenModified}
      </div>
    </div>
  );
};

CardPlus.displayName = 'SenCardPlus';

export default CardPlus;
