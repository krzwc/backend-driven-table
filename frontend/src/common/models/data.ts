import { Model, EntityResponse } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, URLS, ENTITY_TYPES } from '../consts';
import { Data } from '../../components/table/interfaces';

interface DataResponse {
  data: Data[];
}

const transformResponseBody = (response: DataResponse): EntityResponse => ({
  ...response,
  data: response.data.map(dataItem => ({ ...dataItem, key: dataItem.id })),
});

export const DataModel: Model = {
  url: HttpService.toURL([BASE_URL, URLS.DATA]),
  dependencies: [{ entityType: ENTITY_TYPES.CONFIG }],
  transformResponseBody,
};
