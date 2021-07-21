import CacheClient from "../CacheClient";
import { ICacheClient } from "../types";

let cacheInstance: ICacheClient;

const cacheFactory = {
  getInstance: (): ICacheClient => {
    return cacheInstance;
  },
  createInstance: (): void => {
    cacheInstance = new CacheClient();
  }
};

export default cacheFactory;