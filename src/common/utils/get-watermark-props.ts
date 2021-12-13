import { isBoolean, isObject } from 'lodash';
import { WatermarkProps } from '../../watermark';

export default (watermark: boolean | WatermarkProps): WatermarkProps | undefined => {
  if (isBoolean(watermark) && watermark) {
    return {};
  }
  if (isObject(watermark)) {
    return watermark;
  }
  return undefined;
};
