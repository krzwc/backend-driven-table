import { Model } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, URLS, ENTITY_ACTION_TYPES } from '../consts';

const http = HttpService.getInstance();

export const TableConfigModel: Model = {
    actions: {
        [ENTITY_ACTION_TYPES.READ]: {
            url: HttpService.toURL([BASE_URL, URLS.TABLE_CONFIG]),
            customRequestMethod: ({ url, headers }, data) => {
                return http.post(url, headers, JSON.stringify(data));
            },
        },
        [ENTITY_ACTION_TYPES.UPDATE]: {
            url: HttpService.toURL([BASE_URL, URLS.TABLE_CONFIG]),
            customRequestMethod: ({ url, headers }, data) => {
                return http.put(url, headers, JSON.stringify(data));
            },
            replaceMode: true,
        },
    },
};
