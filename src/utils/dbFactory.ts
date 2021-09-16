import BackendClient from "../services/backendActions/BackendClient";
import { BACKEND_BASE_URLS } from "../constants";
import { IFetchClient } from "../services/FetchClient";
import { APP_MODES, IBackendClient } from "../types";

let instance: IBackendClient;
const dbFactory = {
  getInstance: (): IBackendClient => {
    return instance;
  },
  createInstance: (appMode: string | undefined, fetchClient: IFetchClient): void | IBackendClient => {
    if (appMode === "local") {
      instance = new BackendClient(fetchClient, BACKEND_BASE_URLS.LOCAL, APP_MODES.LOCAL);
      // instance = new BackendClient(fetchClient, BACKEND_BASE_URLS.LOCAL_GOKU);
    } else if (appMode === "production") {
      instance = new BackendClient(fetchClient, BACKEND_BASE_URLS.PRODUCTION, APP_MODES.PROD);
    } else {
      throw new Error("App mode necunoscut");
    }
  }
};

export default dbFactory;