import React, { CSSProperties, PureComponent } from 'react';
import * as d3 from 'd3-path';
import classNames from '@pansy/classnames';

export interface SignalProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  color?: string;
  value?: number;
}

class Signal extends PureComponent<SignalProps> {
  // 信号柱的宽度
  private barWidth: number = 70;
  // 第一个信号柱的高度
  private startHeight: number = 185;
  // 信号柱递增的高度
  private stepHeight: number;
  // 信号柱间隔的宽度
  private intervalWidth: number;

  static defaultProps: Partial<SignalProps> = {
    prefixCls: 'sen-signal',
    color: '#b4b8bf',
    value: 0
  };

  constructor(props: SignalProps) {
    super(props);
    this.intervalWidth = (1024 - 114 * 2 - this.barWidth * 5) / 4;
    this.stepHeight = (1024 - 114 * 2 - this.startHeight) / 4;
  }

  getBarPathStr = (val) => {
    const barPath = d3.path();
    // 获取信号柱的高度
    const barHeight = this.startHeight + this.stepHeight * (val - 1);

    // 左上
    const point1 = [
      114 + (this.intervalWidth + this.barWidth) * (val - 1),
      114 + this.stepHeight * (5 - val)
    ];
    // 右上
    const point2 = [point1[0] + this.barWidth, point1[1]];
    // 右下
    const point3 = [point2[0], point1[1] + barHeight];
    // 左下
    const point4 = [point1[0], point3[1]];

    barPath.moveTo(point1[0], point1[1]);
    barPath.lineTo(point2[0], point2[1]);
    barPath.lineTo(point3[0], point3[1]);
    barPath.lineTo(point4[0], point4[1]);
    barPath.closePath();

    return barPath.toString();
  };

  renderSignal = () => {
    const { color, value } = this.props;
    const paths: any[] = [];

    if (value === 0) {
      paths.push(
        <path
          key={0}
          fill={color}
          d="M365.056 154.112l-39.936-39.424c-3.072-3.072-8.192-3.072-11.264 0L240.128 189.952 165.888 114.688c-3.072-3.072-8.192-3.072-11.264 0l-39.936 39.424c-3.072 3.072-3.072 8.192 0 11.264L189.44 241.152 114.688 316.928c-3.072 3.072-3.072 8.192 0 11.264l39.936 39.424c3.072 3.072 8.192 3.072 11.264 0l73.728-74.752 73.728 74.752c3.072 3.072 8.192 3.072 11.264 0l39.936-39.424c3.072-3.072 3.072-8.192 0-11.264L290.304 241.152l74.752-75.776c3.072-3.072 3.072-8.192 0-11.264z"
        />
      );
    }

    paths.push(
      <path key={1} fill={color} opacity={value >= 1 ? 1 : 0.4} d={this.getBarPathStr(1)} />
    );
    paths.push(
      <path key={2} fill={color} opacity={value >= 2 ? 1 : 0.4} d={this.getBarPathStr(2)} />
    );
    paths.push(
      <path key={3} fill={color} opacity={value >= 3 ? 1 : 0.4} d={this.getBarPathStr(3)} />
    );
    paths.push(
      <path key={4} fill={color} opacity={value >= 4 ? 1 : 0.4} d={this.getBarPathStr(4)} />
    );
    paths.push(
      <path key={5} fill={color} opacity={value >= 5 ? 1 : 0.4} d={this.getBarPathStr(5)} />
    );

    return paths;
  };

  render() {
    const { prefixCls, className, style } = this.props;

    return (
      <span
        className={classNames(className, 'anticon', {
          [`${prefixCls}`]: true
        })}
        style={style}
      >
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          {this.renderSignal()}
        </svg>
      </span>
    );
  }
}

export default Signal;
