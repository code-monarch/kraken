import { AUTH_PATHS } from "../routes"
import LocalStore from "./storage-manager"

export const clearLocalStorage = () => {
    LocalStore.clearStore()
    if (typeof window !== 'undefined') {
        location.replace(`${AUTH_PATHS.login}`)
    }
}