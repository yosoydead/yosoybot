import BackendClient from "../services/backendActions/BackendClient";
import { BACKEND_BASE_URLS } from "../constants";
import { IFetchClient } from "../services/FetchClient";

let instance: any;
const dbFactory = {
  getInstance: () => {
    if (instance === null || instance === undefined) throw new Error("BackendClient neinitializat");
    return instance;
  },
  createInstance: (appMode: string | undefined, fetchClient: IFetchClient) => {
    if (instance !== null || instance !== undefined) throw new Error("Exista deja o instanta de BackendClient");
    if (appMode === "local") {
      instance = new BackendClient(fetchClient, BACKEND_BASE_URLS.LOCAL);
    } else if (appMode === "production") {
      instance = new BackendClient(fetchClient, BACKEND_BASE_URLS.LOCAL_GOKU);
    } else {
      throw new Error("App mode necunoscut");
    }
  }
};

export default dbFactory;