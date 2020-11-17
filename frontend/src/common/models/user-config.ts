import { Model, BaseModelProps, EntityResponse } from 'common/interfaces';
import { HttpService } from 'common/http-service';
import { BASE_URL, URLS, ENTITY_ACTION_TYPES } from 'common/consts';
import { EntitiesPayloadData } from 'common/store/interfaces';

const http = HttpService.getInstance();

type CustomRequestMethodProps = Pick<BaseModelProps, 'url' | 'headers'>;

export const UserConfigModel: Model = {
    actions: {
        [ENTITY_ACTION_TYPES.READ]: {
            url: HttpService.toURL([BASE_URL, URLS.USER_CONFIG]),
            /* transformRequestBody: (): ObjectType => {
                return {
                    table: 'users',
                };
            }, */
            customRequestMethod: (
                { url, headers }: CustomRequestMethodProps,
                _data: EntitiesPayloadData,
            ): Promise<EntityResponse> => {
                return http.post(url, headers, JSON.stringify({ table: 'users' }));
            },
        },
        [ENTITY_ACTION_TYPES.UPDATE]: {
            url: HttpService.toURL([BASE_URL, URLS.USER_CONFIG]),
            customRequestMethod: (
                { url, headers }: CustomRequestMethodProps,
                data: EntitiesPayloadData,
            ): Promise<EntityResponse> => {
                return http.put(url, headers, JSON.stringify(data));
            },
            replaceMode: true,
        },
    },
};
