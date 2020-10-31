import { Model } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, URLS, /* REQUEST_METHODS, */ ENTITY_ACTION_TYPES } from '../consts';

const http = HttpService.getInstance();

export const TableConfigModel: Model = {
  /* url: HttpService.toURL([BASE_URL, URLS.TABLE_CONFIG]),
  requestMethod: REQUEST_METHODS.POST, */
  actions: {
    [ENTITY_ACTION_TYPES.READ]: {
      url: HttpService.toURL([BASE_URL, URLS.TABLE_CONFIG]),
      customRequestMethod: ({ url, headers }, data) => {
        return http.post(url, headers, JSON.stringify(data));
      },
    },
  },
};
