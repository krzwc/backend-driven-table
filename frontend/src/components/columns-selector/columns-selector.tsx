import React, { FunctionComponent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Popover as AntdPopover, Button, Checkbox } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';

interface ColumnsSelectorProps {
  visibleColumns: string[];
  configData: string[];
  columns: string[];
  setVisibleColumns: Dispatch<SetStateAction<string[]>>;
}

const content = ({ visibleColumns, configData, columns, setVisibleColumns }: ColumnsSelectorProps) => {
  const [checkboxGroupState, setCheckboxGroupState] = useState(visibleColumns);

  useEffect(() => {
    setVisibleColumns(configData);
  }, [configData]);

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
  configData,
  columns,
  setVisibleColumns,
}) => {
  return (
    <AntdPopover
      content={content({ visibleColumns, configData, columns, setVisibleColumns })}
      title="Select visible columns"
      trigger="hover"
      placement="rightBottom"
    >
      <Button type="ghost" icon={<SlidersOutlined />} />
    </AntdPopover>
  );
};
