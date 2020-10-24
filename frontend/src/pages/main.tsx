import React from 'react';
import '../styles.css';
import 'antd/dist/antd.css';

import { Table } from '../components/table/table';

export const Main = () => {
  return (
    <div className="container">
      <Table />
    </div>
  );
};
