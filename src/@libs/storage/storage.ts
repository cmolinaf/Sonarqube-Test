import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDataProps } from "@/types";

const typeContent = {
  userData: "userData",
  token: "token",
  applications: "applications",
};

class StorageClass {
  store = async (key: string, value: object | string | number | []) => {
    try {
      if (typeof value === "string") {
        await AsyncStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }

      return true;
    } catch (err) {
      console.error("storage store err", err);

      return false;
    }
  };

  get = async (key: string) => {
    try {
      const aux = await AsyncStorage.getItem(key);
      if (aux) {
        return aux;
      } else {
        throw Error(`no data for key ${key}`);
      }
    } catch (err) {
      console.error("storage get err", err);

      throw Error(err as string | undefined);
    }
  };

  multiGet = async (keys: []) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (err) {
      console.error("storage multiGet err", err);

      throw Error(err as string | undefined);
    }
  };

  getAllkeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (err) {
      console.error("storage getAllKeys err", err);

      throw Error(err as string | undefined);
    }
  };

  remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (err) {
      console.error("storage remove err", err);

      return false;
    }
  };

  removeAll = async () => {
    try {
      await AsyncStorage.clear();

      return true;
    } catch (err) {
      console.error("storage removeAll err", err);

      return false;
    }
  };

  /* Specific Functions */
  /* Handle User Data */
  getUserData = async () => {
    try {
      const aux = await this.get(typeContent.userData);
      if (aux) {
        const parseAux: userDataProps = await JSON.parse(aux);
        return parseAux;
      } else {
        throw Error("no user data");
      }
    } catch (err) {
      console.error("storage get err", err);

      throw Error(err as string | undefined);
    }
  };

  storeUserData = async (value: object) => {
    try {
      await this.store(typeContent.userData, value);

      return true;
    } catch (err) {
      console.error("storage store err", err);

      return false;
    }
  };

  /* Handle Token */

  getToken = async () => {
    try {
      const aux = await this.get(typeContent.token);
      if (aux) {
        const parseAux: userDataProps = await JSON.parse(aux);
        return parseAux;
      } else {
        throw Error("no token data");
      }
    } catch (err) {
      console.error("storage get err", err);

      throw Error(err as string | undefined);
    }
  };

  storeToken = async (value: string) => {
    try {
      await this.store(typeContent.token, value);

      return true;
    } catch (err) {
      console.error("storage store err", err);

      return false;
    }
  };

  /* Handle Application Data */
  createApplication = async (value: object[]) => {
    try {
      await this.store(typeContent.applications, value);
      return true;
    } catch (err) {
      console.error("storage store err", err);

      return false;
    }
  };

  appendApplication = async (value: object) => {
    try {
      const allKeys = await this.getAllkeys();
      const isApplicationKeyIn = await allKeys.some(
        (key: string) => typeContent.applications === key
      );
      if (isApplicationKeyIn) {
        const allApplications = await this.getAllApplications();
        await this.store(typeContent.applications, [...allApplications, value]);
      } else {
        await this.store(typeContent.applications, [value]);
      }

      return true;
    } catch (err) {
      console.error("storage store err", err);

      return false;
    }
  };

  getAllApplications = async () => {
    try {
      const aux = await this.get(typeContent.applications);
      if (aux) {
        const parseAux: [] = await JSON.parse(aux);
        return parseAux;
      } else {
        throw Error("no user data");
      }
    } catch (err) {
      console.error("storage get err", err);

      throw Error(err as string | undefined);
    }
  };

  removeAllApplications = async () => {
    try {
      const aux = await this.remove(typeContent.applications);
      console.error(aux);
      // if (aux) {
      //   throw Error('no user data');
      // }
    } catch (err) {
      console.error("storage get err", err);

      throw Error(err as string | undefined);
    }
  };
}

const Storage = new StorageClass();

export default Storage;
