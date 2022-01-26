import React from 'react';
import { useModal } from '@pansy/react-hooks';
import { Modal, Button } from '@sensoro/sensoro-design';

export default () => {
  const modal = useModal();

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          modal.open();
        }}
      >
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={modal.visible}
        onOk={modal.close}
        onCancel={modal.close}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
