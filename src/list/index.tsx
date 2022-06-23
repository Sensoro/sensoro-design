import React from 'react';
import useScroll from './use-scroll';
import { Spin } from 'antd';
import classnames from '@pansy/classnames';
import LoadingOutlined from '@sensoro-design/icons/LoadingOutlined';
import Empty from '../empty';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const prefixCls = 'sen-list';

export interface LoadMoreProps {
  onLoadMore?: () => Promise<boolean>;
  total?: number;
  childCount?: number;
}

export interface ListProps extends LoadMoreProps {
  height: string | number;
  className?: string;
  style?: React.CSSProperties;
  empty?: React.ReactNode;
}

enum State {
  NORMAL,
  LOADING,
  FAILED,
  FINISH
}

function supportOverlay() {
  let element = document.createElement('div');
  if ('overflow' in element.style) {
    element.style['overflow'] = 'overlay';
    return element.style['overflow'] === 'overlay';
  } else {
    return false;
  }
}

const List: React.FC<ListProps> = (props) => {
  const {
    height,
    className,
    style,
    children,
    onLoadMore,
    total = 0,
    childCount,
    empty = (
      <div style={{ width: '100%', height: '100%' }}>
        <Empty center />
      </div>
    ),
    ...rest
  } = props;

  const count = typeof childCount === 'number' ? childCount : React.Children.count(children);
  const [state, setState] = React.useState<State>(count === total ? State.FINISH : State.NORMAL);

  const onEnd = async () => {
    if (state !== State.LOADING && typeof onLoadMore === 'function') {
      if (count === total) {
        setState(State.FINISH);
      } else {
        setState(State.LOADING);
        const success = await onLoadMore();
        if (success) {
          if (count === total) {
            setState(State.FINISH);
          } else {
            setState(State.NORMAL);
          }
        } else {
          setState(State.FAILED);
        }
      }
    }
  };

  const scroll = useScroll(onEnd);
  const support = supportOverlay();

  return (
    <div
      className={classnames(prefixCls, className)}
      {...scroll}
      {...rest}
      //overlay目前只有chorme支持
      style={{
        ...style,
        //@ts-ignore
        overflowY: support ? 'overlay' : 'auto',
        height: height
      }}
    >
      {children}
      {total === 0 ? (
        empty
      ) : (
        <div className={'state'}>
          {state === State.LOADING && (
            <span>
              <Spin indicator={antIcon} style={{ marginRight: 16 }} /> 加载中...
            </span>
          )}
          {state === State.FAILED && (
            <span>
              加载失败, <a onClick={() => onEnd()}>重新加载</a>
            </span>
          )}
          {state === State.FINISH && <span>没有更多了</span>}
        </div>
      )}
    </div>
  );
};

export default List;
