import React from 'react';
import { DoublePlayer } from '@sensoro/sensoro-design';

export default () => {
  return (
    <div style={{ height: 500 }}>
      <DoublePlayer
        sources={[
          'https://ks3-cn-beijing.ksyun.com/ivms-vms-test/recordsAlarm/hls/biz/34020000001320000117_34020000001320000117/1615343358434_1615343384434.m3u8?KSSAccessKeyId=AKLTti6U2QSES-q-QoqaVGBCeQ&Expires=2403743448&Signature=Ne5tp7VRjPB5Jj5PiNNpjh8GCsY=',
          'https://ks3-cn-beijing.ksyun.com/ivms-vms-test/records/gb28181/biz/34020000001320000117_34020000001310000002/1615343358434_1615343384434.m3u8?KSSAccessKeyId=AKLTti6U2QSES-q-QoqaVGBCeQ&Expires=1617936773&Signature=c9OX1j9JdfuvO9B8P2JOd/rIZYI='
        ]}
      />
    </div>
  );
};
