
import httpContext from 'express-http-context';

export default class TraceService {
  public static getRequestId = () => {
    return httpContext.get('requestId');
  }
}
