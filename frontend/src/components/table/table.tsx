import React, { useEffect, useState, FunctionComponent } from 'react';
import { Table as AntdTable } from 'antd';
import { DataProvider } from '../../wrappers/data-provider/data-provider';
import { ENTITY_TYPES, REQUEST_METHODS } from '../../common/consts';

import { ColumnsSelector } from '../columns-selector/columns-selector';
import { TableData } from './interfaces';
import { filterVisibleColumns } from './helpers';
import { isEmpty, noop } from '../../common/helpers';

const defaultColumns = [
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
const defaultColumnsNames = defaultColumns.map(column => column.dataIndex);

const defaultVisible = ['first_name', 'last_name', 'email'];

const dataEndpoint = 'http://0.0.0.0:5000/data';
const configEndpoint = 'http://0.0.0.0:5000/config';

const VISIBLE_COLUMNS = 'VISIBLE_COLUMNS';

export const Table: FunctionComponent = () => {
  /* const [data, setData] = useState([] as TableData[]);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisible);

  useEffect(() => {
    fetch(dataEndpoint)
      .then(response => response.json())
      .then(responseData => setData(transformResponseBody(responseData)));
  }, []);

  useEffect(() => {
    const visibleColumnsFromSS = sessionStorage.getItem(VISIBLE_COLUMNS);
    if (visibleColumnsFromSS) {
      setVisibleColumns(JSON.parse(visibleColumnsFromSS));
    } else {
      // TODO: BE must save the data
      fetch(configEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultVisible),
      })
        .then(response => response.json())
        .then(responseData => {
          setVisibleColumns(responseData);
          sessionStorage.setItem(VISIBLE_COLUMNS, JSON.stringify(responseData));
        });
    }
  }, []); */

  return (
    <DataProvider entityType={ENTITY_TYPES.DATA}>
      {({ entityData, dependenciesData }) => {
        if (!isEmpty(dependenciesData)) {
          const { entityData: visibleColumns } = dependenciesData[0];
          return entityData && dependenciesData && entityData.length && dependenciesData.length ? (
            <div className="table-container">
              <ColumnsSelector visibleColumns={visibleColumns} columns={defaultColumnsNames} setVisibleColumns={noop} />
              <AntdTable
                dataSource={entityData}
                columns={filterVisibleColumns(defaultColumns, visibleColumns)}
                pagination={{ showSizeChanger: false }}
              />
            </div>
          ) : (
            <div />
          );
        }
        return <div />;
      }}
    </DataProvider>
  );
};
