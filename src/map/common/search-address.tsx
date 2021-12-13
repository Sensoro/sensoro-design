import React, { FC, useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { Input, AutoComplete } from 'antd';
import { ExpansionProps, FullLngLatPos } from '../types';

interface SearchAddressProps extends ExpansionProps {
  prefixCls?: string;
  onChange?: (position: FullLngLatPos) => void;
}

let autocomplete: any = null;

const SearchAddress: FC<SearchAddressProps> = (props) => {
  const { prefixCls, __map__, onChange } = props;
  const map = __map__;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    map.plugin(['AMap.Autocomplete'], function () {
      // @ts-ignore
      autocomplete = new window.AMap.Autocomplete();
    });
  }, []);

  const handleSelect = (value: string, options: any) => {
    const location = options.location;
    if (!location) return;
    map?.setCenter([location.lng, location.lat]);
    map?.setZoom(15);
    onChange?.({
      longitude: location.lng,
      latitude: location.lat
    });
  };

  const handleSearch = (value: string) => {
    if (!autocomplete) return;
    autocomplete.search(value, (status: string, results: any) => {
      if (status === 'complete') {
        const tips = results.tips.filter((item: any) => item.id).map(renderItem);

        setOptions(tips);
      }
    });
  };

  const renderItem = (item: any) => {
    return {
      ...item,
      value: item.name,
      key: uniqueId('address_'),
      label: (
        <div>
          {item.name}
          <span style={{ paddingLeft: 4, color: 'rgba(0, 0, 0, 0.45)' }}>{item.district}</span>
        </div>
      )
    };
  };

  return (
    <span className={prefixCls}>
      <AutoComplete
        onSelect={handleSelect}
        onSearch={handleSearch}
        style={{ width: 224 }}
        options={options}
      >
        <Input.Search size="small" placeholder="请输入地址" />
      </AutoComplete>
    </span>
  );
};

SearchAddress.defaultProps = {
  prefixCls: 'sen-map-search-address'
};

export default SearchAddress;
