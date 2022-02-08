import React, { FC } from 'react';
import { Timeline } from '@sensoro/sensoro-design';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const BasicExample: FC = () => {
  const handleClick = (e) => {
    console.log('click ', e);
  };

  const groups = {
    '2020-10-10': [
      'Solve initial network problems 2015-09-01',
      'Solve initial network problems 2015-09-01',
      'Solve initial network problems 2015-09-01'
    ],
    '2020-10-11': [
      'Solve initial network problems 2015-09-01',
      'Solve initial network problems 2015-09-01',
      'Solve initial network problems 2015-09-01'
    ]
  };

  const renderTimeline = (data) => {
    return data && data.map((i, idx) => <Timeline.Item key={idx}>{i}</Timeline.Item>);
  };

  return (
    <div>
      <Timeline>
        {Object.keys(groups).map((k) => {
          return (
            <React.Fragment key={k}>
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
                    {k}
                  </div>
                }
              />
              {groups[k] && renderTimeline(groups[k])}
            </React.Fragment>
          );
        })}
      </Timeline>
    </div>
  );
};

export default BasicExample;
