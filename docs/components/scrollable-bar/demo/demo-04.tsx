import React from 'react';
import { ScrollableBar } from '@sensoro/sensoro-design';
// @ts-ignore
import styles from './demo-04.less';

const defaultData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default () => {
  return (
    <div>
      <ScrollableBar
        key="ScrollableBar-01"
        style={{
          width: 400
        }}
        className={styles.main}
        autoplay
      >
        {defaultData.map((item, index) => {
          return (
            <ScrollableBar.Item style={{ padding: '0 10px' }} key={`item-${index}`}>
              <div className={styles.item}>{item}</div>
            </ScrollableBar.Item>
          );
        })}
      </ScrollableBar>
    </div>
  );
};
