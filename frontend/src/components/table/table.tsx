import React, { useState, FunctionComponent, ReactText } from 'react';
import { Table as AntdTable } from 'antd';
import DataProvider from 'wrappers/data-provider/data-provider';
import { ENTITY_TYPES, REQUEST_STATUSES } from 'common/consts';
import ColumnsSelector from 'components/columns-selector/columns-selector';
import { filterVisibleColumns } from './helpers';
import { isNotEmpty } from 'common/helpers';
import { Loader } from 'components/loader/loader';
import DeleteButton from 'components/delete-button/delete-button';

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
    const [selectedRowKeys, setSelectedRowKeys] = useState([] as ReactText[]);

    return (
        <DataProvider entityType={ENTITY_TYPES.USER_DATA}>
            {({ entityData: { data: tableData, status: tableStatus }, dependenciesData }) => {
                const {
                    entityData: { data: configData /* status: configStatus */ },
                } = dependenciesData[0];
                const isLoading = tableStatus === REQUEST_STATUSES.PENDING;
                if (isLoading) {
                    return <Loader />;
                }

                return isNotEmpty(tableData) && isNotEmpty(configData) ? (
                    <div className="table-container">
                        <div className="table-header-actions">
                            <DeleteButton selectedRowKeys={selectedRowKeys} isLoading={isLoading} />
                            {console.log(configData)}
                            <ColumnsSelector
                                visibleColumns={visibleColumns}
                                configData={Array.isArray(configData) ? configData[0].columns : configData.columns} // TODO: WTF?
                                columns={defaultColumnsNames}
                                setVisibleColumns={setVisibleColumns}
                            />
                        </div>
                        <AntdTable
                            dataSource={tableData}
                            rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
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
