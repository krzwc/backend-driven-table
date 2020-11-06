import { ENTITY_ACTION_TYPES, ENTITY_TYPES } from './consts';
import { Headers, CustomRequestMethod } from './http-service';
import { StoreState } from './store/interfaces';

export interface Entity {
    [key: string]: any;
}

export interface EntityDependency {
    entityType: ENTITY_TYPES;
    entityIdParam?: string;
}

export interface EntityResponse {
    data: ObjectType | ObjectType[];
    /* filter_options?: any;
  page?: any;
  search?: any; */
}

export interface BaseModelProps {
    url: string | URL;
    headers?: Headers;
    replaceMode?: boolean;
    dependencies?: EntityDependency[];
    customRequestMethod?: CustomRequestMethod<EntityResponse>;
    transformRequestBody?(body: any, entityData: any, store: StoreState): ObjectType;
    transformResponseBody?(response: any): EntityResponse;
    /* transformResponseBody?(body: any, entityData: any, store: StoreState): EntityResponse; */
}

export interface ModelWithActions extends PartialBy<BaseModelProps, 'url'> {
    actions?: {
        [actionType in keyof typeof ENTITY_ACTION_TYPES]?: BaseModelProps;
    };
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type UnionKeys<T> = T extends any ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;
type StrictUnion<T> = StrictUnionHelper<T, T>;

export type Model = StrictUnion<BaseModelProps | ModelWithActions>;

export interface ImmutableMap<T> extends Omit<Map<string, any>, 'get' | 'set'> {
    getIn<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
    setIn<K extends keyof T>(Key: K, value: T[K]): ImmutableMap<T>;
    get<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
    set<K extends keyof T>(Key: K, value: T[K]): ImmutableMap<T>;
}

export type ObjectType = Record<string, unknown>;
