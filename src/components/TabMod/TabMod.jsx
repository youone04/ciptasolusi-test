import React from 'react';
import { Tabs } from 'antd';
import BaseCard from '@components/BaseCard';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Now Playing',
    children: <BaseCard title={'Now Playing'} url={'now_playing'} />,
  },
  {
    key: '2',
    label: 'Populer',
    children: <BaseCard title={'Populer'} url={'popular'}/>,
  },
  {
    key: '3',
    label: 'Upcoming',
    children: <BaseCard title={'Upcoming'} url={'upcoming'}/>,
  },
  {
    key: '4',
    label: 'Top Rated',
    children: <BaseCard title={'Top Rated'} url={'top_rated'}/>,
  },
];
const TabsMod = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default TabsMod;