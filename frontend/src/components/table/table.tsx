import React, { useState, FunctionComponent } from 'react';
import { Table as AntdTable } from 'antd';
import DataProvider from '../../wrappers/data-provider/data-provider';
import { ENTITY_TYPES, REQUEST_STATUSES } from '../../common/consts';

import ColumnsSelector from '../columns-selector/columns-selector';
import { filterVisibleColumns } from './helpers';
import { isNotEmpty } from '../../common/helpers';
import { Loader } from '../loader/loader';

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
const defaultColumnsNames = defaultColumns.map((column) => column.dataIndex);

const defaultVisible = ['first_name', 'last_name', 'email'];

export const Table: FunctionComponent = () => {
    const [visibleColumns, setVisibleColumns] = useState(defaultVisible);

    return (
        <DataProvider entityType={ENTITY_TYPES.TABLE_DATA}>
            {({ entityData: { data: tableData, status: tableStatus }, dependenciesData }) => {
                const {
                    entityData: { data: configData /* status: configStatus */ },
                } = dependenciesData[0];
                if (tableStatus === REQUEST_STATUSES.PENDING) {
                    return <Loader />;
                }

                return isNotEmpty(tableData) && isNotEmpty(configData) ? (
                    <div className="table-container">
                        <ColumnsSelector
                            visibleColumns={visibleColumns}
                            configData={configData}
                            columns={defaultColumnsNames}
                            setVisibleColumns={setVisibleColumns}
                        />
                        <AntdTable
                            dataSource={tableData}
                            columns={filterVisibleColumns(defaultColumns, visibleColumns)}
                            pagination={{ showSizeChanger: false }}
                        />
                    </div>
                ) : (
                    <div />
                );
            }}
        </DataProvider>
    );
};
