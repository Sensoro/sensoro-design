import React from 'react';
import { AreaSelectorProps, Options, Shape, AABBRect, Point, LabelStyle } from './types';

//写到这主要是为了防止刚好达到最大point数量时点击两次
let lastClick = 0;

enum MouseState {
  DOWN,
  UP
}
let lastClickPosition: Point = null;
let mouseState = MouseState.UP;
let canApply = false;

//小尖尖的大小，小尖尖的高度是anchorSize*0.5
const anchorSize = 8;

enum Position {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}

enum Quadrant {
  FIRST, //第一象限
  SECOND, //第二象限
  THIRD, //第三象限
  FOURTH //第四象限
}

const defaultLabelStyle: LabelStyle = {
  font: '12px serif',
  fillStyle: '#0D1014',
  textStyle: '#fff'
};

const getPen = function (
  canvas: any,
  {
    editor,
    value,
    onChange,
    minPoint,
    maxPoint,
    width,
    height,
    editableMaxSize,
    shapeStyle,
    labelStyle,
    axis,
    disablePolygon,
    textAline
  }: Options
) {
  let drawing = false;
  let points = [];

  const dpr = window.devicePixelRatio;
  let { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = dpr * cssWidth;
  canvas.height = dpr * cssHeight;
  //理论上这两个值最好一样
  const scaleX = axis.width / width;
  const scaleY = axis.height / height;
  const shapes = transform(value);
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = shapeStyle?.fillStyle;
  ctx.lineWidth = shapeStyle?.lineWidth;
  ctx.strokeStyle = shapeStyle?.strokeStyle;
  ctx.scale(dpr, dpr);

  //把原始坐标点转化为当前比例下面的坐标点
  function transform(shapes: Shape[]): Shape[] {
    return shapes.map((i) => ({
      ...i,
      points: i.points.map((k) => ({ x: k.x / scaleX, y: k.y / scaleY }))
    }));
  }

  //恢复成原始比例的坐标点
  function recover(shapes: Shape[]): Shape[] {
    return shapes.map((i) => ({
      ...i,
      points: i.points.map((k) => ({
        x: parseInt(String(k.x * scaleX), 10),
        y: parseInt(String(k.y * scaleY), 10)
      }))
    }));
  }

  //画带小尖尖的背景
  function getPath(x: number, y: number, width: number, height: number, position?: Position) {
    // 全部重左上角开始，顺时针画
    let points;
    if (position === Position.LEFT) {
      points = [
        { x: x, y: y },
        { x: x + width, y: y },
        { x: x + width, y: y + height },
        { x: x, y: y + height },
        { x: x, y: y + (height + anchorSize) / 2 },
        { x: x - anchorSize / 2, y: y + height / 2 },
        { x: x, y: y + (height - anchorSize) / 2 },
        { x: x, y: y }
      ];
    } else if (position === Position.RIGHT) {
      points = [
        { x: x, y: y },
        { x: x + width, y: y },
        { x: x + width, y: y + height },
        { x: x + width, y: y + (height - anchorSize) / 2 },
        { x: x + width + anchorSize / 2, y: y + height / 2 },
        { x: x + width, y: y + (height + anchorSize) / 2 },
        { x: x + width, y: y + height },
        { x: x, y: y + height },
        { x: x, y: y }
      ];
    } else if (position === Position.TOP) {
      points = [
        { x: x, y: y },
        { x: x + (width - anchorSize) / 2, y: y },
        { x: x + width / 2, y: y - anchorSize / 2 },
        { x: x + (width + anchorSize) / 2, y: y },
        { x: x + width, y: y },
        { x: x + width, y: y + height },
        { x: x, y: y + height },
        { x: x, y: y }
      ];
    } else {
      points = [
        { x: x, y: y },
        { x: x + width, y: y },
        { x: x + width, y: y + height },
        { x: x + (width + anchorSize) / 2, y: y + height },
        { x: x + width / 2, y: y + height + anchorSize / 2 },
        { x: x + (width - anchorSize) / 2, y: y + height },
        { x: x, y: y + height },
        { x: x, y: y }
      ];
    }
    return points;
  }

  //title居中
  function drawTitleInCenter(title: string, aabb: AABBRect, style: LabelStyle = {}) {
    ctx.save();
    const textStyle = { ...labelStyle, ...style };
    const paddingLeftRight = 8;
    const paddingTopBottom = 2;
    ctx.font = textStyle.font;
    ctx.textBaseline = 'center';
    ctx.fillStyle = textStyle.fillStyle;

    //绘制ToolTip背景
    const titleWidth = ctx.measureText(title).width;
    const width = titleWidth + paddingLeftRight * 2;
    const height = 20 + paddingTopBottom * 2;

    const { x, y } = aabb.center;

    const path = [
      { x: x - width * 0.5, y: y - height * 0.5 },
      { x: x + width * 0.5, y: y - height * 0.5 },
      { x: x + width * 0.5, y: y + height * 0.5 },
      { x: x - width * 0.5, y: y + height * 0.5 }
    ];

    // const { x, y } = correction(pInfo, width, height);

    // const path = getPath(x, y, width, height, pInfo.position);

    ctx.beginPath();
    for (let i = 0; i < path.length; ++i) {
      if (i === 0) {
        ctx.moveTo(path[i].x, path[i].y);
      } else {
        ctx.lineTo(path[i].x, path[i].y);
      }
    }
    ctx.fill();
    //绘制ToolTip文字
    ctx.fillStyle = textStyle.textStyle;
    ctx.fillText(title, x - titleWidth * 0.5, y + 3);

    ctx.restore();
  }

  function drawTitle(title, pInfo, style: LabelStyle = {}) {
    ctx.save();
    const textStyle = { ...labelStyle, ...style };
    const paddingLeftRight = 8;
    const paddingTopBottom = 2;
    ctx.font = textStyle.font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = textStyle.fillStyle;

    //绘制ToolTip背景
    const width = ctx.measureText(title).width + paddingLeftRight * 2;
    const height = 20 + paddingTopBottom * 2;

    const { x, y } = correction(pInfo, width, height);

    const path = getPath(x, y, width, height, pInfo.position);

    ctx.beginPath();
    for (let i = 0; i < path.length; ++i) {
      if (i === 0) {
        ctx.moveTo(path[i].x, path[i].y);
      } else {
        ctx.lineTo(path[i].x, path[i].y);
      }
    }
    ctx.fill();
    //绘制ToolTip文字
    ctx.fillStyle = textStyle.textStyle;
    ctx.fillText(title, x + paddingLeftRight, y + paddingTopBottom + 3);

    ctx.restore();
  }

  //画某个图形
  function drawShape({ points, title, style, labelStyle }: Shape) {
    const mergeStyle = { ...shapeStyle, ...style };
    ctx.save();
    ctx.fillStyle = mergeStyle?.fillStyle;
    ctx.lineWidth = mergeStyle?.lineWidth;
    ctx.strokeStyle = mergeStyle?.strokeStyle;
    if (points.length > 1) {
      ctx.beginPath();
      let length = points.length;
      for (let i = 0; i < length; ++i) {
        if (i === 0) {
          ctx.moveTo(points[i].x, points[i].y);
        } else {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      //自动闭合
      if (length >= 3) {
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
    ctx.restore();
    if (title) {
      const aabb = calcAABB(points);
      if (textAline === 'center') {
        drawTitleInCenter(title, aabb, labelStyle);
      } else if (textAline === 'default') {
        const positions = calcTitlePosition(aabb);
        drawTitle(title, positions[0], labelStyle);
      }
    }
  }

  function calcQuadrant(point: Point) {
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    if (point.x > halfWidth && point.y < halfHeight) {
      return Quadrant.FIRST;
    } else if (point.x < halfWidth && point.y < halfHeight) {
      return Quadrant.SECOND;
    } else if (point.x < halfWidth && point.y > halfHeight) {
      return Quadrant.THIRD;
    } else {
      return Quadrant.FOURTH;
    }
  }

  //校正position，计算出真实的X和Y
  function correction(
    {
      point,
      position
    }: {
      point: Point;
      position: Position;
    },
    textWidth: number,
    textHeight: number
  ) {
    // console.log("position = ", position);
    if (position === Position.LEFT) {
      return {
        x: Math.min(point.x, width - textWidth),
        y: point.y - textHeight * 0.5
      };
    } else if (position === Position.RIGHT) {
      return {
        x: Math.max(point.x - textWidth - anchorSize * 0.5, 0),
        y: point.y - textHeight * 0.5
      };
    } else if (position === Position.TOP) {
      return {
        x: point.x - textWidth * 0.5,
        y: Math.min(point.y + anchorSize * 0.5, height - textHeight)
      };
    } else {
      return {
        x: point.x - textWidth * 0.5,
        y: Math.max(point.y - textHeight - anchorSize * 0.5, 0)
      };
    }
  }

  //根据AABB计算title的位置以及方向(该函数可以计算出两个可能的最佳位置,该位置是尖尖的位置)
  function calcTitlePosition(
    aabb: AABBRect
  ): [{ point: Point; position: Position }, { point: Point; position: Position }] {
    const quadrant = calcQuadrant(aabb.center);
    if (quadrant === Quadrant.FIRST) {
      return [
        { point: { x: aabb.x, y: aabb.center.y }, position: Position.RIGHT },
        {
          point: { x: aabb.center.x, y: aabb.y + aabb.height },
          position: Position.TOP
        }
      ];
    } else if (quadrant === Quadrant.SECOND) {
      return [
        {
          point: { x: aabb.x + aabb.width, y: aabb.center.y },
          position: Position.LEFT
        },
        {
          point: { x: aabb.center.x, y: aabb.y + aabb.height },
          position: Position.TOP
        }
      ];
    } else if (quadrant === Quadrant.THIRD) {
      return [
        { point: { x: aabb.center.x, y: aabb.y }, position: Position.BOTTOM },
        {
          point: { x: aabb.x + aabb.width, y: aabb.center.y },
          position: Position.LEFT
        }
      ];
    } else {
      return [
        { point: { x: aabb.center.x, y: aabb.y }, position: Position.BOTTOM },
        { point: { x: aabb.x, y: aabb.center.y }, position: Position.RIGHT }
      ];
    }
  }

  //计算图形的aabb
  function calcAABB(points: Point[]): AABBRect {
    let minX = -1,
      maxX = -1,
      minY = -1,
      maxY = -1;
    points.forEach((p) => {
      minX = minX < 0 ? p.x : Math.min(minX, p.x);
      maxX = maxX < 0 ? p.x : Math.max(maxX, p.x);
      minY = minY < 0 ? p.y : Math.min(minY, p.y);
      maxY = maxY < 0 ? p.y : Math.max(maxY, p.y);
    });
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      center: {
        x: (minX + maxX) * 0.5,
        y: (minY + maxY) * 0.5
      }
    };
  }

  //画已经闭合的图形
  function drawShapes() {
    //先清除画布
    ctx.clearRect(0, 0, width, height);
    //画已保存的图形
    for (let i = 0; i < shapes.length; ++i) {
      drawShape(shapes[i]);
    }
  }

  function finish() {
    drawing = false;
    //如果点数小于指定的最小点数，直接不成功
    const nextShapes = points.length < minPoint ? [].concat(shapes) : shapes.concat({ points });
    onChange?.(recover(nextShapes));
    //清空points
    points = [];
  }

  function drawTooltip(x, y, hintText) {
    ctx.save();
    const paddingLeftRight = 8;
    const paddingTopBottom = 2;
    ctx.font = '14px';
    ctx.textBaseline = 'center';
    ctx.fillStyle = '#0D1014';

    //绘制ToolTip背景
    const width = ctx.measureText(hintText).width;
    const height = 20;
    ctx.fillRect(x, y - height, width + paddingLeftRight * 2, height + paddingTopBottom * 2);
    //绘制ToolTip文字
    ctx.fillStyle = '#fff';
    ctx.fillText(hintText, x + paddingLeftRight, y - paddingTopBottom * 2);

    ctx.restore();
  }

  function onMouseDown(e) {
    const { layerX, layerY } = e;
    mouseState = MouseState.DOWN;
    lastClickPosition = { x: layerX, y: layerY };
  }

  function omMouseUp(e) {
    mouseState = MouseState.UP;
    if (canApply) {
      canApply = false;
      finish();
      return;
    }
    //e.button === 2 是鼠标中建
    if (e.button == 2) {
      drawing = true;
      const { layerX, layerY } = e;
      points.push({ x: layerX, y: layerY });
      //如果已经达到最大值了，直接就finish
      if (points.length >= minPoint) {
        finish();
      }
    } else {
      //连续点击两次(表明结束框选)
      if (Date.now() - lastClick <= 300) {
        finish();
      } else {
        drawing = true;
        const { layerX, layerY } = e;
        points.push({ x: layerX, y: layerY });
        //如果已经达到最大值了，直接就finish
        if (points.length >= maxPoint) {
          finish();
        }
      }
      lastClick = Date.now();
    }
  }

  function onMouseMove(e) {
    if (mouseState === MouseState.DOWN && maxPoint >= 4) {
      //获取矩形points，以后还有可能有其他图形
      function getRectPoints(startPoint: Point, endPoint: Point) {
        if (startPoint && endPoint) {
          return [
            startPoint,
            { x: endPoint.x, y: startPoint.y },
            endPoint,
            { x: startPoint.x, y: endPoint.y }
          ];
        } else {
          return [];
        }
      }
      const { layerX, layerY } = e;
      //这里需要计算误差，有可能move事件在up事件之前
      if (layerX - lastClickPosition.x > 1 || layerY - lastClickPosition.y > 1) {
        drawShapes();
        points = getRectPoints(lastClickPosition, { x: layerX, y: layerY });
        drawShape({
          points
        });
        canApply = true;
        //绘制tooltip
        drawTooltip(
          layerX,
          layerY,
          `${Math.floor((layerX - lastClickPosition.x) * scaleX)}x${Math.floor(
            (layerY - lastClickPosition.y) * scaleY
          )}`
        );
      }
    } else {
      if (drawing && !disablePolygon) {
        const { layerX, layerY } = e;
        drawShapes();
        const nextPoints = points.concat({ x: layerX, y: layerY });
        drawShape({ points: nextPoints });
        //绘制tooltip
        drawTooltip(layerX, layerY, '双击左键完成选择');
      }
    }
  }

  function open() {
    if (canvas) {
      drawShapes();
      if (editor && shapes?.length < editableMaxSize) {
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('mouseup', omMouseUp, false);
      }
    }
  }
  function close() {
    if (editor && canvas) {
      canvas.removeEventListener('mousedown', onMouseDown, false);
      canvas.removeEventListener('mousemove', onMouseMove, false);
      canvas.removeEventListener('mouseup', omMouseUp, false);
    }
  }
  return {
    open,
    close
  };
};

const defaultShapeStyle = {
  fillStyle: 'rgba(255, 0, 0, 0.2)',
  strokeStyle: '#ff0000',
  lineWidth: 2
};

const AreaSelector: React.FC<AreaSelectorProps> = (props) => {
  const {
    className,
    style,
    width,
    height,
    editor,
    value = [],
    onChange,
    minPoint,
    maxPoint,
    shapeStyle,
    labelStyle,
    editableMaxSize,
    axis,
    disablePolygon,
    textAline = 'default',
    children
  } = props;

  const canvasRef = React.useRef();
  const containerRef = React.useRef();

  //比例误差控制在0.1
  const allowed = Math.abs(axis.width / axis.height - width / height) <= 0.1;

  function disableRightMenu(e) {
    e.preventDefault();
  }

  React.useEffect(() => {
    const container: any = containerRef?.current;
    if (container) {
      //@ts-ignore
      container.oncontextmenu = disableRightMenu;
    }
    return () => {
      if (container) {
        //@ts-ignore
        container.oncontextmenu = null;
      }
    };
  }, []);

  React.useEffect(() => {
    let canvas;
    let pen;
    if (canvasRef && canvasRef.current) {
      canvas = canvasRef.current;
      pen = getPen(canvas, {
        editor,
        value,
        onChange,
        minPoint,
        maxPoint,
        editableMaxSize,
        axis,
        width,
        height,
        disablePolygon,
        textAline,
        shapeStyle: {
          ...defaultShapeStyle,
          ...shapeStyle
        },
        labelStyle: {
          ...defaultLabelStyle,
          ...labelStyle
        }
      });
      pen.open();
    }
    return () => {
      if (canvas && pen) {
        pen.close();
      }
    };
  }, [editor, value, width, height]);

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        ...style,
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {allowed ? <canvas width={width} height={height} ref={canvasRef} /> : ''}

      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { style: { position: 'absolute' } })
      )}
    </div>
  );
};

AreaSelector.defaultProps = {
  editableMaxSize: 1,
  minPoint: 3,
  maxPoint: 10,
  axis: {
    width: 1920,
    height: 1080
  }
};

export default AreaSelector;
