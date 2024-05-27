import { ADMIN_ROLE, LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from "../constants";

interface ISessionProps {
  key: string | undefined;
  value?: string;
}

/**
 *
 * Sets Item in local storage
 */
const setItem = ({ key, value }: ISessionProps) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key!, value!);
  }
};

/**
 *
 * Retrieve Item from Local storage
 */
// eslint-disable-next-line consistent-return
const getItem = ({ key }: ISessionProps) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key!);
  }
};

/**
 * Removes a particular key value from store
 */
const removeItem = ({ key }: ISessionProps) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key!);
  }
};

/**
 * Clears all Local storage Keys and values
 */
const clearStore = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

const LocalStore = {
  setItem, getItem, removeItem, clearStore,
};

export default LocalStore;


/**
 * 
 * @description Promise which stores service account API key
 */
export const storeServiceApiAccountKey = (serviceAccountKey: string): Promise<unknown> => {
  return new Promise((resolve) => {
    LocalStore.setItem({ key: SERVICE_ACCOUNT_API_KEY, value: serviceAccountKey })
    resolve(true)
  });
};

interface ILoginCredentials{
  apiKey: string;
  adminId: string;
  serviceAccountApiKey: string;
}
export const storeLoginCredentials = ({ apiKey, adminId, serviceAccountApiKey }: ILoginCredentials): Promise<unknown> => {
  return new Promise((resolve) => {
    LocalStore.setItem({ key: LOGIN_API_KEY, value: apiKey })
    LocalStore.setItem({ key: ADMIN_ROLE, value: adminId });
    LocalStore.setItem({ key: SERVICE_ACCOUNT_API_KEY, value: serviceAccountApiKey })
    resolve(true)
  });
};
