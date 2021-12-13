import React, { FC } from 'react';
import { List, Timeline } from '@sensoro/sensoro-design';

const data = Array.from({ length: 50 }).map((i, idx) => [
  'Solve initial network problems 2015-09-01',
  'Solve initial network problems 2015-09-01',
  'Solve initial network problems 2015-09-01'
]);
const size = 15;
const Example: FC = () => {
  const [page, setPage] = React.useState(1);

  const loadedData = data.slice(0, page * size);

  const renderTimeline = (data) => {
    return data && data.map((i, idx) => <Timeline.Item key={idx}>{i}</Timeline.Item>);
  };

  return (
    <List
      height="400px"
      style={{ padding: `5px`, display: 'flex', flexWrap: 'wrap' }}
      onLoadMore={() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setPage(page + 1);
            resolve(true);
          }, 500);
        });
      }}
      childCount={loadedData?.length}
      total={data.length}
    >
      <Timeline>
        {loadedData.map((c, idx) => {
          return (
            <React.Fragment key={idx}>
              <Timeline.Item
                dot={
                  <div
                    style={{
                      marginLeft: 50,
                      padding: '0px 8px',
                      height: '22px',
                      background: 'rgba(0,0,0,0.04)',
                      color: 'black',
                      fontSize: '12px',
                      lineHeight: '22px'
                    }}
                  >
                    {idx}
                  </div>
                }
              />
              {c && c.length > 0 && renderTimeline(c)}
            </React.Fragment>
          );
        })}
      </Timeline>
    </List>
  );
};

export default Example;
