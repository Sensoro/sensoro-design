import { FC, useEffect } from 'react';
import { ExpansionProps, ArrayLngLat } from '../../map/types';
import { MapPositionValue } from '../index';

interface SelectPositionProps extends ExpansionProps {
  onChange?: (value: MapPositionValue) => void;
}

const SelectPosition: FC<SelectPositionProps> = ({ __map__, onChange }) => {
  const handleChange = (position: ArrayLngLat, address: string) => {
    onChange?.({
      lnglat: position,
      location: address
    });
  };

  useEffect(() => {
    //地图事件
    __map__.on('click', (e: any) => {
      const lnglat = e.lnglat;
      __map__.plugin('AMap.Geocoder', function () {
        // @ts-ignore
        const geocoder = new window.AMap.Geocoder();
        geocoder.getAddress([lnglat.lng, lnglat.lat], (status: string, result: any) => {
          let address = '';
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            address = result.regeocode.formattedAddress;
          }
          handleChange([lnglat.lng, lnglat.lat], address);
        });
      });
    });
  }, [__map__]);

  return null;
};

export default SelectPosition;
