import { ENTITY_TYPES } from '../consts';

import { TableDataModel } from './table-data';
import { TableConfigModel } from './table-config';

export const MODELS = {
    [ENTITY_TYPES.TABLE_DATA]: TableDataModel,
    [ENTITY_TYPES.TABLE_CONFIG]: TableConfigModel,
};
