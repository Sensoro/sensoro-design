import React, { FC } from 'react';
import { List } from '@sensoro/sensoro-design';

const data = Array.from({ length: 200 }).map((i, idx) => idx);
const size = 15;
const Example: FC = () => {
  const [page, setPage] = React.useState(1);

  const loadedData = data.slice(0, page * size);

  return (
    <List
      height="200px"
      style={{ padding: `5px`, display: 'flex', flexWrap: 'wrap' }}
      onLoadMore={() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (page === 4) {
              resolve(false);
            } else {
              setPage(page + 1);
              resolve(true);
            }
          }, 500);
        });
      }}
      total={data.length}
    >
      {loadedData.map((i) => (
        <div
          key={i}
          style={{
            width: '120px',
            height: '80px',
            border: '1px solid #d9d9d9',
            lineHeight: '80px',
            textAlign: 'center',
            margin: '5px'
          }}
        >
          {i}
        </div>
      ))}
    </List>
  );
};

export default Example;
