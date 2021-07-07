import CacheClient from "../CacheClient";
import { ICacheClient } from "../types";

let cacheInstance: ICacheClient;

const cacheFactory = {
  getInstance: () => {
    return cacheInstance;
  },
  createInstance: () => {
    cacheInstance = new CacheClient();
  }
};

export default cacheFactory;