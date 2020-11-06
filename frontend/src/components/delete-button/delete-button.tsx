import React, { FunctionComponent, ReactText } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { isEmpty } from 'common/helpers';
import { deleteEntity } from 'common/store/actions/delete-entity';
import { ENTITY_TYPES } from 'common/consts';
import { EntityData } from 'common/store/interfaces';

interface DeleteButtonProps {
    selectedRowKeys: ReactText[];
    isLoading: boolean;
}

const mapDispatchToProps: DispatchToProps = {
    deleteEntityAction: deleteEntity,
};

interface DeleteEntityAction {
    entityType: ENTITY_TYPES;
    entityData: EntityData;
}

interface DispatchToProps {
    deleteEntityAction({ entityType, entityData }: DeleteEntityAction): void;
}

export const DeleteButton: FunctionComponent<DeleteButtonProps & DispatchToProps> = ({
    selectedRowKeys,
    isLoading,
    deleteEntityAction,
}) => {
    const onClickHandler = () => {
        selectedRowKeys.forEach((key) => {
            deleteEntityAction({ entityType: ENTITY_TYPES.TABLE_DATA, entityData: { id: key } });
        });
    };

    return (
        <Button type="primary" onClick={onClickHandler} disabled={isEmpty(selectedRowKeys)} loading={isLoading}>
            Delete selected
        </Button>
    );
};

export default connect(null, mapDispatchToProps)(DeleteButton);
