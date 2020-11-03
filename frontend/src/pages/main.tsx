import React, { FunctionComponent } from 'react';
import '../styles.css';
import 'antd/dist/antd.css';

import { Table } from '../components/table/table';

export const Main: FunctionComponent = () => {
    return (
        <div className="container">
            <Table />
        </div>
    );
};
