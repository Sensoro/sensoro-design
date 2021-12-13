import React, { FC, ReactNode, Children, cloneElement, isValidElement } from 'react';

export interface DownloadProps {
  children: ReactNode;
}

const Download: FC<DownloadProps> = (props) => {
  const { children } = props;

  function fakeClick(obj) {
    let ev = document.createEvent('MouseEvents');
    ev.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    obj.dispatchEvent(ev);
  }

  const handleDownloadClick = (result: string | Promise<string>) => {
    if (result instanceof Promise) {
      result.then((val) => {
        val && downloadFile(val);
      });
      return;
    }
    downloadFile(result);
  };

  const downloadFile = (url: string) => {
    const link: any = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    link.href = url;
    link.download = '';
    console.log(link);
    fakeClick(link);
  };

  const getChildren = (): ReactNode => {
    return Children.map(children, (child: React.ReactElement) => {
      const { onClick } = child.props;

      return cloneElement(child, {
        onClick: () => {
          if (!onClick) return;
          const result = onClick();
          handleDownloadClick(result);
        }
      });
    });
  };

  if (!children || !isValidElement(children)) return null;

  return getChildren() as any;
};

export default Download;
