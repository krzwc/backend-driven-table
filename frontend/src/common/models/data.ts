import { Model } from '../interfaces';
import { HttpService } from '../http-service/http-service';
import { BASE_URL, URLS } from '../consts';

export const DataModel: Model = {
  url: HttpService.toURL([BASE_URL, URLS.DATA]),
};
