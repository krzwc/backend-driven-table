import React, { FunctionComponent } from 'react';
import { Popover as AntdPopover, Button, Checkbox } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';

interface ColumnsSelectorProps {
  visibleColumns: string[];
  columns: string[];
}

const content = (visibleColumns: string[], columns: string[]) => (
  <Checkbox.Group options={columns} defaultValue={visibleColumns} onChange={() => {}} />
);

export const ColumnsSelector: FunctionComponent<ColumnsSelectorProps> = ({ visibleColumns, columns }) => {
  return (
    <AntdPopover
      content={content(visibleColumns, columns)}
      title="Select visible columns"
      trigger="hover"
      placement="left"
    >
      <Button type="ghost" icon={<SlidersOutlined />} />
    </AntdPopover>
  );
};
