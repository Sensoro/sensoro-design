import React, { useRef, useState, useEffect } from 'react';
import { message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

export interface PaletteProps {
  showTitle?: boolean;
  direction?: 'horizontal' | 'vertical';
  color?: {
    name: string;
    text: string;
    count?: number;
  };
}

const colorPaletteMap = {
  dark: ['#fff', 'unset'],
  default: ['rgba(0,0,0,0.85)', '#fff']
};

const rgbToHex = (rgbString) => {
  const rgb = rgbString.match(/\d+/g);
  let r = parseInt(rgb[0], 10).toString(16);
  let g = parseInt(rgb[1], 10).toString(16);
  let b = parseInt(rgb[2], 10).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;
  return `#${r}${g}${b}`;
};

export const Palette: React.FC<PaletteProps> = ({
  showTitle,
  direction = 'vertical',
  color = {}
}) => {
  const [hexColors, setHexColors] = useState<Record<string, string>>();
  const colorNodesRef = useRef<Record<string, HTMLDivElement>>({});
  const { count = 10, name, text } = color;

  useEffect(() => {
    if (!colorNodesRef.current) return;

    let colors = {};

    Object.keys(colorNodesRef.current).forEach((key) => {
      const computedColor = getComputedStyle(colorNodesRef.current[key])['background-color'];

      let hexColor;

      if (computedColor.indexOf('rgba') >= 0) {
        hexColor = computedColor;
      } else {
        hexColor = rgbToHex(computedColor);
      }

      colors = {
        ...colors,
        [key]: hexColor
      };
    });

    setHexColors(colors);
  }, []);

  const [lastColor, firstColor] = colorPaletteMap.default;

  const colors = [];

  for (let i = 1; i <= count; i += 1) {
    const colorText = `${name}-${i}`;

    colors.push(
      <CopyToClipboard
        text={hexColors ? hexColors[colorText] : ''}
        onCopy={() => message.success(`@${colorText}`)}
        key={colorText}
      >
        <div
          key={i}
          className={`main-color-item palette-${name}-${i}`}
          ref={(node) => {
            colorNodesRef.current[`${name}-${i}`] = node;
          }}
          style={{
            color: (name === 'yellow' ? i > 6 : i > 5) ? firstColor : lastColor,
            fontWeight: i === 6 ? 'bold' : 'normal'
          }}
        >
          <span className="main-color-text">{colorText}</span>
          {hexColors ? <span className="main-color-value">{hexColors[colorText]}</span> : null}
        </div>
      </CopyToClipboard>
    );
  }

  return (
    <div className={direction === 'horizontal' ? 'color-palette-horizontal' : 'color-palette'}>
      {showTitle && (
        <div className="color-title">
          {text}
          {/* <span className="color-description">{description}</span> */}
        </div>
      )}
      <div className="main-color">{colors}</div>
    </div>
  );
};

export default Palette;
