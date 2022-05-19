import { HmacSHA256 } from 'crypto-js';
import { config } from '../../config';

export default class Signature {
  public static getSignature(data: any): string {
    return HmacSHA256(JSON.stringify(data), config.appSecretKey).toString();
  }

  public static verifySignature(token: any, data: any): boolean {
    return HmacSHA256(JSON.stringify(data), config.appSecretKey).toString() === token;
  }
}
