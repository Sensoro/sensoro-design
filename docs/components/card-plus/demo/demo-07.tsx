import React, { useState } from 'react';
import RightOutlined from '@sensoro-design/icons/RightOutlined';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <CardPlus
        title="可折叠"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
      >
        内容
      </CardPlus>
      <CardPlus
        title="可折叠-受控自定义"
        extra={
          <RightOutlined
            rotate={!collapsed ? 90 : undefined}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        }
        style={{ marginTop: 16 }}
        headerBordered
        collapsed={collapsed}
      >
        内容
      </CardPlus>
    </>
  );
};
