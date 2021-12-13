import padStart from 'lodash/padStart';
import floor from 'lodash/floor';

/**
 * 格式化时间为 mm:ss
 * @param duration 需要格式化的时间，单位秒
 */
export function formatDuration(duration: number = 0) {
  return `${padStart(floor(duration / 60).toString(), 2, '0')}:${padStart(
    floor(duration % 60).toString(),
    2,
    '0'
  )}`;
}
