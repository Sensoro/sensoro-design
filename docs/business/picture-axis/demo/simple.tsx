import React from 'react';
import { uniqueId } from 'lodash';
import moment from 'moment';
import { PictureAxis } from '@sensoro/sensoro-design';

class Example extends React.Component<any, { list: any[] }> {
  private interval: NodeJS.Timeout;

  state = {
    list: []
  };

  componentDidMount() {
    this.interval = setInterval(this.updateList, 3 * 1000);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  updateList = () => {
    const { list } = this.state;

    const id = uniqueId();

    const pictureInfo1 = {
      id: `person_${id}`,
      type: 'person',
      subtype: 'face',
      url:
        'https://aip.bdstatic.com/portal-pc-node/dist/1588235213450/images/technology/face/detect/demo-card-1.jpg',
      captureTime: moment().valueOf()
    };

    const pictureInfo2 = {
      id: `car_${id}`,
      type: 'car',
      subtype: 'face',
      url:
        'https://shengzhe-test.bj.bcebos.com/DFC-RZ-03C80017C7A882F1/32237_0_1616643222_16578_MO-912-208-176-128',
      captureTime: moment().valueOf()
    };

    if (list.length === 10) {
      this.setState({
        list: [...list, pictureInfo1]
      });
    } else {
      this.setState({
        list: [...list, pictureInfo1, pictureInfo2]
      });
    }
  };

  render() {
    return (
      <PictureAxis
        list={this.state.list}
        onImageClick={(info) => {
          console.log(info);
        }}
      />
    );
  }
}

export default Example;
