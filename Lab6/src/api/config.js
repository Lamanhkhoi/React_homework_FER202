// Base URL of the mockapi.io project. Resources needed (create them on mockapi.io):
//   /orchids   -> name, rating(Number), isSpecial(Boolean), isNatural(Boolean),
//                 image, color, origin, category
//   /accounts  -> username, password, role  (at least one record with role "admin")
// NOTE: use the "API endpoint" shown in mockapi (it can differ from the project id in the browser URL).
export const API_URL =
  import.meta.env.VITE_API_URL ?? 'https://6aec7cf3fc3b911e6fd537a6.mockapi.io'

export const ORCHIDS_URL = `${API_URL}/orchids`
export const ACCOUNTS_URL = `${API_URL}/accounts`
