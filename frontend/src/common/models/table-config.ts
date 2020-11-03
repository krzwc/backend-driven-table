import { Model, BaseModelProps, EntityResponse } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, URLS, ENTITY_ACTION_TYPES } from '../consts';
import { EntitiesPayloadData } from '../store/interfaces';

const http = HttpService.getInstance();

type CustomRequestMethodProps = Pick<BaseModelProps, 'url' | 'headers'>;

export const TableConfigModel: Model = {
    actions: {
        [ENTITY_ACTION_TYPES.READ]: {
            url: HttpService.toURL([BASE_URL, URLS.TABLE_CONFIG]),
            customRequestMethod: (
                { url, headers }: CustomRequestMethodProps,
                data: EntitiesPayloadData,
            ): Promise<EntityResponse> => {
                return http.post(url, headers, JSON.stringify(data));
            },
        },
        [ENTITY_ACTION_TYPES.UPDATE]: {
            url: HttpService.toURL([BASE_URL, URLS.TABLE_CONFIG]),
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
