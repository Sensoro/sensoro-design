import React from 'react';
import { LineBoardContext } from './context';
import { useWindowSize } from '../_utils/measure';
import {
  Point,
  LineBoardOption,
  Line,
  Option,
  UseLinesResult,
  LineState,
  LineRenderType,
  RenderPoint
} from './types';
import { default as LineSelector } from './line';

const prefixCls = 'sen-line-board';

const defaultLineOption: Option = {
  lineColor: '#2B6DE5',
  lineWidth: 2,
  lineType: 'default'
};

const useLines = (count: number): UseLinesResult => {
  return Array.from({ length: count }).map(() => React.useState<Line>());
};

function connect(option: LineBoardOption = { maxLine: 10, zIndex: 1 }) {
  return (Component: React.ComponentType): React.ComponentType => {
    return (props) => {
      const { maxLine = 10, zIndex = 1 } = option;
      const lines = useLines(maxLine);
      const { width, height } = useWindowSize();

      // const [lines, setLines] = React.useState<string[]>([]);
      const [points, setPoints] = React.useState<{
        [key: string]: { point: Point; updateIndex: number };
      }>({});
      const registerPoint = (id: string, point: Point, updateIndex: number) => {
        const currentPoint = points?.[id]?.point;
        if (!currentPoint || currentPoint.x !== point.x || currentPoint.y !== point.y) {
          setPoints((prev) => ({
            ...prev,
            [id]: { point, updateIndex }
          }));
        }
      };
      const unregisterPoint = (id: string) => {
        setPoints((prev) => {
          const cPoints = { ...prev };
          delete cPoints[id];
          return cPoints;
        });
      };

      const isEffective = (line: Line) => {
        return (
          !!line && (line.type === 'optimized' || (!!points[line.startId] && !!points[line.endId]))
        );
      };

      //分配规则是尽量找无效的状态，找不到则覆盖第一条
      const assign = (start: string, end: string): LineState => {
        const findState = find(start, end);
        if (findState) {
          return findState;
        } else {
          for (let i = 0; i < lines.length; ++i) {
            const [line] = lines[i];
            if (!isEffective(line)) {
              return lines[i];
            }
          }
          return lines[0];
        }
      };

      const find = (start: string, end: string): LineState | undefined => {
        let state;
        for (let i = 0; i < lines.length; ++i) {
          const [line] = lines[i];
          if (isEffective(line) && line.startId === start && line.endId === end) {
            state = lines[i];
            break;
          }
        }
        return state;
      };

      const create = (
        start: string,
        end: string,
        type: LineRenderType,
        option: Option
      ): Line | undefined => {
        let line: Line;
        const startPoint = points?.[start].point;
        const endPoint = points?.[end].point;
        if (startPoint && endPoint) {
          line = {
            type,
            startId: start,
            endId: end,
            start: { ...startPoint },
            end: { ...endPoint },
            option: {
              ...defaultLineOption,
              ...option
            }
          };
        }
        return line;
      };

      const createOptimizedLine = (
        start: RenderPoint,
        end: RenderPoint,
        type: LineRenderType,
        option: Option
      ): Line | undefined => {
        return {
          type,
          startId: start.id,
          endId: end.id,
          start: start.point,
          end: end.point,
          option: {
            ...defaultLineOption,
            ...option
          }
        };
      };

      const destroyLine = (start: string, end: string) => {
        if (start && end) {
          const lineState = find(start, end);
          if (lineState) {
            const [line, setLine] = lineState;
            setLine(undefined);
          }
        }
      };

      const destroyLines = (lineIds: [string, string][] = []) => {
        if (lineIds?.length > 0) {
          for (let i = 0; i < lineIds.length; ++i) {
            destroyLine(lineIds[i][0], lineIds[i][1]);
          }
        }
      };

      const renderLine = (start: string, end: string, option: Option, updatePoint = true) => {
        const startPoint = points?.[start];
        const endPoint = points?.[end];
        if (startPoint && endPoint) {
          if (updatePoint) {
            setPoints((prev) => {
              const sPoint = prev[start].point;
              const sUpdateIndex = prev[start].updateIndex + 1;
              const ePoint = prev[end].point;
              const eUpdateIndex = prev[end].updateIndex + 1;
              return {
                ...prev,
                [start]: { point: { ...sPoint }, updateIndex: sUpdateIndex },
                [end]: { point: { ...ePoint }, updateIndex: eUpdateIndex }
              };
            });
          }
          const [_, setLine] = assign(start, end);
          const line = create(start, end, 'simple', option);
          setLine(line);
        }
      };

      const renderLineOptimized = (
        start: RenderPoint | string,
        end: RenderPoint | string,
        option: Option,
        progress: number = 1
      ) => {
        const hasIdPoints = typeof start === 'string' || typeof end === 'string';
        const allIdPoints = typeof start === 'string' && typeof end === 'string';
        const startPoint = typeof start === 'string' ? points?.[start]?.point : start.point;
        const endPoint = typeof end === 'string' ? points?.[end]?.point : end.point;
        const startId = typeof start === 'string' ? start : start.id;
        const endId = typeof end === 'string' ? end : end.id;
        if (hasIdPoints) {
          setPoints((prev) => {
            const sUpdateIndex = (prev?.[startId]?.updateIndex ?? 0) + 1;
            const eUpdateIndex = (prev?.[endId]?.updateIndex ?? 0) + 1;
            return {
              ...prev,
              [startId]: {
                point: { ...startPoint },
                updateIndex: sUpdateIndex
              },
              [endId]: { point: { ...endPoint }, updateIndex: eUpdateIndex }
            };
          });
          const [_, setLine] = assign(startId, endId);
          const line = createOptimizedLine(
            { id: startId, point: startPoint },
            { id: endId, point: endPoint },
            allIdPoints ? 'simple' : 'optimized',
            option
          );
          setLine({ ...line, progress });
        } else {
          const [_, setLine] = assign(startId, endId);
          const line = createOptimizedLine(
            start as RenderPoint,
            end as RenderPoint,
            'optimized',
            option
          );
          setLine({ ...line, progress });
        }
      };

      const postRenderLine = (
        startId: string,
        endId: string,
        points: Point[],
        option: Option,
        progress: number = 1
      ) => {
        if (points.length > 1) {
          const [_, setLine] = assign(startId, endId);
          const start = points[0];
          const end = points[points.length - 1];
          const wayPoints = points.slice(1, points.length - 1);
          const line = createOptimizedLine(
            { id: startId, point: start },
            { id: endId, point: end },
            'optimized',
            { ...option, getWayPoints: () => wayPoints }
          );
          setLine({ ...line, progress });
        }
      };

      const renderLines = (lineIds: [string, string][] = [], option: Option) => {
        for (let i = 0; i < lineIds.length; ++i) {
          renderLine(lineIds[i][0], lineIds[i][1], option, true);
        }
      };

      const getUpdateIndex = (id: string) => points?.[id]?.updateIndex ?? 1;
      return (
        <LineBoardContext.Provider
          value={{
            width,
            height,
            getUpdateIndex,
            registerPoint,
            unregisterPoint,
            renderLineOptimized,
            renderLine,
            postRenderLine,
            renderLines,
            destroyLine,
            destroyLines
          }}
        >
          <>
            <Component {...props} />
            <div
              className={prefixCls}
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex,
                pointerEvents: 'none'
              }}
            >
              <svg width={`${width}px`} height={`${height}px`}>
                {lines &&
                  lines.map((state) => {
                    const [line] = state;
                    if (isEffective(line)) {
                      return (
                        <LineSelector
                          key={`${line.startId}-${line.endId}`}
                          updateEqual={true}
                          {...line}
                          start={points?.[line.startId]?.point ?? line.start}
                          end={points?.[line.endId]?.point ?? line.end}
                        />
                      );
                    } else {
                      return undefined;
                    }
                  })}
              </svg>
            </div>
          </>
        </LineBoardContext.Provider>
      );
    };
  };
}

export default connect;
