import React from 'react';
import ImageViewer from './image-viewer';
import { Rect, ImageWallProps } from './types';

const useMeasureChildren = (count: number) => {
  const measureResults = [];
  for (let i = 0; i < count; ++i) {
    const [node, setNode] = React.useState(null);
    const ref = React.useCallback((node) => {
      if (node !== null) {
        // setRect(node.getBoundingClientRect());
        setNode(node);
      }
    }, []);
    measureResults[i] = {
      node,
      ref
    };
  }
  return measureResults;
};

const createStyleSheet = (results: any, length: number): Rect[] => {
  //如果子节点数量比image数量少,则用第一个补齐
  let styles = Array.from({ length });
  let style0 = { width: '0px', height: '0px', top: '0px', left: '0px' };
  return (
    styles &&
    styles.map((i, idx) => {
      const node: any = results[idx]?.node;
      if (node) {
        const { width, height, top, left } = node.getBoundingClientRect();
        const style = {
          width: `${width}px`,
          height: `${height}px`,
          top: `${top}px`,
          left: `${left}px`
        };
        if (idx === 0) {
          style0 = style;
        }
        return style;
      } else {
        return style0;
      }
    })
  );
};

const ImageWall: React.FC<ImageWallProps> = (props) => {
  const { images, className, style, children } = props;
  const [visible, setVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const childCount =
    typeof children === 'function'
      ? React.Children.count(children().props.children)
      : React.Children.count(children);
  const results = useMeasureChildren(childCount);
  const styles = createStyleSheet(results, images.length);

  const handleClick = (idx) => {
    setIndex(idx);
    setVisible(true);
  };

  return (
    <div className={className} style={style}>
      {typeof children === 'function'
        ? React.Children.map(children(handleClick).props.children, (child: any, idx: number) =>
            React.cloneElement(child, {
              ref: results[idx].ref
            })
          )
        : React.Children.map(children, (child: any, idx: number) =>
            React.cloneElement(child, {
              onClick: () => {
                handleClick(idx);
              },
              ref: results[idx].ref
            })
          )}

      {
        <ImageViewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          startIndex={index}
          images={images}
          animation={{ initStyles: styles }}
        />
      }
    </div>
  );
};

export default ImageWall;
