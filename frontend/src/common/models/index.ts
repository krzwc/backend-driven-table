import { ENTITY_TYPES } from '../consts';

import { DataModel } from './data';
import { ConfigModel } from './config';

export const MODELS = {
  [ENTITY_TYPES.DATA]: DataModel,
  [ENTITY_TYPES.CONFIG]: ConfigModel,
};
