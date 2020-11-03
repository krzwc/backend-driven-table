import { URL_SEPARATOR, REQUEST_METHODS } from 'common/consts';
import { Headers, RequestParameters } from './interfaces';
import { EntityResponse } from 'common/interfaces';

export class HttpService {
    private static instance: HttpService;

    public static getInstance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService();
        }

        return HttpService.instance;
    }

    public static toURL(url: string | string[] | URL): URL {
        if (Array.isArray(url)) {
            return new URL(url.join(URL_SEPARATOR), window.location.origin);
        }
        if (!(url instanceof URL)) {
            return new URL(url, window.location.origin);
        }

        return url;
    }

    public get = (url: string | URL, headers: Headers = {}): Promise<EntityResponse> => this.request({ url, headers });

    public post = (url: string | URL, headers: Headers = {}, body: BodyInit): Promise<EntityResponse> =>
        this.request({ url, headers, body, method: REQUEST_METHODS.POST });

    public put = (url: string | URL, headers: Headers = {}, body: BodyInit): Promise<EntityResponse> =>
        this.request({ url, headers, body, method: REQUEST_METHODS.PUT });

    public delete = (url: string | URL, headers: Headers = {}): Promise<EntityResponse> =>
        this.request({ url, headers, method: REQUEST_METHODS.DELETE });

    public enhanceHeaders = (headers: Headers = {}): Headers => {
        return {
            'content-type': 'application/json',
            ...headers,
        };
    };

    private request = ({ url, headers, method, body }: RequestParameters) => {
        let hasFailed = false;
        const urlString = url instanceof URL ? url.toString() : encodeURI(url);

        return fetch(urlString, {
            headers,
            method,
            body,
            credentials: 'same-origin',
        })
            .then((response) => {
                const { /* status, */ ok } = response;
                if (!ok) {
                    hasFailed = true;
                }

                return response.json();
            })
            .then((data) => (hasFailed ? Promise.reject(data) : Promise.resolve(data)))
            .catch((error) => {
                return hasFailed ? Promise.reject(error) : Promise.reject(new Error('Internal server error'));
            });
    };
}
