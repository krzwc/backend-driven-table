import React, { FunctionComponent, Dispatch, SetStateAction, useState } from 'react';
import { Popover as AntdPopover, Button, Checkbox } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';

interface ColumnsSelectorProps {
  visibleColumns: string[];
  columns: string[];
  setVisibleColumns: Dispatch<SetStateAction<string[]>>;
}

const content = ({ visibleColumns, columns, setVisibleColumns }: ColumnsSelectorProps) => {
  const [checkboxGroupState, setCheckboxGroupState] = useState(visibleColumns);

  const handleClick = () => {
    setVisibleColumns(checkboxGroupState);
  };

  return (
    <div className="popover-content">
      <Checkbox.Group
        options={columns}
        defaultValue={visibleColumns}
        onChange={checkedValues => setCheckboxGroupState(checkedValues as string[])}
      />
      <br />
      <Button type="primary" onClick={handleClick}>
        Apply
      </Button>
    </div>
  );
};

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
