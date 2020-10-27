import { Model } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, REQUEST_METHODS, URLS } from '../consts';

export const DataModel: Model = {
  url: HttpService.toURL([BASE_URL, URLS.DATA]),
  requestMethod: REQUEST_METHODS.GET
};
