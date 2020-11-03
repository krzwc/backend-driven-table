import { Model, EntityResponse } from 'common/interfaces';
import { HttpService } from 'common/http-service/http-service';
import { BASE_URL, URLS, ENTITY_TYPES } from 'common/consts';
import { Data } from 'components/table/interfaces';

interface TableDataResponse {
    data: Data[];
}

const transformResponseBody = (response: TableDataResponse): EntityResponse => ({
    ...response,
    data: response.data.map((dataItem) => ({ ...dataItem, key: dataItem.id })),
});

export const TableDataModel: Model = {
    url: HttpService.toURL([BASE_URL, URLS.TABLE_DATA]),
    dependencies: [{ entityType: ENTITY_TYPES.TABLE_CONFIG }],
    transformResponseBody,
};
