import { Model, BaseModelProps, EntityResponse } from 'common/interfaces';
import { HttpService } from 'common/http-service';
import { BASE_URL, URLS, ENTITY_ACTION_TYPES } from 'common/consts';
import { EntitiesPayloadData } from 'common/store/interfaces';
import { ObjectType } from 'common/interfaces';

const http = HttpService.getInstance();

type CustomRequestMethodProps = Pick<BaseModelProps, 'url' | 'headers'>;

export const UserConfigModel: Model = {
    actions: {
        [ENTITY_ACTION_TYPES.READ]: {
            url: HttpService.toURL([BASE_URL, URLS.USER_CONFIG]),
            transformRequestBody: (): ObjectType => {
                return {
                    table: 'users', // TODO: hide BE implementation details
                };
            },
            transformResponseBody: (response: any) => {
                const parsedResponse = {
                    ...response,
                    data: {
                        ...response.data,
                        columns: response.data.columns
                            .slice(2, -2)
                            .replace(/['"]+/g, '')
                            .split(','),
                    },
                };
                return parsedResponse;
            },
            customRequestMethod: (
                { url, headers }: CustomRequestMethodProps,
                data: EntitiesPayloadData,
            ): Promise<EntityResponse> => {
                return http.post(url, headers, JSON.stringify(data));
            },
        },
        [ENTITY_ACTION_TYPES.UPDATE]: {
            url: HttpService.toURL([BASE_URL, URLS.USER_CONFIG]),
            transformRequestBody: (_body: ObjectType, entityData: { data: string[] }): ObjectType => {
                return {
                    table: 'users',
                    columns: `[${entityData.data.map((column: string) => `'${column}'`)}]`,
                }; // TODO: hide BE implementation details
            },
            transformResponseBody: (response: any) => {
                const parsedResponse = {
                    ...response,
                    data: {
                        ...response.data,
                        columns: response.data.columns
                            .slice(1, -1)
                            .replace(/['"]+/g, '')
                            .split(','),
                    },
                };
                return parsedResponse;
            },
            customRequestMethod: (
                { url, headers }: CustomRequestMethodProps,
                data: EntitiesPayloadData,
            ): Promise<EntityResponse> => {
                return http.put(url, headers, data.body);
            },
            replaceMode: true,
        },
    },
};
