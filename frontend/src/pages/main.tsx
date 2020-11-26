import React, { FunctionComponent } from 'react';
import '../styles.css';
import 'antd/dist/antd.css';

import { Table } from 'components/table/table';
import { noop } from 'common/helpers';
import { REQUEST_STATUSES } from 'common/consts';

import { Login } from './login';

export const Main: FunctionComponent = () => {
    return (
        <div className="container">
            <Login authStatus={REQUEST_STATUSES.SUCCESS} authenticate={noop} />
            <Table />
        </div>
    );
};
