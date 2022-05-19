import NodeCache from 'node-cache';
import { config } from "../../config";

type Key = string | number;

class CacheLocal {
  private static _instance: CacheLocal;
  private cache: NodeCache;
  private ttlSeconds = config.cacheExpireIn as number;

  private constructor() {
    this.cache = new NodeCache({
      stdTTL: this.ttlSeconds,
      checkperiod: this.ttlSeconds * 0.2,
      useClones: false
    });
  }

  public static getInstance(): CacheLocal {
    if (!CacheLocal._instance) {
      CacheLocal._instance = new CacheLocal();
    }
    return CacheLocal._instance;
  }

  public has<T>(key: Key): boolean {
    return this.cache.has(key);
  }

  public get<T>(key: Key): T | undefined {
    return this.cache.get<T>(key);
  }

  public set<T>(key: Key, value: T, ttlSeconds: number | undefined = undefined): void {
    this.cache.set(key, value, ttlSeconds || this.ttlSeconds);
  }

  public async getCacheOrSetIfNotExists(key: string, method: any, ttlSeconds: number | undefined = undefined): Promise<any> {
    let result: any | undefined | null = this.cache.get<any>(key);

    if (!result) {
      result = await method();

      if (result) {
        this.set(key, result, ttlSeconds);
      }
    }

    return result;
  }
}

export default CacheLocal.getInstance();
