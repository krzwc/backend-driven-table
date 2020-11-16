import { ENTITY_TYPES } from 'common/consts';
import { UserDataModel } from './user-data';
import { UserConfigModel } from './user-config';

export const MODELS = {
    [ENTITY_TYPES.USER_DATA]: UserDataModel,
    [ENTITY_TYPES.USER_CONFIG]: UserConfigModel,
};
