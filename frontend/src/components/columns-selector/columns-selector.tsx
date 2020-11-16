import React, { FunctionComponent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Popover as AntdPopover, Button, Checkbox } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';
import { updateEntity } from 'common/store/actions/update-entity';
import { ENTITY_TYPES } from 'common/consts';
import { EntityData } from 'common/store/interfaces';

interface ColumnsSelectorProps {
    visibleColumns: string[];
    configData: string[];
    columns: string[];
    updateEntityAction({ entityType, entityData }: UpdateEntityAction): void;
    setVisibleColumns: Dispatch<SetStateAction<string[]>>;
}

interface UpdateEntityAction {
    entityType: ENTITY_TYPES;
    entityData: EntityData;
}

interface DispatchToProps {
    updateEntityAction({ entityType, entityData }: UpdateEntityAction): void;
}

const mapDispatchToProps: DispatchToProps = {
    updateEntityAction: updateEntity,
};

const content = ({
    visibleColumns,
    configData,
    columns,
    setVisibleColumns,
    updateEntityAction,
}: ColumnsSelectorProps) => {
    const [checkboxGroupState, setCheckboxGroupState] = useState(visibleColumns);

    useEffect(() => {
        setVisibleColumns(configData);
    }, [configData]);

    const handleClick = () => {
        setVisibleColumns(checkboxGroupState);
        updateEntityAction({ entityType: ENTITY_TYPES.USER_CONFIG, entityData: { data: checkboxGroupState } });
    };

    return (
        <div className="popover-content">
            <Checkbox.Group
                options={columns}
                defaultValue={visibleColumns}
                onChange={(checkedValues) => setCheckboxGroupState(checkedValues as string[])}
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
    updateEntityAction,
}) => {
    return (
        <AntdPopover
            content={content({ visibleColumns, configData, columns, setVisibleColumns, updateEntityAction })}
            title="Select visible columns"
            trigger="hover"
            placement="rightBottom"
        >
            <Button type="ghost" icon={<SlidersOutlined />} />
        </AntdPopover>
    );
};

export default connect(null, mapDispatchToProps)(ColumnsSelector);
