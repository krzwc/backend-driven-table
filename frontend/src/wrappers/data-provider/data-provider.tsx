import { Component, ReactNode } from 'react';
import { connect, MapStateToPropsFactory } from 'react-redux';
import { Selector } from 'reselect';
import { ENTITY_TYPES } from '../../common/consts';
import { MODELS } from '../../common/models';
import { isNotEmpty } from '../../common/helpers';
import { Entity } from '../../common/interfaces';
import { entitiesSelector, entitiesStatusSelector } from '../../common/store/selectors/entites-selectors';
import { StoreState, EntityData } from '../../common/store/interfaces';
import { readEntity } from '../../common/store/actions/read-entity';

interface DataProviderProps {
    entityType: ENTITY_TYPES;
    children(childData: any): ReactNode;
}

interface DependantEntitiesSelectors {
    entityType: ENTITY_TYPES;
    entitySelector: Selector<any, any>;
}

const mapDispatchToProps: DispatchToProps = {
    readEntityAction: readEntity,
};

interface ReadEntityAction {
    entityType: ENTITY_TYPES;
    entityData: EntityData;
}

interface DispatchToProps {
    readEntityAction({ entityType, entityData }: ReadEntityAction): void;
}

interface StateToProps {
    entityData: Entity | Entity[];
    dependenciesData: {
        entityType: ENTITY_TYPES;
        entityData: Entity | Entity[];
    }[];
}

const mapStateToPropsFactory: MapStateToPropsFactory<StateToProps, DataProviderProps, StoreState> = (
    state,
    { entityType },
) => {
    const statusSelector = entitiesStatusSelector(entityType);
    const allEntitiesSelector = entitiesSelector(entityType);

    const dependantEntities = MODELS[entityType].dependencies;
    const areDependantEntities = isNotEmpty(dependantEntities);
    let dependantEntitiesSelectors: DependantEntitiesSelectors[];
    if (dependantEntities) {
        dependantEntitiesSelectors = dependantEntities.map((dependantEntityType) => ({
            entityType: dependantEntityType.entityType,
            entitySelector: entitiesSelector(dependantEntityType.entityType),
        }));
    }

    return (currentState) => {
        const baseProps = {
            entityStatus: statusSelector(currentState),
        };

        return Object.assign(baseProps, {
            entityData: allEntitiesSelector(currentState).toJS(),
            dependenciesData: areDependantEntities
                ? dependantEntitiesSelectors.map((selector) => ({
                      entityType: selector.entityType,
                      entityData: selector.entitySelector(currentState).toJS(),
                  }))
                : [],
        });
    };
};

export class DataProvider extends Component<StateToProps & DataProviderProps & DispatchToProps> {
    public componentDidMount = (): void => {
        const { readEntityAction, entityType } = this.props;
        readEntityAction({ entityType, entityData: {} });
    };

    public render = (): ReactNode => {
        const { children, entityData, dependenciesData } = this.props;
        return children({ entityData, dependenciesData });
    };
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(DataProvider);
