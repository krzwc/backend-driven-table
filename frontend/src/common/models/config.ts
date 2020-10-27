import { Model } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, URLS, REQUEST_METHODS } from '../consts';

export const ConfigModel: Model = {
  url: HttpService.toURL([BASE_URL, URLS.CONFIG]),
  requestMethod: REQUEST_METHODS.POST,
};
