import { ENTITY_ACTION_TYPES, ENTITY_TYPES, REQUEST_METHODS } from './consts';
import { Headers, CustomRequestMethod } from './http-service/interfaces';
import { StoreState } from './store/interfaces';

interface EntityDependency {
  entityType: ENTITY_TYPES;
  entityIdParam?: string;
}

interface EntityResponse {
  data: object | object[];
  filter_options?: any;
  page?: any;
  search?: any;
}

interface BaseModelProps {
  url: string | URL;
  requestMethod?: REQUEST_METHODS;
  headers?: Headers;
  dependencies?: EntityDependency[];
  customRequestMethod?: CustomRequestMethod<EntityResponse>;
  transformRequestBody?(body: any, entityData: any, store: StoreState): object;
  transformResponseBody?(body: any, entityData: any, store: StoreState): EntityResponse;
}

export interface Model extends BaseModelProps {
  actions?: {
    [actionType in keyof typeof ENTITY_ACTION_TYPES]?: BaseModelProps;
  };
}
