import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";

import { AxiosError } from "./IAxios";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "../../common/protocols/http/httpClient";
import logger from "../../common/helpers/Logger";

@injectable()
export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error: AxiosError | any) {
      logger.error(error.message, error);

      return Promise.reject({
        message: error.message || "Erro ao realizar requisicao http.",
        error: error.response || { data: error.code },
      });
    }
    return {
      body: axiosResponse.data,
    };
  }
}
