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

/**
 * Function that sets session token after Login in Local Storage
 */
export const setAdminApiKey = (value: string) => {
  const key = `ADMIN_API_KEY`;
  return LocalStore.setItem({ key, value });
};
export const setServiceApiKey = (value: string) => {
  const key = `SERVICE_API_KEY`;
  return LocalStore.setItem({ key, value });
};

/**
 * Function that gets session token from local storage
 */
export const getAdminApiKey = () => {
  const key = `ADMIN_API_KEY`;
  return LocalStore.getItem({ key });
};
export const getServiceApiKey = () => {
  const key = `SERVISE_API_KEY`;
  return LocalStore.getItem({ key });
};


export default LocalStore;
