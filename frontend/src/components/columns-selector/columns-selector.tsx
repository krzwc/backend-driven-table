import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { Popover as AntdPopover, Button, Checkbox } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';

interface ColumnsSelectorProps {
  visibleColumns: string[];
  columns: string[];
  setVisibleColumns: Dispatch<SetStateAction<string[]>>;
}

const content = ({ visibleColumns, columns, setVisibleColumns }: ColumnsSelectorProps) => (
  <Checkbox.Group
    options={columns}
    defaultValue={visibleColumns}
    onChange={checkedValues => setVisibleColumns(checkedValues as string[])}
  />
);

export const ColumnsSelector: FunctionComponent<ColumnsSelectorProps> = ({
  visibleColumns,
  columns,
  setVisibleColumns,
}) => {
  return (
    <AntdPopover
      content={content({ visibleColumns, columns, setVisibleColumns })}
      title="Select visible columns"
      trigger="hover"
      placement="left"
    >
      <Button type="ghost" icon={<SlidersOutlined />} />
    </AntdPopover>
  );
};
