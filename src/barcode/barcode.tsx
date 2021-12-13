import React from 'react';
import { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

export interface BarcodeProps {
  /**
   * 条形码的值
   */
  value: string;
  /**
   * 条形码的宽度，单位px
   * @default 2
   */
  width?: number;
  /**
   * 条形码的高度，单位px
   * @default 100
   */
  height?: number;
  /**
   * 条形码类型
   * @default 'auto'
   */
  format?: string;
  /**
   * 是否显示条形码的值
   * @default true
   */
  displayValue?: boolean;
  /**
   * 覆盖的文案
   */
  text?: string;
  fontOptions?: string;
  font?: string;
  textAlign?: string;
  textPosition?: string;
  textMargin?: number;
  fontSize?: number;
  /**
   * 背景
   */
  background?: string;
  /**
   * 条形码线条的颜色
   */
  lineColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  flat?: boolean;
}

export const Barcode: React.FC<BarcodeProps> = (props) => {
  const inputRef = useRef();
  const { value, ...rest } = props;

  useEffect(
    () => {
      if (inputRef.current) {
        JsBarcode(inputRef.current, value, rest);
      }
    },
    [props],
  );

  return (
    <svg ref={inputRef} />
  )
}
