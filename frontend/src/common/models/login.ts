import { Model, BaseModelProps, EntityResponse } from 'common/interfaces';
import { HttpService } from 'common/http-service';
import { BASE_URL, URLS, ENTITY_ACTION_TYPES } from 'common/consts';
import { EntitiesPayloadData } from 'common/store/interfaces';

type CustomRequestMethodProps = Pick<BaseModelProps, 'url' | 'headers'>;

const http = HttpService.getInstance();

export const UserDataModel: Model = {
    actions: {
        [ENTITY_ACTION_TYPES.READ]: {
            url: HttpService.toURL([BASE_URL, URLS.USER_DATA, URLS.LOGIN]),
            customRequestMethod: (
                { url, headers }: CustomRequestMethodProps,
                data: EntitiesPayloadData,
            ): Promise<EntityResponse> => {
                return http.post(url, headers, JSON.stringify(data));
            },
            replaceMode: true,
        },
    },
};
