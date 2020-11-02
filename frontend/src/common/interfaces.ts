import { ENTITY_ACTION_TYPES, ENTITY_TYPES, REQUEST_METHODS } from './consts';
import { Headers, CustomRequestMethod } from './http-service/interfaces';
import { StoreState } from './store/interfaces';

export interface Entity {
    [key: string]: any;
}

export interface EntityDependency {
    entityType: ENTITY_TYPES;
    entityIdParam?: string;
}

export interface EntityResponse {
    data: object | object[];
    /* filter_options?: any;
  page?: any;
  search?: any; */
}

interface BaseModelProps {
    url?: string | URL;
    headers?: Headers;
    replaceMode?: boolean;
    dependencies?: EntityDependency[];
    customRequestMethod?: CustomRequestMethod<EntityResponse>;
    transformRequestBody?(body: any, entityData: any, store: StoreState): object;
    transformResponseBody?(response: any): EntityResponse;
    /* transformResponseBody?(body: any, entityData: any, store: StoreState): EntityResponse; */
}

export interface Model extends BaseModelProps {
    actions?: {
        [actionType in keyof typeof ENTITY_ACTION_TYPES]?: BaseModelProps;
    };
}

export interface ImmutableMap<T> extends Omit<Map<string, any>, 'get' | 'set'> {
    get<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
    set<K extends keyof T>(Key: K, value: T[K]): ImmutableMap<T>;
}
