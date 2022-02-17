import React from 'react';
import { Button } from 'antd';
import { useModal } from '@pansy/react-hooks';
import { CheckCard } from '@ant-design/pro-card';
import { ResponsiveCard, Modal } from '@sensoro/sensoro-design';

const options = [
  { title: '🍊 Orange', description: '🍊 Orange', value: 'option1' },
  { title: '🍐 Pear', description: '🍐 Pear', value: 'option2' },
  { title: '🍎 Apple', description: '🍎 Apple', value: 'option3' },
  { title: '🍎 Apple1', description: '🍎 Apple1', value: 'option4' }
];

export default () => {
  const modal = useModal();

  return (
    <>
      <Button onClick={() => modal.open()}>打开</Button>
      <Modal
        visible={modal.visible}
        title="测试标题"
        onCancel={modal.close}
        footer={null}
        width={900}
        destroyOnClose
      >
        <CheckCard.Group defaultValue="A" style={{ width: '100%' }}>
          <ResponsiveCard>
            {(config) => {
              return options.map((item, index) => {
                const style = {
                  width: config.width,
                  marginRight: (index + 1) % config.span != 0 ? config.gutter : 0
                };

                return <CheckCard {...item} style={style} key={index} />;
              });
            }}
          </ResponsiveCard>
        </CheckCard.Group>
      </Modal>
    </>
  );
};
