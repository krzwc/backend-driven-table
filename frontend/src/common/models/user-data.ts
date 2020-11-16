import { Model, BaseModelProps, EntityResponse } from 'common/interfaces';
import { HttpService } from 'common/http-service';
import { BASE_URL, URLS, ENTITY_TYPES, ENTITY_ACTION_TYPES } from 'common/consts';
import { Data } from 'components/table/interfaces';
import { EntitiesPayloadData } from 'common/store/interfaces';

interface TableDataResponse {
    data: Data[];
}

const transformResponseBody = (response: TableDataResponse): EntityResponse => ({
    ...response,
    data: response.data.map((dataItem) => ({ ...dataItem, key: dataItem.id })),
});

type CustomRequestMethodProps = Pick<BaseModelProps, 'url' | 'headers'>;

const http = HttpService.getInstance();

export const UserDataModel: Model = {
    url: HttpService.toURL([BASE_URL, URLS.USER_DATA]),
    dependencies: [{ entityType: ENTITY_TYPES.USER_CONFIG }],
    transformResponseBody,
    actions: {
        [ENTITY_ACTION_TYPES.DELETE]: {
            url: HttpService.toURL([BASE_URL, URLS.USER_DATA]),
            customRequestMethod: (
                { url, headers }: CustomRequestMethodProps,
                data: EntitiesPayloadData,
            ): Promise<EntityResponse> => {
                return http.delete(HttpService.toURL([String(url), URLS.SINGLE_ITEM(data)]), headers);
            },
            replaceMode: true,
        },
    },
};
