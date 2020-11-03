import { StoreState } from 'common/store/interfaces';

export interface Headers {
    [key: string]: string;
}

export interface RequestParameters extends RequestInit {
    url: string | URL;
}

export type CustomRequestMethod<ResponseInterface> = (
    requestSettings: any,
    data?: any,
    state?: StoreState,
) => Promise<ResponseInterface>;

export interface ResponseError {
    error_description: string;
    description: string;
    message: string;
    __status: number;
}
