import React, { useEffect, useState, FunctionComponent } from 'react';
import { Table as AntdTable } from 'antd';

interface Data {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

interface TableData extends Data {
  key: number;
}

const columns = [
  {
    title: 'First name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'IP address',
    dataIndex: 'ip_address',
    key: 'ip_address',
  },
];

const dataEndpoint = 'http://0.0.0.0:5000/data';
const transformResponseBody = (data: Data[]): TableData[] => data.map(dataItem => ({ ...dataItem, key: dataItem.id }));

export const Table: FunctionComponent = () => {
  const [data, setData] = useState([] as TableData[]);
  useEffect(() => {
    fetch(dataEndpoint)
      .then(response => response.json())
      .then(responseData => setData(transformResponseBody(responseData)));
  }, []);

  return data.length ? <AntdTable dataSource={data} columns={columns} /> : <div />;
};
