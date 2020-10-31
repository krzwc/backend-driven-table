import { fromJS, List, Map } from 'immutable';
import { EntitiesAction, EntitiesPayload } from '../interfaces';
import { ENTITY_ACTIONS, REQUEST_STATUSES } from '../../consts';
import { basicStoreKeys, updateSingleEntity, mutateState } from './helpers';

const initialState = Map();

export const entitiesReducer = (state = initialState, action: EntitiesAction) => {
  const { type, payload } = action;
  const { data, entityType } = payload || ({} as EntitiesPayload);

  switch (type) {
    case ENTITY_ACTIONS.ENTITY_REQUEST_START:
      return state.withMutations(mutableState => {
        mutableState.setIn([entityType, 'status'], REQUEST_STATUSES.PENDING);
      });
    case ENTITY_ACTIONS.UPDATE_ENTITY_SUCCESS:
    case ENTITY_ACTIONS.READ_ENTITY_SUCCESS: {
      let updatedEntitiesData: any;
      if (type === ENTITY_ACTIONS.READ_ENTITY_SUCCESS) {
        updatedEntitiesData = Array.isArray(data) ? data : [data];
      } else {
        updatedEntitiesData = updateSingleEntity(state.getIn([entityType, 'data'], List()), data!);
      }

      return state.withMutations(mutableState => {
        [...basicStoreKeys, 'status'].forEach(key =>
          mutateState({ key, payload })(mutableState, {
            status: REQUEST_STATUSES.SUCCESS,
            data: updatedEntitiesData,
          }),
        );
      });
    }
    case ENTITY_ACTIONS.CREATE_ENTITY_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.setIn([entityType, 'status'], REQUEST_STATUSES.SUCCESS);
        mutableState.updateIn([entityType, 'data'], current => current.push(fromJS(data)));
      });
    case ENTITY_ACTIONS.ENTITY_REQUEST_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.setIn([entityType, 'status'], REQUEST_STATUSES.FAILURE);
      });
    default:
      return state;
  }
};
