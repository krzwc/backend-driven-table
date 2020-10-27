import { Model } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, URLS, ENTITY_TYPES } from '../consts';

export const DataModel: Model = {
  url: HttpService.toURL([BASE_URL, URLS.DATA]),
  dependencies: [{ entityType: ENTITY_TYPES.CONFIG }],
};
