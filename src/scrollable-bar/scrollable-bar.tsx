import React, {
  Children,
  cloneElement,
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle
} from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import classNames from '@pansy/classnames';
import ResizeObserver from 'resize-observer-polyfill';
import { ItemProps } from './item';
import { setTransform, isTransform3dSupported } from './utils';
import { ScrollableBarRef, ScrollableBarProps } from './interface';

type ScrollableBarType = React.ForwardRefRenderFunction<ScrollableBarRef, ScrollableBarProps>;

const defaultPrefixCls: string = 'sen-scrollable-bar';

const InternalScrollableBar: ScrollableBarType = (props, ref) => {
  const {
    prefixCls,
    className,
    style,
    mode,
    endMode,
    activeKey,
    children,
    prevIcon,
    nextIcon,
    onNextClick,
    onPrevClick,
    onItemClick,
    direction,
    interval = 3 * 1000,
    scrollAnimated
  } = props;

  const autoPlayInterval = useRef<NodeJS.Timer>();
  const offset = useRef<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);
  const resizeObserver = useRef<ResizeObserver>(null);
  const navRef = useRef(null);
  const navWrapRef = useRef(null);
  const containerRef = useRef(null);
  const activeItemRef = useRef(null);
  const navContainerRef = useRef(null);
  const [next, setNext] = useState<boolean>(false);
  const [prev, setPrev] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<string>('');

  const debouncedResize = useCallback(
    debounce(() => {
      setNextPrev();
      scrollToActiveNode();
    }, 200),
    []
  );

  useEffect(() => {
    const containerNode = containerRef.current;
    resizeObserver.current = new ResizeObserver(debouncedResize);
    resizeObserver.current.observe(containerNode);

    return () => {
      resizeObserver.current && resizeObserver.current.disconnect();
      closeAutoplay();
    };
  }, []);

  useEffect(
    () => {
      if (props.autoplay && !isHover) {
        startAutoplay();
      } else {
        closeAutoplay();
      }
    },
    [props.autoplay, isHover]
  )

  useEffect(() => {
    setCurrentKey(activeKey);
    setNextPrev();
    scrollToActiveNode();
  }, [props.activeKey, props.mode, props.children]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setOffset(0);
    },
    next: () => {
      handleNextClick();
    },
    prev: () => {
      handlePrevClick();
    }
  }));

  const startAutoplay = () => {
    const { next, prev } = setNextPrev();
    if (next === false && prev === false) {
      closeAutoplay();
      return;
    }

    let direction = 'next';

    autoPlayInterval.current = setInterval(
      () => {
        const { next, prev } = setNextPrev();
        if (direction === 'next') {
          if (next) {
            handleNextClick();
          } else {
            direction = 'prev'
          }
        } else {
          if (prev) {
            handlePrevClick();
          } else {
            direction = 'next';
          }
        }
      },
      interval
    )
  }

  const closeAutoplay = () => {
    autoPlayInterval.current && clearInterval(autoPlayInterval.current);
  }

  const handlePrevClick = (e?) => {
    onPrevClick?.(e);

    const navWrapNode = navWrapRef.current;
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    setOffset(offset.current + navWrapNodeWH);
  };

  const handleNextClick = (e?) => {
    onNextClick?.(e);

    const navWrapNode = navWrapRef.current;
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    setOffset(offset.current - navWrapNodeWH);
  };

  const getOffsetWH = (node) => {
    let prop = 'offsetWidth';
    if (mode === 'vertical') {
      prop = 'offsetHeight';
    }
    return node && node[prop];
  };

  const getOffsetLT = (node) => {
    let prop = 'left';
    if (mode === 'vertical') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  };

  const getScrollWH = (node) => {
    let prop = 'scrollWidth';
    if (mode === 'vertical') {
      prop = 'scrollHeight';
    }
    return node && node[prop];
  };

  const setNextPrev = () => {
    const navNode = navRef.current;
    const navWrapNode = navWrapRef.current;
    const containerNode = containerRef.current;
    const navContainerNode = navContainerRef.current;

    const navNodeWH = getScrollWH(navContainerNode || navNode);
    const containerNodeWH = getOffsetWH(containerNode) + 1;
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    const minOffset = containerNodeWH - navNodeWH;

    let [prevCopy, nextCopy] = [prev, next];

    if (minOffset >= 0) {
      nextCopy = false;
      setOffset(0, false);
      offset.current = 0;
    } else if (minOffset < offset.current) {
      nextCopy = true;
    } else {
      nextCopy = false;
      const realOffset = navWrapNodeWH - navNodeWH;
      setOffset(realOffset, false);
      offset.current = realOffset;
    }

    if (offset.current < 0) {
      prevCopy = true;
    } else {
      prevCopy = false;
    }

    setNext(nextCopy);
    setPrev(prevCopy);

    return {
      next: nextCopy,
      prev: prevCopy
    };
  };

  /**
   *
   * @param offset
   * @param checkNextPrev
   */
  const setOffset = (value: number, checkNextPrev = true) => {
    let target = Math.min(0, value);

    if (offset.current !== target) {
      offset.current = target;
      let navOffset: {
        name?: string;
        value?: string;
      } = {};

      const navNode = navRef.current;
      const navStyle = (navNode && navNode.style) || {};

      const transformSupported = isTransform3dSupported(navStyle);

      if (mode === 'vertical') {
        if (transformSupported) {
          navOffset = {
            value: `translate3d(0,${target}px,0)`
          };
        } else {
          navOffset = {
            name: 'top',
            value: `${target}px`
          };
        }
      } else if (transformSupported) {
        if (direction === 'rtl') {
          target = -target;
        }
        navOffset = {
          value: `translate3d(${target}px,0,0)`
        };
      } else {
        navOffset = {
          name: 'left',
          value: `${target}px`
        };
      }

      if (transformSupported) {
        setTransform(navStyle, navOffset.value);
      } else {
        navStyle[navOffset.name] = navOffset.value;
      }
      if (checkNextPrev) {
        setNextPrev();
      }
    }
  };

  /**
   * 滚动到活动的节点
   * @param e
   */
  const scrollToActiveNode = (e?) => {
    const navWrapNode = navWrapRef.current;
    const activeItemNode = activeItemRef.current;

    if ((e && e.target !== e.currentTarget) || !activeItemNode) return;

    if (next || prev) return;

    const activeTabWH = getScrollWH(activeItemNode);
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    const wrapOffset = getOffsetLT(navWrapNode);
    const activeTabOffset = getOffsetLT(activeItemNode);

    let offsetCopy = offset.current;

    if (wrapOffset > activeTabOffset) {
      offsetCopy += wrapOffset - activeTabOffset;
      setOffset(offsetCopy);
    } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
      offsetCopy -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
      setOffset(offsetCopy);
    }
  };

  const prevTransitionEnd = (e) => {
    if (e.propertyName !== 'opacity') return;
    const containerNode = containerRef.current;
    scrollToActiveNode({
      target: containerNode,
      currentTarget: containerNode
    });
  };

  const showNextPrev = prev || next;

  const prevButton = (
    <span
      unselectable="on"
      onClick={handlePrevClick}
      className={classNames({
        [`${prefixCls}-prev`]: 1,
        [`${prefixCls}-btn-disabled`]: !prev,
        [`${prefixCls}-arrow-show`]: showNextPrev
      })}
      onTransitionEnd={prevTransitionEnd}
    >
      {prevIcon || (
        <span className={`${prefixCls}-prev-icon`}>
          <LeftOutlined />
        </span>
      )}
    </span>
  );

  const nextButton = (
    <span
      onClick={handleNextClick}
      unselectable="on"
      className={classNames({
        [`${prefixCls}-next`]: 1,
        [`${prefixCls}-btn-disabled`]: !next,
        [`${prefixCls}-arrow-show`]: showNextPrev
      })}
    >
      {nextIcon || (
        <span className={`${prefixCls}-next-icon`}>
          <RightOutlined />
        </span>
      )}
    </span>
  );

  const handleItemClick = (key) => {
    if (key) {
      setCurrentKey(key);
      debouncedResize();
    }
    onItemClick && onItemClick(key);
  };

  const childNodes = [];
  Children.forEach(children, (child: React.ReactElement<ItemProps>) => {
    if (!child) return;
    const key = child.key;
    const className = child['className'];

    const ref = {
      ref: null
    };
    if (currentKey === key) {
      ref.ref = activeItemRef;
    }

    const node = cloneElement(child as any, {
      prefixCls: `${prefixCls}-item`,
      className: classNames(className, {
        [`${prefixCls}-item-active`]: currentKey === key
      }),
      key,
      onClick: () => {
        handleItemClick(key);
      },
      ...ref
    });

    childNodes.push(node);
  });

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-scrolling`]: showNextPrev
      })}
      style={style}
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {!(endMode === 'hidden' && !prev) && prevButton}
      {!(endMode === 'hidden' && !next) && nextButton}
      <div className={`${prefixCls}-nav-wrap`} ref={navWrapRef}>
        <div className={`${prefixCls}-nav-scroll`}>
          <div
            className={classNames(`${prefixCls}-nav`, {
              [`${prefixCls}-nav-animated`]: scrollAnimated
            })}
            ref={navRef}
          >
            <div ref={navContainerRef}>{childNodes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollableBar = React.forwardRef<ScrollableBarRef, ScrollableBarProps>(
  InternalScrollableBar
) as <Values = any>(
  props: React.PropsWithChildren<ScrollableBarProps> & { ref?: React.Ref<ScrollableBarRef> }
) => React.ReactElement;

ScrollableBar['defaultProps'] = {
  prefixCls: defaultPrefixCls,
  mode: 'horizontal',
  endMode: 'disabled',
  scrollAnimated: true,
  onItemClick: (key) => {}
};

export default ScrollableBar;
